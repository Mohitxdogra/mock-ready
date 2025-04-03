import { useAuth } from "@clerk/clerk-react";
import { CircleStop, Loader, Mic, Save, Video, VideoOff, WebcamIcon, CheckCircle, Trash2 } from "lucide-react";
import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import WebCam from "react-webcam";
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
  new(): SpeechRecognition;
}
import { TooltipButton } from "./tooltip-button";
import { toast } from "sonner";
import { addDoc, updateDoc, doc, collection, serverTimestamp, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { SaveModal } from "./save-modal";

interface RecordAnswerProps {
  question: { question: string; answer: string };
  isWebCam: boolean;
  setIsWebCam: (value: boolean) => void;
  onNextQuestion: () => void;
  currentQuestionIndex: number;
  totalQuestions: number;
}

const useSpeechToText = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeSpeechRecognition = () => {
      try {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
          console.warn("Speech recognition is not supported in this browser.");
          return false;
        }

        const recognition = new SpeechRecognition() as unknown as SpeechRecognition;
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          let interimTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            interimTranscript += event.results[i][0].transcript + " ";
          }
          setTranscript(interimTranscript.trim());
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
          if (event.error === "not-allowed") {
            setIsRecording(false);
            toast.error("Please allow microphone access to record your answer");
          } else if (event.error !== "no-speech") {
            console.warn("Speech recognition error:", event.error);
            setIsRecording(false);
          }
        };

        (recognition as any).onend = () => {
          if (isRecording) {
            try {
              recognition.start();
            } catch (err) {
              console.warn("Failed to restart recognition:", err);
              setIsRecording(false);
            }
          }
        };

        recognitionRef.current = recognition;
        setIsInitialized(true);
        return true;
      } catch (error) {
        console.warn("Failed to initialize speech recognition:", error);
        return false;
      }
    };

    initializeSpeechRecognition();

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (err) {
          console.warn("Error stopping recognition:", err);
        }
        recognitionRef.current = null;
        setIsInitialized(false);
      }
    };
  }, []);

  const startSpeechToText = useCallback(() => {
    if (!isInitialized) {
      toast.error("Speech recognition is not available");
      return;
    }

    try {
      if (!recognitionRef.current) {
        toast.error("Please refresh the page and try again");
        return;
      }
      recognitionRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.warn("Failed to start speech recognition:", err);
      toast.error("Failed to start recording. Please try again.");
      setIsRecording(false);
    }
  }, [isInitialized]);

  const stopSpeechToText = useCallback(() => {
    try {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        setIsRecording(false);
      }
    } catch (err) {
      console.warn("Failed to stop speech recognition:", err);
      setIsRecording(false);
    }
  }, []);

  return { isRecording, transcript, startSpeechToText, stopSpeechToText };
};

export const RecordAnswer = ({
  question,
  isWebCam,
  setIsWebCam,
  onNextQuestion,
  currentQuestionIndex,
  totalQuestions,
}: RecordAnswerProps) => {
  const { isRecording, transcript, startSpeechToText, stopSpeechToText } = useSpeechToText();
  const [userAnswer, setUserAnswer] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { userId } = useAuth();
  const { interviewId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setUserAnswer(transcript);
  }, [transcript]);

  useEffect(() => {
    const fetchSavedAnswer = async () => {
      if (!userId || !interviewId) return;
      const q = query(
        collection(db, "userAnswers"),
        where("mockIdRef", "==", interviewId),
        where("question", "==", question.question),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const savedData = querySnapshot.docs[0].data();
        setUserAnswer(savedData.user_ans);
        setIsSaved(true);
      }
    };
    fetchSavedAnswer();
  }, [question, interviewId, userId]);

  const recordUserAnswer = () => {
    isRecording ? stopSpeechToText() : startSpeechToText();
  };

  const saveUserAnswer = async () => {
    setLoading(true);
    if (userAnswer.length < 30) {
      toast.error("Your answer should be more than 30 characters");
      setLoading(false);
      return;
    }
    try {
      const docRef = await addDoc(collection(db, "userAnswers"), {
        mockIdRef: interviewId,
        question: question.question,
        correct_ans: question.answer,
        user_ans: userAnswer,
        userId,
        createdAt: serverTimestamp(),
      });
      await updateDoc(doc(db, "userAnswers", docRef.id), { id: docRef.id });
      toast.success("Your answer has been saved.");
      setIsSaved(true);
    } catch (error) {
      toast.error("An error occurred while saving.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const resetUserAnswer = () => {
    setUserAnswer("");
    setIsSaved(false);
    toast.success("Your answer has been reset.");
  };

  const handleFinish = () => {
    navigate("/generate");
  };

  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  return (
    <div className="w-full flex flex-col items-center gap-6 mt-4">
      <SaveModal isOpen={open} onClose={() => setOpen(false)} onConfirm={saveUserAnswer} loading={loading} />
      <div className="flex flex-col md:flex-row w-full gap-4">
        <div className="flex-1 p-4 border rounded-md bg-gray-50">
          <h2 className="text-lg font-semibold">Your Answer ({userAnswer.length}/2000):</h2>
          <p className="text-sm mt-2 text-gray-700">{userAnswer || "Start recording to see your answer here"}</p>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center border p-4 bg-gray-50 rounded-md">
          {isWebCam ? <WebCam className="w-[250px] h-[250px] object-cover rounded-md" /> : <WebcamIcon className="min-w-24 min-h-24 text-muted-foreground" />}
          <div className="flex justify-center gap-4 mt-4">
            <TooltipButton content={isWebCam ? "Turn Off" : "Turn On"} icon={isWebCam ? <VideoOff /> : <Video />} onClick={() => setIsWebCam(!isWebCam)} />
            <TooltipButton content={isRecording ? "Stop Recording" : "Start Recording"} icon={isRecording ? <CircleStop /> : <Mic />} onClick={recordUserAnswer} />
            <TooltipButton content="Save Result" icon={loading ? <Loader className="animate-spin" /> : <Save />} onClick={() => setOpen(true)} disabled={loading} />
            <TooltipButton content="Reset Answer" icon={<Trash2 />} onClick={resetUserAnswer} />
            {isSaved && <CheckCircle className="text-green-500 w-6 h-6" />}
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 flex items-center gap-2"
          onClick={isLastQuestion ? handleFinish : onNextQuestion}
          disabled={!isSaved}
        >
          {isLastQuestion ? "Finish" : "Next Question"}
        </button>
      </div>
    </div>
  );
};
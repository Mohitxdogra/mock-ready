import { useAuth } from "@clerk/clerk-react";
import {
  CircleStop,
  Delete,
  Loader,
  Mic,
  RefreshCw,
  Video,
  VideoOff,
  WebcamIcon,
  ArrowRight,
  Save,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import useSpeechToText, { ResultType } from "react-hook-speech-to-text";
import { useParams, useNavigate } from "react-router-dom";
import WebCam from "react-webcam";
import { TooltipButton } from "./tooltip-button";
import { toast } from "sonner";
import { chatSession } from "@/scripts";
import { SaveModal } from "./save-modal";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebase.config";

interface RecordAnswerProps {
  question: { question: string; answer: string };
  isWebCam: boolean;
  setIsWebCam: (value: boolean) => void;
  totalQuestions: number;
  currentQuestionNumber: number;
  setCurrentQuestionNumber: (value: number) => void;
}

interface AIResponse {
  ratings: number;
  feedback: string;
}

export const RecordAnswer = ({
  question,
  isWebCam,
  setIsWebCam,
  totalQuestions,
  currentQuestionNumber,
  setCurrentQuestionNumber,
}: RecordAnswerProps) => {
  const {
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
    // Remove the speechRecognitionOptions if it's causing issues
  });

  const [userAnswer, setUserAnswer] = useState("");
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiResult, setAiResult] = useState<AIResponse | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [silenceDetected, setSilenceDetected] = useState(false);
  const [savedDocId, setSavedDocId] = useState<string | null>(null);
  
  const silenceTimer = useRef<NodeJS.Timeout | null>(null);

  const { userId } = useAuth();
  const { interviewId } = useParams();
  const navigate = useNavigate();

  // Load previous answer when component mounts or question changes
  useEffect(() => {
    const loadPreviousAnswer = async () => {
      if (!userId || !interviewId) return;

      try {
        const userAnswerQuery = query(
          collection(db, "userAnswers"),
          where("userId", "==", userId),
          where("question", "==", question.question),
          where("mockIdRef", "==", interviewId)
        );

        const querySnap = await getDocs(userAnswerQuery);
        
        if (!querySnap.empty) {
          const doc = querySnap.docs[0];
          setUserAnswer(doc.data().user_ans);
          setSavedDocId(doc.id);
          setAiResult({
            ratings: doc.data().rating,
            feedback: doc.data().feedback
          });
        } else {
          // Reset state if no previous answer found
          setUserAnswer("");
          setAiResult(null);
          setSavedDocId(null);
        }
      } catch (error) {
        console.error("Error loading previous answer:", error);
        // Reset state on error
        setUserAnswer("");
        setAiResult(null);
        setSavedDocId(null);
      }
    };

    loadPreviousAnswer();
  }, [question.question, userId, interviewId]);

  const detectSilence = () => {
    // Reset any existing timer
    if (silenceTimer.current) {
      clearTimeout(silenceTimer.current);
    }
    
    // Set a new timer that starts recording after 1 second of silence
    silenceTimer.current = setTimeout(() => {
      setSilenceDetected(true);
      startSpeechToText();
    }, 1000);
  };

  const recordUserAnswer = async () => {
    if (isRecording) {
      stopSpeechToText();
      setSilenceDetected(false);

      if (userAnswer?.length < 30) {
        toast.error("Error", {
          description: "Your answer should be more than 30 characters",
        });
        return;
      }

      // Generate AI result
      const aiResult = await generateResult(
        question.question,
        question.answer,
        userAnswer
      );

      setAiResult(aiResult);
      
      // Automatically save to Firebase
      saveToFirebase(aiResult);
    } else {
      detectSilence();
    }
  };

  const cleanJsonResponse = (responseText: string) => {
    // Step 1: Trim any surrounding whitespace
    let cleanText = responseText.trim();

    // Step 2: Remove any occurrences of "json" or code block symbols (``` or `)
    cleanText = cleanText.replace(/(json|```|`)/g, "");

    // Step 3: Parse the clean JSON text into an object
    try {
      return JSON.parse(cleanText);
    } catch (error) {
      throw new Error("Invalid JSON format: " + (error as Error)?.message);
    }
  };

  const generateResult = async (
    qst: string,
    qstAns: string,
    userAns: string
  ): Promise<AIResponse> => {
    setIsAiGenerating(true);
    const prompt = `
      Question: "${qst}"
      User Answer: "${userAns}"
      Correct Answer: "${qstAns}"
      Please compare the user's answer to the correct answer, and provide a rating (from 1 to 10) based on answer quality, and offer feedback for improvement.
      Return the result in JSON format with the fields "ratings" (number) and "feedback" (string).
    `;

    try {
      const aiResult = await chatSession.sendMessage(prompt);

      const parsedResult: AIResponse = cleanJsonResponse(
        aiResult.response.text()
      );
      return parsedResult;
    } catch (error) {
      console.log(error);
      toast("Error", {
        description: "An error occurred while generating feedback.",
      });
      return { ratings: 0, feedback: "Unable to generate feedback" };
    } finally {
      setIsAiGenerating(false);
    }
  };

  const recordNewAnswer = () => {
    setUserAnswer("");
    stopSpeechToText();
    detectSilence();
  };

  const saveToFirebase = async (result: AIResponse) => {
    if (!result) return;
    
    setLoading(true);
    const currentQuestion = question.question;
    
    try {
      // Check if the user already answered this question
      const userAnswerQuery = query(
        collection(db, "userAnswers"),
        where("userId", "==", userId),
        where("question", "==", currentQuestion),
        where("mockIdRef", "==", interviewId)
      );

      const querySnap = await getDocs(userAnswerQuery);

      if (!querySnap.empty) {
        // Update existing answer
        const docId = querySnap.docs[0].id;
        await deleteDoc(doc(db, "userAnswers", docId));
        toast.info("Previous answer updated", {
          description: "Your previous answer has been replaced",
        });
      }
      
      // Save the user answer
      const docRef = await addDoc(collection(db, "userAnswers"), {
        mockIdRef: interviewId,
        question: question.question,
        correct_ans: question.answer,
        user_ans: userAnswer,
        feedback: result.feedback,
        rating: result.ratings,
        userId,
        createdAt: serverTimestamp(),
      });

      setSavedDocId(docRef.id);
      toast("Saved", { description: "Your answer has been saved successfully" });
      
      // Move to next question if not on the last question
      if (currentQuestionNumber < totalQuestions) {
        setCurrentQuestionNumber(currentQuestionNumber + 1);
      }
      
    } catch (error) {
      toast("Error", {
        description: "An error occurred while saving your answer.",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteAnswer = async () => {
    if (!savedDocId) return;
    
    try {
      await deleteDoc(doc(db, "userAnswers", savedDocId));
      setUserAnswer("");
      setAiResult(null);
      setSavedDocId(null);
      toast("Deleted", { description: "Your answer has been deleted" });
    } catch (error) {
      toast("Error", {
        description: "An error occurred while deleting your answer.",
      });
      console.log(error);
    }
  };

  const handleFinishInterview = async () => {
    if (!savedDocId && aiResult) {
      await saveToFirebase(aiResult);
    }
    navigate("/generate");
  };

  useEffect(() => {
    const combineTranscripts = results
      .filter((result): result is ResultType => typeof result !== "string")
      .map((result) => result.transcript)
      .join(" ");

    setUserAnswer(combineTranscripts);
  }, [results]);

  useEffect(() => {
    // Cleanup silence detection timer on unmount
    return () => {
      if (silenceTimer.current) {
        clearTimeout(silenceTimer.current);
      }
    };
  }, []);

  return (
    <div className="w-full flex flex-col md:flex-row gap-8 mt-4">
      {/* Answer Section - Left Side */}
      <div className="w-full md:w-1/2 flex flex-col gap-6">
        <div className="w-full p-6 border rounded-lg bg-blue-50 shadow-md flex-grow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-blue-800">Your Answer:</h2>
            <TooltipButton
              content="Delete Answer"
              icon={<Delete className="w-6 h-6" />}
              onClick={deleteAnswer}
              disabled={!savedDocId}
              buttonClassName="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-lg"
            />
          </div>
          <div className="min-h-[200px] md:min-h-[300px] bg-white rounded-lg p-4 border">
            <p className="text-base text-gray-700 whitespace-normal">
              {userAnswer || "Start recording to see your answer here"}
            </p>
            {interimResult && (
              <p className="text-sm text-blue-600 mt-2">
                <strong>Current Speech:</strong> {interimResult}
              </p>
            )}
          </div>
        </div>

        {aiResult && (
          <div className="w-full p-6 border rounded-lg bg-blue-50 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-blue-800">Feedback:</h2>
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium text-lg">
                Rating: {aiResult.ratings}/10
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border">
              <p className="text-base text-gray-700">
                {isAiGenerating ? (
                  <div className="flex items-center gap-2">
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Generating feedback...</span>
                  </div>
                ) : (
                  aiResult.feedback
                )}
              </p>
            </div>
          </div>
        )}

        {silenceDetected && !isRecording && (
          <div className="w-full p-4 border rounded-lg bg-yellow-50 shadow-md">
            <p className="text-base text-yellow-700">
              Listening for speech to begin recording...
            </p>
          </div>
        )}
      </div>

      {/* Webcam Section - Right Side */}
      <div className="w-full md:w-1/2 flex flex-col items-center gap-6">
        <div className="w-full h-[300px] md:h-[500px] flex flex-col items-center justify-center border-2 p-4 bg-blue-50 rounded-lg shadow-md">
          {isWebCam ? (
            <WebCam
              onUserMedia={() => setIsWebCam(true)}
              onUserMediaError={() => setIsWebCam(false)}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <WebcamIcon className="w-32 h-32 text-blue-300" />
          )}
        </div>

        {/* Control Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 w-full">
          <TooltipButton
            content={isWebCam ? "Turn Off Camera" : "Turn On Camera"}
            icon={
              isWebCam ? (
                <VideoOff className="w-6 h-6" />
              ) : (
                <Video className="w-6 h-6" />
              )
            }
            onClick={() => setIsWebCam(!isWebCam)}
            buttonClassName="bg-blue-100 hover:bg-blue-200 text-blue-700 p-3 rounded-full shadow-md transition-all duration-300 hover:scale-105"
          />

          <TooltipButton
            content={isRecording ? "Stop Recording" : "Start Recording"}
            icon={
              isRecording ? (
                <CircleStop className="w-6 h-6" />
              ) : silenceDetected ? (
                <Loader className="w-6 h-6 animate-spin" />
              ) : (
                <Mic className="w-6 h-6" />
              )
            }
            onClick={recordUserAnswer}
            disabled={isAiGenerating}
            buttonClassName="bg-green-100 hover:bg-green-200 text-green-700 p-3 rounded-full shadow-md transition-all duration-300 hover:scale-105"
          />

          <TooltipButton
            content="Save Answer"
            icon={<Save className="w-6 h-6" />}
            onClick={() => saveToFirebase(aiResult!)}
            disabled={!aiResult || loading}
            buttonClassName={`${
              loading 
                ? 'bg-gray-100 text-gray-400' 
                : 'bg-purple-100 hover:bg-purple-200 text-purple-700 hover:scale-105'
            } p-3 rounded-full shadow-md transition-all duration-300 relative`}
          />

          <TooltipButton
            content="Record Again"
            icon={<RefreshCw className="w-6 h-6" />}
            onClick={recordNewAnswer}
            buttonClassName="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 p-3 rounded-full shadow-md transition-all duration-300 hover:scale-105"
          />
        </div>

        {/* Only show Finish button on last question */}
        {Boolean(currentQuestionNumber) && Boolean(totalQuestions) && currentQuestionNumber === totalQuestions && (
          <div className="flex justify-center mt-6">
            <TooltipButton
              content="Finish Interview"
              icon={<ArrowRight className="w-6 h-6" />}
              onClick={handleFinishInterview}
              disabled={!aiResult}
              buttonClassName="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg text-lg font-medium shadow-lg transition-all duration-300 hover:scale-105"
            />
          </div>
        )}
      </div>

      {/* Save modal */}
      <SaveModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => saveToFirebase(aiResult!)}
        loading={loading}
      />
    </div>
  );
};
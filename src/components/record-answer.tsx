/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAuth } from "@clerk/clerk-react";
import {
  CircleStop,
  Loader,
  Mic,
  Save,
  Video,
  VideoOff,
  WebcamIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import { useParams } from "react-router-dom";
import WebCam from "react-webcam";
import { TooltipButton } from "./tooltip-button";
import { toast } from "sonner";
import {
  addDoc,
  updateDoc,
  doc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { SaveModal } from "./save-modal";

interface RecordAnswerProps {
  question: { question: string; answer: string };
  isWebCam: boolean;
  setIsWebCam: (value: boolean) => void;
  onNextQuestion: () => void;
}

export const RecordAnswer = ({ question, isWebCam, setIsWebCam, onNextQuestion }: RecordAnswerProps) => {
  const { isRecording, results, startSpeechToText, stopSpeechToText } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const [userAnswer, setUserAnswer] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const { userId } = useAuth();
  const { interviewId } = useParams();

  useEffect(() => {
    if (results.length > 0) {
      const lastResult = results[results.length - 1];
      const newText = typeof lastResult === "string" ? lastResult : lastResult.transcript;
      setUserAnswer((prev) => prev + " " + newText);
    }
  }, [results]);

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
    if (isRecording) {
      stopSpeechToText();
    } else {
      setStartTime(Date.now());
      startSpeechToText();
    }
  };

  const saveUserAnswer = async () => {
    setLoading(true);
    if (userAnswer.length < 30) {
      toast.error("Your answer should be more than 30 characters");
      setLoading(false);
      return;
    }
    const responseTime = startTime ? Date.now() - startTime : 0;
    try {
      const docRef = await addDoc(collection(db, "userAnswers"), {
        mockIdRef: interviewId,
        question: question.question,
        correct_ans: question.answer,
        user_ans: userAnswer,
        userId,
        responseTime,
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

  return (
    <div className="w-full flex flex-col items-center gap-8 mt-4">
      <SaveModal isOpen={open} onClose={() => setOpen(false)} onConfirm={saveUserAnswer} loading={loading} />
      <div className="flex flex-col md:flex-row w-full gap-4">
        <div className="flex-1 p-4 border rounded-md bg-gray-50">
          <h2 className="text-lg font-semibold">Your Answer:</h2>
          <p className="text-sm mt-2 text-gray-700">{userAnswer || "Start recording to see your answer here"}</p>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center border p-4 bg-gray-50 rounded-md">
          {isWebCam ? <WebCam className="w-[250px] h-[250px] object-cover rounded-md" /> : <WebcamIcon className="min-w-24 min-h-24 text-muted-foreground" />}
          <div className="flex justify-center gap-4 mt-4">
            <TooltipButton content={isWebCam ? "Turn Off" : "Turn On"} icon={isWebCam ? <VideoOff /> : <Video />} onClick={() => setIsWebCam(!isWebCam)} />
            <TooltipButton content={isRecording ? "Stop Recording" : "Start Recording"} icon={isRecording ? <CircleStop /> : <Mic />} onClick={recordUserAnswer} />
            <TooltipButton content="Save Result" icon={loading ? <Loader className="animate-spin" /> : <Save />} onClick={() => setOpen(true)} disabled={loading} />
          </div>
        </div>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50" onClick={onNextQuestion} disabled={!isSaved}>
        Next Question
      </button>
    </div>
  );
};

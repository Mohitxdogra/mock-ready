/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAuth } from "@clerk/clerk-react";
import {
  CircleStop,
  Loader,
  Mic,
  RefreshCw,
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
import { chatSession } from "../scripts/index";
import { SaveModal } from "./save-modal";
import {
  addDoc,
  collection,
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
}

interface AIResponse {
  ratings: number;
  feedback: string;
}

export const RecordAnswer = ({ question, isWebCam, setIsWebCam }: RecordAnswerProps) => {
  const { interimResult, isRecording, results, startSpeechToText, stopSpeechToText } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const [userAnswer, setUserAnswer] = useState("");
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiResult, setAiResult] = useState<AIResponse | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { userId } = useAuth();
  const { interviewId } = useParams();

  const recordUserAnswer = async () => {
    if (isRecording) {
      stopSpeechToText();
      if (userAnswer?.length < 30) {
        toast.error("Your answer should be more than 30 characters");
        return;
      }
      setAiResult(await generateResult(question.question, question.answer, userAnswer));
    } else {
      startSpeechToText();
    }
  };

  const cleanJsonResponse = (responseText: string) => {
    let cleanText = responseText.trim().replace(/(```|json|`)/g, "");
    try {
      return JSON.parse(cleanText);
    } catch (error) {
      throw new Error("Invalid JSON format: " + (error as Error)?.message);
    }
  };

  const generateResult = async (qst: string, qstAns: string, userAns: string): Promise<AIResponse> => {
    setIsAiGenerating(true);
    const prompt = `
      Question: "${qst}"
      User Answer: "${userAns}"
      Correct Answer: "${qstAns}"
      Please compare and rate (1-10) with feedback in JSON format: {"ratings": number, "feedback": string}.
    `;
    try {
      const aiResult = await chatSession.sendMessage(prompt);
      return cleanJsonResponse(await aiResult.response.text());
    } catch (error) {
      toast.error("An error occurred while generating feedback.");
      console.error(error);
      return { ratings: 0, feedback: "Unable to generate feedback" };
    } finally {
      setIsAiGenerating(false);
    }
  };

  const saveUserAnswer = async () => {
    setLoading(true);
    if (!aiResult) return;
    try {
      const userAnswerQuery = query(
        collection(db, "userAnswers"),
        where("userId", "==", userId),
        where("question", "==", question.question)
      );
      if (!(await getDocs(userAnswerQuery)).empty) {
        toast.info("You have already answered this question");
        return;
      }
      await addDoc(collection(db, "userAnswers"), {
        mockIdRef: interviewId,
        question: question.question,
        correct_ans: question.answer,
        user_ans: userAnswer,
        feedback: aiResult.feedback,
        rating: aiResult.ratings,
        userId,
        createdAt: serverTimestamp(),
      });
      toast.success("Your answer has been saved.");
    } catch (error) {
      toast.error("An error occurred while saving.");
      console.error(error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  useEffect(() => {
    setUserAnswer(results.map((result) => (typeof result !== "string" ? result.transcript : "")).join(" "));
  }, [results]);

  return (
    <div className="w-full flex flex-col items-center gap-8 mt-4">
      <SaveModal isOpen={open} onClose={() => setOpen(false)} onConfirm={saveUserAnswer} loading={loading} />
      <div className="w-full h-[400px] md:w-96 flex flex-col items-center justify-center border p-4 bg-gray-50 rounded-md">
        {isWebCam ? <WebCam className="w-full h-full object-cover rounded-md" /> : <WebcamIcon className="min-w-24 min-h-24 text-muted-foreground" />}
      </div>
      <div className="flex justify-center gap-3">
        <TooltipButton content={isWebCam ? "Turn Off" : "Turn On"} icon={isWebCam ? <VideoOff /> : <Video />} onClick={() => setIsWebCam(!isWebCam)} />
        <TooltipButton content={isRecording ? "Stop Recording" : "Start Recording"} icon={isRecording ? <CircleStop /> : <Mic />} onClick={recordUserAnswer} />
        <TooltipButton content="Record Again" icon={<RefreshCw />} onClick={() => { setUserAnswer(""); startSpeechToText(); }} />
        <TooltipButton content="Save Result" icon={isAiGenerating ? <Loader className="animate-spin" /> : <Save />} onClick={() =>
           setOpen(true)} disabled={!aiResult} />
      </div>
      <div className="w-full mt-4 p-4 border rounded-md bg-gray-50">
        <h2 className="text-lg font-semibold">Your Answer:</h2>
        <p className="text-sm mt-2 text-gray-700">{userAnswer || "Start recording to see your answer here"}</p>
        {interimResult && <p className="text-sm text-gray-500 mt-2"><strong>Current Speech:</strong> {interimResult}</p>}
      </div>
    </div>
  );
};

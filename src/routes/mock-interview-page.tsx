/* eslint-disable @typescript-eslint/no-unused-vars */
import { Interview } from "../types";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoaderPage } from "./loader-page";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase.config";
import { CustomBreadCrumb } from "../components/custom-bread-crumb";

import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Lightbulb } from "lucide-react";
import { QuestionSection } from "@/components/question-section";

export const MockInterviewPage = () => {
  const { interviewId } = useParams<{ interviewId: string }>();
  const navigate = useNavigate();

  const [interview, setInterview] = useState<Interview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!interviewId) {
      navigate("/generate", { replace: true });
      return;
    }

    const fetchInterview = async () => {
      try {
        const interviewDoc = await getDoc(doc(db, "interviews", interviewId));
        if (interviewDoc.exists()) {
          setInterview({ id: interviewDoc.id, ...interviewDoc.data() } as Interview);
        } else {
          setError("Interview not found.");
        }
      } catch (error) {
        console.error("Error fetching interview:", error);
        setError("Failed to load interview. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInterview();
  }, [interviewId]);

  if (isLoading) return <LoaderPage className="w-full h-[70vh]" />;

  if (error) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <Alert className="bg-red-100 border border-red-300 p-4 rounded-lg">
          <AlertTitle className="text-red-700 font-semibold">Error</AlertTitle>
          <AlertDescription className="text-red-600">{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!interview) {
    navigate("/generate", { replace: true });
    return null;
  }

  return (
    <div className="flex flex-col w-full gap-8 py-5">
      <CustomBreadCrumb
        breadCrumbPage="Start"
        breadCrumpItems={[
          { label: "Mock Interviews", link: "/generate" },
          { label: interview.position || "", link: `/generate/interview/${interview.id}` },
        ]}
      />

      <div className="w-full">
        <Alert className="bg-sky-100 border border-sky-200 p-4 rounded-lg flex items-start gap-3">
          <Lightbulb className="h-5 w-5 text-sky-600" />
          <div>
            <AlertTitle className="text-sky-800 font-semibold">Important Note</AlertTitle>
            <AlertDescription className="text-sm text-sky-700 mt-1 leading-relaxed">
              Press "Record Answer" to begin answering the question. Once you finish the interview, 
              you&apos;ll receive feedback comparing your responses with the ideal answers.
              <br />
              <br />
              <strong>Note:</strong> <span className="font-medium">Your video is never recorded.</span> 
              You can disable the webcam anytime if preferred.
            </AlertDescription>
          </div>
        </Alert>
      </div>

      {interview.questions?.length > 0 && (
        <div className="mt-4 w-full flex flex-col items-start gap-4">
          <QuestionSection questions={interview.questions} />
        </div>
      )}
    </div>
  );
};

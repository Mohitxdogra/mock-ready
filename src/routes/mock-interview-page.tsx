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
        <Alert className="bg-red-50 border border-red-300 p-6 rounded-xl shadow-lg">
          <AlertTitle className="text-red-800 font-bold text-lg">Oops!</AlertTitle>
          <AlertDescription className="text-red-700 text-sm">{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!interview) {
    navigate("/generate", { replace: true });
    return null;
  }

  return (
    <div className="flex flex-col w-full gap-8 py-4 px-4 md:px-8 bg-gradient-to-r from-blue-50 to-blue-100">
      <CustomBreadCrumb
        breadCrumbPage="Start"
        breadCrumpItems={[
          { label: "Mock Interviews", link: "/generate" },
          { label: interview.position || "Interview", link: `/generate/interview/${interview.id}` },
        ]}
      />

      <div className="w-full bg-white rounded-lg shadow-xl p-6 mb-8">
        <Alert className="bg-gradient-to-r from-indigo-100 to-indigo-300 border border-indigo-400 p-5 rounded-lg flex items-center gap-4 shadow-md">
          <Lightbulb className="h-6 w-6 text-yellow-500 animate-pulse" />
          <div>
            <AlertTitle className="text-indigo-800 font-semibold text-xl">Important Note</AlertTitle>
            <AlertDescription className="text-sm text-gray-700 mt-2 leading-relaxed space-y-2">
              <p>
                Press <span className="font-semibold text-indigo-700">"Record Answer"</span> to begin answering the question.
                Once you finish the interview, you'll receive feedback comparing your responses with the ideal answers.
              </p>
              <p>
                <strong className="text-indigo-800">Note:</strong>{" "}
                <span className="font-medium text-gray-900">Your video is never recorded.</span>
                You can disable the webcam anytime if preferred.
              </p>
            </AlertDescription>
          </div>
        </Alert>
      </div>

      {interview.questions?.length > 0 && (
        <div className="w-full bg-white p-6 rounded-lg shadow-lg">
          <QuestionSection questions={interview.questions} />
        </div>
      )}
    </div>
  );
};

import { db } from "@/config/firebase.config";
import { Interview } from "@/types";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LoaderPage } from "./loader-page";
import { CustomBreadCrumb } from "@/components/custom-bread-crumb";
import { Button } from "@/components/ui/button";
import { Lightbulb, Sparkles, WebcamIcon } from "lucide-react";
import { InterviewPin } from "@/components/pin";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import WebCam from "react-webcam";

export const MockLoadPage = () => {
  const { interviewId } = useParams<{ interviewId: string }>();
  const [interview, setInterview] = useState<Interview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isWebCamEnabled, setIsWebCamEnabled] = useState(false);
  const navigate = useNavigate();

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
          navigate("/generate", { replace: true });
        }
      } catch (error) {
        console.error("Error fetching interview:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInterview();
  }, [interviewId]);

  if (isLoading) return <LoaderPage className="w-full h-[70vh]" />;
  if (!interview) return null; // Prevents unnecessary rendering before navigation

  return (
    
<div className="flex flex-col w-full gap-4 py-5 px-3 bg-gradient-to-r from-purple-50 to-indigo-200 min-h-screen">
  <div className="flex items-center justify-between w-full gap-3">
    <CustomBreadCrumb
      breadCrumbPage={interview?.position || ""}
      breadCrumpItems={[{ label: "Mock Interviews", link: "/generate" }]}
    />

    <Link to={`/generate/interview/${interviewId}/start`}>
      <Button size="sm" className="bg-indigo-600 text-white hover:bg-indigo-700 transition-all py-2 px-4 rounded-md">
        Start <Sparkles />
      </Button>
    </Link>
  </div>

      <InterviewPin interview={interview} onMockPage />

      <Alert className="bg-amber-100/60 border-amber-300 p-4 rounded-xl shadow-sm mb-4">
        <Lightbulb className="h-5 w-5 text-amber-600" />
        <div>
          <AlertTitle className="text-amber-800 font-semibold text-base">Important Information</AlertTitle>
          <AlertDescription className="text-xs text-amber-700 mt-1">
            Please enable your webcam and microphone to start the AI-generated mock interview.
            <br />
            <span className="font-medium">Note:</span> Your video is <strong>never recorded</strong>. 
            You can disable your webcam at any time.
          </AlertDescription>
        </div>
      </Alert>

      <div className="flex justify-center items-center w-full py-4">
        <div className="w-full max-w-md md:w-80 flex flex-col items-center justify-center border p-4 bg-gray-100 rounded-xl shadow-md">
          {isWebCamEnabled ? (
            <WebCam
              onUserMedia={() => setIsWebCamEnabled(true)}
              onUserMediaError={() => setIsWebCamEnabled(false)}
              className="w-full h-full object-cover rounded-md"
            />
          ) : (
            <WebcamIcon className="min-w-[120px] min-h-[120px] text-muted-foreground" />
          )}
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <Button
          onClick={() => setIsWebCamEnabled(!isWebCamEnabled)}
          className="bg-indigo-600 text-white hover:bg-indigo-700 transition-all py-1.5 px-4 rounded-md"
        >
          {isWebCamEnabled ? "Disable Webcam" : "Enable Webcam"}
        </Button>
      </div>
    </div>
  );
};

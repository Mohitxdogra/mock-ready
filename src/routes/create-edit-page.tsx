import { db } from "@/config/firebase.config";
import { FormMockInterview } from "@/components/form-mock-interview";
import { Interview } from "@/types";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export const CreateEditPage = () => {
  const { interviewId } = useParams<{ interviewId?: string }>();
  const [interview, setInterview] = useState<Interview | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchInterview = async () => {
      if (!interviewId) {
        setLoading(false);
        return;
      }

      try {
        const interviewDoc = await getDoc(doc(db, "interviews", interviewId));

        if (interviewDoc.exists()) {
          setInterview(interviewDoc.data() as Interview);
        } else {
          toast.error("Interview not found.");
        }
      } catch (error) {
        console.error("Error fetching interview:", error);
        toast.error("Failed to load interview. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchInterview();
  }, [interviewId]);

  return (
    <div className="my-4 flex flex-col w-full">
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <FormMockInterview initialData={interview} />
      )}
    </div>
  );
};

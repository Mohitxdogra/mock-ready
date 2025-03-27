import { FormMockInterview } from "@/components/form-mock-interview";
import { db } from "@/config/firebase.config";
import { Interview } from "@/types";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const CreateEditPage = () => {
  const { interviewId } = useParams<{ interviewId: string }>();
  const navigate = useNavigate();

  const [interview, setInterview] = useState<Interview | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!interviewId) return;

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

  const handleReset = () => {
    setInterview(null);
  };

  const handleDelete = async () => {
    if (!interviewId) return;

    try {
      await deleteDoc(doc(db, "interviews", interviewId));
      setInterview(null);
      navigate("/generate", { replace: true }); // Redirect after deletion
    } catch (error) {
      console.error("Error deleting interview:", error);
      setError("Failed to delete the interview.");
    }
  };

  if (isLoading) return <p>Loading interview...</p>;

  return (
    <div className="my-4 flex-col w-full">
      {error && <p className="text-red-500">{error}</p>}
      <FormMockInterview initialData={interview} onReset={handleReset} onDelete={handleDelete} />
    </div>
  );
};

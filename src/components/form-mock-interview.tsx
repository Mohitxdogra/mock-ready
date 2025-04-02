import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Interview } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { CustomBreadCrumb } from "@/components/custom-bread-crumb";
import { Headings } from "@/components/headings";
import { Button } from "@/components/ui/button";
import { Loader, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { generateAIResult } from "@/lib/generate-ai-result";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { toast } from "sonner";

interface FormMockInterviewProps {
  initialData: Interview | null;
}

const formSchema = z.object({
  position: z.string().min(1, "Position is required").max(100),
  description: z.string().min(10, "Description is required"),
  experience: z.coerce.number().min(0, "Experience cannot be negative"),
  techStack: z.string().min(1, "Tech stack is required"),
});

type FormData = z.infer<typeof formSchema>;

const defaultValues: FormData = {
  position: "",
  description: "",
  experience: 0,
  techStack: "",
};

export const FormMockInterview = ({ initialData }: FormMockInterviewProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || defaultValues,
  });

  const { isValid, isSubmitting } = form.formState;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { userId } = useAuth();

  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form]);

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const aiResult = await generateAIResult(data);

      if (initialData) {
        await updateDoc(doc(db, "interviews", initialData.id), {
          questions: aiResult.questions,
          ...data,
          updatedAt: serverTimestamp(),
        });
        toast.success("Updated!", { description: "Changes saved successfully." });
      } else {
        const interviewRef = await addDoc(collection(db, "interviews"), {
          ...data,
          userId,
          questions: aiResult.questions,
          createdAt: serverTimestamp(),
        });

        await updateDoc(doc(db, "interviews", interviewRef.id), {
          id: interviewRef.id,
          updatedAt: serverTimestamp(),
        });

        toast.success("Created!", { description: "New Mock Interview created." });
      }

      navigate("/generate", { replace: true });
    } catch (error) {
      console.error(error);
      toast.error("Error!", { description: "Something went wrong." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    form.reset(initialData || defaultValues);
    toast.success("Form reset", {
      description: "All fields have been reset to their default values.",
    });
  };

  const handleDelete = async () => {
    if (!initialData?.id) return;

    try {
      setIsLoading(true);
      await deleteDoc(doc(db, "interviews", initialData.id));
      toast.success("Deleted!", { description: "Interview deleted successfully." });
      navigate("/generate");
    } catch (error) {
      console.error("Error deleting interview:", error);
      toast.error("Error!", { description: "Could not delete the interview." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex-col space-y-4">
      <CustomBreadCrumb
        breadCrumbPage={initialData?.position || "Create"}
        breadCrumpItems={[{ label: "Mock Interviews", link: "/generate" }]}
      />

      <div className="mt-4 flex items-center justify-between w-full">
        <Headings title={initialData ? initialData.position : "Create a new mock interview"} isSubHeading />
        {initialData && (
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={handleDelete} 
            disabled={isLoading}
            className="hover:bg-red-500/10 hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Separator className="my-4" />

      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full p-8 rounded-lg flex-col flex items-start gap-6 shadow-md"
        >
          <FormField control={form.control} name="position" render={({ field }) => (
            <FormItem className="w-full space-y-4">
              <FormLabel>Job Role / Position</FormLabel>
              <FormControl>
                <Input {...field} className="h-12" disabled={isLoading} placeholder="e.g., Full Stack Developer" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="description" render={({ field }) => (
            <FormItem className="w-full space-y-4">
              <FormLabel>Job Description</FormLabel>
              <FormControl>
                <Textarea {...field} className="h-12" disabled={isLoading} placeholder="Describe the job role" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="experience" render={({ field }) => (
            <FormItem className="w-full space-y-4">
              <FormLabel>Years of Experience</FormLabel>
              <FormControl>
                <Input type="number" {...field} className="h-12" disabled={isLoading} placeholder="e.g., 5 Years" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="techStack" render={({ field }) => (
            <FormItem className="w-full space-y-4">
              <FormLabel>Tech Stacks</FormLabel>
              <FormControl>
                <Textarea {...field} className="h-12" disabled={isLoading} placeholder="e.g., React, TypeScript..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <div className="w-full flex items-center justify-end gap-6">
            <Button type="button" size="sm" variant="outline" onClick={handleReset} disabled={isSubmitting || isLoading}>
              Reset
            </Button>
            <Button type="submit" size="sm" disabled={isSubmitting || !isValid || isLoading}>
              {isLoading ? <Loader className="text-gray-50 animate-spin" /> : (initialData ? "Save Changes" : "Create")}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

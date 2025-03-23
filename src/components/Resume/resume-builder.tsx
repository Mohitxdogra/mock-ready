import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { saveAs } from "file-saver";

const resumeSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Invalid phone number"),
  summary: z.string().min(10, "Summary is required"),
  experience: z
    .array(
      z.object({
        company: z.string().min(1, "Company name required"),
        role: z.string().min(1, "Role required"),
        duration: z.string().min(1, "Duration required"),
      })
    )
    .optional(),
  education: z
    .array(
      z.object({
        institution: z.string().min(1, "Institution required"),
        degree: z.string().min(1, "Degree required"),
        year: z.string().min(1, "Year required"),
      })
    )
    .optional(),
});

type ResumeData = z.infer<typeof resumeSchema>;

const ResumeBuilder: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ResumeData>({ resolver: zodResolver(resumeSchema) });

  const { fields: expFields, append: addExperience } = useFieldArray({
    control,
    name: "experience",
  });

  const { fields: eduFields, append: addEducation } = useFieldArray({
    control,
    name: "education",
  });

  const onSubmit = (data: ResumeData) => {
    const resumeBlob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    saveAs(resumeBlob, "resume.json");
  };

  return (
    <Card className="max-w-2xl mx-auto p-6">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">Resume Builder</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input placeholder="Name" {...register("name")} />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          <Input placeholder="Email" {...register("email")} />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}

          <Input placeholder="Phone" {...register("phone")} />
          {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

          <Input placeholder="Summary" {...register("summary")} />
          {errors.summary && <p className="text-red-500">{errors.summary.message}</p>}

          <h3 className="font-bold mt-4">Experience</h3>
          {expFields.map((field, index) => (
            <div key={field.id} className="space-y-2">
              <Input placeholder="Company" {...register(`experience.${index}.company`)} />
              <Input placeholder="Role" {...register(`experience.${index}.role`)} />
              <Input placeholder="Duration" {...register(`experience.${index}.duration`)} />
            </div>
          ))}
          <Button type="button" onClick={() => addExperience({ company: "", role: "", duration: "" })}>Add Experience</Button>

          <h3 className="font-bold mt-4">Education</h3>
          {eduFields.map((field, index) => (
            <div key={field.id} className="space-y-2">
              <Input placeholder="Institution" {...register(`education.${index}.institution`)} />
              <Input placeholder="Degree" {...register(`education.${index}.degree`)} />
              <Input placeholder="Year" {...register(`education.${index}.year`)} />
            </div>
          ))}
          <Button type="button" onClick={() => addEducation({ institution: "", degree: "", year: "" })}>Add Education</Button>

          <Button type="submit" className="w-full">Download Resume</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ResumeBuilder;
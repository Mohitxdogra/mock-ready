import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "tailwindcss/tailwind.css";

const ResumeBuilder: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    summary: "",
    experience: "",
    education: "",
    skills: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("Resume", 20, 20);
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${formData.name}`, 20, 30);
    doc.text(`Email: ${formData.email}`, 20, 40);
    doc.text(`Phone: ${formData.phone}`, 20, 50);
    doc.text(`Address: ${formData.address}`, 20, 60);
    doc.text(`Summary: ${formData.summary}`, 20, 70);
    doc.text(`Experience: ${formData.experience}`, 20, 80);
    doc.text(`Education: ${formData.education}`, 20, 90);
    doc.text(`Skills: ${formData.skills}`, 20, 100);
    doc.save("resume.pdf");
  };

  return (
    <div className="min-h-screen bg-green-100 flex justify-center items-center p-5">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-green-700 text-center mb-4">Resume Builder</h2>
        <form className="grid gap-4">
          {Object.keys(formData).map((key) => (
            <div key={key}>
              <label className="block text-green-700 font-medium" htmlFor={key}>{key.toUpperCase()}</label>
              {key === "summary" || key === "experience" || key === "education" || key === "skills" ? (
                <textarea
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  name={key}
                  value={formData[key as keyof typeof formData]}
                  onChange={handleChange}
                />
              ) : (
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  name={key}
                  value={formData[key as keyof typeof formData]}
                  onChange={handleChange}
                />
              )}
            </div>
          ))}
          <button
            type="button"
            className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition"
            onClick={generatePDF}
          >
            Download PDF
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResumeBuilder;

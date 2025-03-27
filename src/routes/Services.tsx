import React from "react";

const Services: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center px-6 py-12 bg-white text-gray-900">
      <div className="max-w-5xl text-center">
        <h1 className="text-4xl font-bold mb-6">Our Services</h1>
        <p className="text-lg mb-8">
          At <span className="font-semibold">Mock Ready</span>, we provide AI-powered tools to help you succeed in your job search. From interview preparation to resume enhancement, our services are designed to give you a competitive edge.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-3">AI Mock Interviews</h2>
            <p className="text-lg">Simulate real interview scenarios with AI-driven feedback to improve your confidence and performance.</p>
          </div>

          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-3">Resume Builder</h2>
            <p className="text-lg">Create professional, ATS-friendly resumes with our smart AI resume builder, tailored for any industry.</p>
          </div>

          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-3">Personalized Career Coaching</h2>
            <p className="text-lg">Get expert guidance on job applications, salary negotiations, and career growth strategies.</p>
          </div>

          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-3">Soft Skills Training</h2>
            <p className="text-lg">Enhance your communication, leadership, and interpersonal skills to stand out in the job market.</p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Why Choose Us?</h2>
        <ul className="text-lg list-disc list-inside mb-6">
          <li>AI-driven insights tailored to your job profile</li>
          <li>Real-time feedback for continuous improvement</li>
          <li>Comprehensive tools for end-to-end job preparation</li>
          <li>Designed for professionals, freshers, and career changers</li>
        </ul>

        <p className="text-lg mt-6">
          Elevate your job search with <span className="font-semibold">Mock Ready</span>. Start preparing today and land your dream job!
        </p>
      </div>
    </section>
  );
};

export default Services;
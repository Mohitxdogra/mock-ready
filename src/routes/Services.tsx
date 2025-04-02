import React from "react";

const Services: React.FC = () => {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-[#0d1b2a] text-gray-300">
      <div className="max-w-5xl text-center">
        <h1 className="text-5xl font-extrabold mb-6 text-white">Our Services</h1>
        <p className="text-lg mb-8">
          At <span className="font-semibold text-blue-400">Mock Ready</span>, we provide AI-powered tools to help you succeed in your job search. From interview preparation to resume enhancement, our services are designed to give you a competitive edge.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-[#1b263b] rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-3 text-white">AI Mock Interviews</h2>
            <p className="text-lg">Simulate real interview scenarios with AI-driven feedback to improve your confidence and performance.</p>
          </div>

          <div className="p-6 bg-[#1b263b] rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-3 text-white">Resume Builder</h2>
            <p className="text-lg">Create professional, ATS-friendly resumes with our smart AI resume builder, tailored for any industry.</p>
          </div>

          <div className="p-6 bg-[#1b263b] rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-3 text-white">Personalized Career Coaching</h2>
            <p className="text-lg">Get expert guidance on job applications, salary negotiations, and career growth strategies.</p>
          </div>

          <div className="p-6 bg-[#1b263b] rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-3 text-white">Soft Skills Training</h2>
            <p className="text-lg">Enhance your communication, leadership, and interpersonal skills to stand out in the job market.</p>
          </div>
        </div>

        <h2 className="text-3xl font-semibold mt-10 mb-4 text-white">Why Choose Us?</h2>
        <ul className="text-lg list-disc list-inside mb-6 max-w-lg mx-auto text-gray-300">
          <li className="mb-2">AI-driven insights tailored to your job profile</li>
          <li className="mb-2">Real-time feedback for continuous improvement</li>
          <li className="mb-2">Comprehensive tools for end-to-end job preparation</li>
          <li className="mb-2">Designed for professionals, freshers, and career changers</li>
        </ul>

        <p className="text-lg mt-6">
          Elevate your job search with <span className="font-semibold text-blue-400">Mock Ready</span>. Start preparing today and land your dream job!
        </p>
      </div>
    </section>
  );
};

export default Services;

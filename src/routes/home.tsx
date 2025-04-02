import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Testimonials } from "@/components/testimonial";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <Container className="pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-blue-500">Mock Ready</span>{' '}
              <span className="text-white">Improve Your</span>
              <br />
              <span className="text-blue-400">Interview Preparation</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
              Elevate your interview skills with AI-driven insights. Prepare smarter, practice effectively, and stand out from the crowd.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link to="/generate">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg
                 shadow-blue-500/30 transform transition-all hover:scale-105">
                  Get Started
                  <Sparkles className="ml-2 h-5 w-5 text-yellow-300" />
                </Button>
              </Link>
              <Link to="/resumebuilder">
                <Button className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-6 text-lg rounded-xl border border-gray-600 hover:border-blue-500 shadow-lg transform transition-all hover:scale-105">
                  Build Resume
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-pink-600 rounded-2xl blur-2xl opacity-20"></div>
            <img
              src="/assets/img/office.jpeg"
              alt="AI Interview Preparation"
              className="relative rounded-2xl shadow-2xl w-full max-h-[600px] object-cover"
            />
          </div>
        </div>
      </Container>

      {/* Features Section */}
      <Container className="py-20 space-y-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Join thousands of candidates who have transformed their interview skills with Mock Ready.
          </p>
          <Link to="/generate">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-blue-500/30 transform transition-all hover:scale-105">
              Start Practicing Now
              <Sparkles className="ml-2 h-5 w-5 text-yellow-300" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 shadow-xl">
            <div className="text-blue-500 text-3xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-white mb-3">AI-Powered Practice</h3>
            <p className="text-gray-300">
              Get personalized feedback and improve with every practice session.
            </p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 shadow-xl">
            <div className="text-blue-500 text-3xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-white mb-3">Professional Resume</h3>
            <p className="text-gray-300">
              Create stunning resumes that catch recruiters' attention.
            </p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 shadow-xl">
            <div className="text-blue-500 text-3xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold text-white mb-3">Career Growth</h3>
            <p className="text-gray-300">
              Take your career to the next level with our comprehensive tools.
            </p>
          </div>
        </div>
      </Container>

      {/* Testimonials */}
      <Container className="py-20">
        <Testimonials />
      </Container>
    </div>
  );
};

export default HomePage;
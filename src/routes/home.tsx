import { Sparkles } from "lucide-react";
import Marquee from "react-fast-marquee";
import { Container } from "../components/container";
import { Button } from "../components/ui/button";
import { MarqueImg } from "../components/marquee-img";
import { Link } from "react-router-dom";
import Testimonials from "../components/testimonial";

const HomePage = () => {
  return (
    <div className="flex flex-col w-full pb-24">
      {/* Hero Section */}
      <Container className="px-6 md:px-12 text-center md:text-left">
        <div className="my-8">
          <h2 className="text-3xl md:text-6xl font-extrabold leading-tight">
            <span className="text-blue-600 md:text-8xl">Mock Ready</span>
            <span className="text-gray-600"> - Improve Your</span>
            <br />
            <span className="text-black">Interview Preparation</span>
          </h2>

          <div className="p-6 bg-white rounded-xl shadow-lg mt-6 hover:shadow-xl transition-all">
            <p className="text-lg text-gray-900 font-semibold leading-relaxed">
              Elevate your interview skills with
              <span className="text-blue-600"> AI-driven insights.</span> Prepare smarter, practice effectively, and stand out from the crowd.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-6 md:gap-12 py-8">
          <p className="text-3xl font-semibold text-gray-900 text-center">
            250k+
            <span className="block text-xl text-gray-500 font-normal">Offers Received</span>
          </p>
          <p className="text-3xl font-semibold text-gray-900 text-center">
            1.2M+
            <span className="block text-xl text-gray-500 font-normal">Interviews Aced</span>
          </p>
        </div>

        {/* Hero Image Section */}
        <div className="w-full mt-4 rounded-xl bg-gray-100 h-72 md:h-[500px] overflow-hidden relative shadow-md">
          <img
            src="/assets/img/hero.jpg"
            alt="Interview Preparation"
            className="w-full h-full object-cover"
          />

          <div className="absolute top-4 left-4 px-4 py-2 bg-white/60 backdrop-blur-md rounded-md text-gray-900">
            Mock Ready&copy;
          </div>

          <div className="hidden md:block absolute w-72 bottom-4 right-4 p-4 bg-white/70 backdrop-blur-md rounded-md shadow">
            <h2 className="text-neutral-800 font-semibold">Developer</h2>
            <p className="text-sm text-neutral-600">
              Harness the power of AI to get personalized feedback and improve your coding interview skills.
            </p>
            <Link to="/generate" className="block mt-3">
              <Button className="w-full">
                Generate <Sparkles className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>

      {/* Marquee Section */}
      <div className="w-full my-12 px-4">
        <Marquee pauseOnHover>
          <MarqueImg img="/assets/img/logo/firebase.png" />
          <MarqueImg img="/assets/img/logo/meet.png" />
          <MarqueImg img="/assets/img/logo/zoom.png" />
          <MarqueImg img="/assets/img/logo/microsoft.png" />
          <MarqueImg img="/assets/img/logo/tailwindcss.png" />
        </Marquee>
      </div>

      {/* Features Section */}
      <Container className="py-8 space-y-8">
        <h2 className="text-xl text-gray-800 font-semibold text-center md:text-left">
          Unlock Your Potential with AI-Driven Interview Mastery
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="col-span-1 md:col-span-3">
            <img
              src="/assets/img/office.jpeg"
              alt="AI Interview Preparation"
              className="w-full max-h-80 rounded-md object-cover"
            />
          </div>
          <div className="col-span-1 md:col-span-2 flex flex-col justify-center text-center md:text-left">
            <p className="text-gray-600">
              Transform your interview preparation with personalized AI insights. Gain confidence and skills to ace your next interview.
            </p>
            <Link to="/generate" className="mt-4">
              <Button className="w-full md:w-auto">
                Generate <Sparkles className="ml-2 text-yellow-400" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>

      {/* Call to Action Section */}
      <Container className="py-12">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Ace Your Next Interview?</h2>
          <p className="mb-6">
            Join thousands of candidates who have transformed their interview skills with Mock Ready.
          </p>
          <Link to="/generate">
            <Button className="bg-white text-blue-600 hover:bg-gray-200">
              Get Started <Sparkles className="ml-2 text-yellow-400" />
            </Button>
          </Link>
        </div>
      </Container>

      <Testimonials />
    </div>
  );
};

export default HomePage;
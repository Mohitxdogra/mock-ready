import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
  rating: number;
}

const initialTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Software Engineer",
    company: "Google",
    content:
      "Mock Ready helped me prepare for my technical interviews effectively. The AI-powered feedback was incredibly valuable!",
    image: "",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Manager",
    company: "Microsoft",
    content:
      "The resume builder tool is fantastic! It helped me create a professional resume that landed me multiple interviews.",
    image: "",
    rating: 4,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Data Scientist",
    company: "Amazon",
    content:
      "The practice interviews were so realistic. I felt much more confident during my actual interviews thanks to Mock Ready.",
    image: "",
    rating: 3,
  },
];

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const updatedTestimonials = initialTestimonials.map((testimonial, index) => ({
      ...testimonial,
      image: `https://randomuser.me/api/portraits/${index % 2 === 0 ? "men" : "women"}/${index * 10 + 5}.jpg`,
    }));
    setTestimonials(updatedTestimonials);
  }, []);

  return (
    <div className="relative py-16 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 text-cyan-400">
          What Our Users Say
        </h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Join thousands of successful professionals who have transformed their careers with Mock Ready.
        </p>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-12">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            className={`bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-lg transition-transform duration-300 hover:scale-105 ${
              index === activeTestimonial ? "ring-2 ring-cyan-500" : ""
            }`}
            onMouseEnter={() => setActiveTestimonial(index)}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500"
              />
              <div>
                <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
                <p className="text-sm text-gray-400">
                  {testimonial.role} at {testimonial.company}
                </p>
              </div>
            </div>
            <p className="text-gray-300 italic">"{testimonial.content}"</p>
            <div className="flex mt-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={
                    i < testimonial.rating
                      ? "text-yellow-400"
                      : "text-gray-600"
                  }
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Aman Sharma",
    role: "Software Engineer at Google",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    feedback:
      "Mock Ready transformed my interview preparation. The AI-driven insights were a game-changer!",
    rating: 5,
  },
  {
    name: "Priya Verma",
    role: "Frontend Developer at Microsoft",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    feedback:
      "The resume builder helped me craft a standout CV, and I landed my dream job effortlessly!",
    rating: 3,
  },
  {
    name: "Rahul Mehta",
    role: "Data Analyst at Amazon",
    image: "https://randomuser.me/api/portraits/men/28.jpg",
    feedback:
      "The mock interviews felt incredibly real, and the personalized feedback was invaluable.",
    rating: 4,
  },
];

export default function Testimonials() {
  return (
    <div className="py-16 bg-gray-100 dark:bg-gray-900">
      <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">
        What Professionals Say About{" "}
        <span className="text-blue-600">Mock Ready</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-12">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card className="p-6 shadow-lg rounded-2xl bg-white dark:bg-gray-800 border-2 border-cyan-500">
              <CardContent className="flex flex-col items-center text-center">
                <Avatar className="w-20 h-20 mb-4 border-2 border-cyan-500">
                  <AvatarImage src={testimonial.image} alt={testimonial.name} />
                </Avatar>
                <p className="text-gray-700 dark:text-gray-300 italic">
                  "{testimonial.feedback}"
                </p>
                <div className="flex mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={
                        i < testimonial.rating
                          ? "text-green-500"
                          : "text-gray-300 dark:text-gray-600"
                      }
                    />
                  ))}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                  {testimonial.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {testimonial.role}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

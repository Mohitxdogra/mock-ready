import { useState } from "react";
import { toast } from "react-hot-toast";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase.config";
import { motion } from "framer-motion";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [buttonSuccess, setButtonSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setButtonSuccess(false);

    try {
      await addDoc(collection(db, "messages"), {
        ...formData,
        createdAt: new Date().toISOString(),
        status: "unread"
      });

      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setShowSuccessMessage(true);
      setButtonSuccess(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
        setButtonSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {showSuccessMessage && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="mb-6 p-4 text-green-500 bg-green-900/20 border border-green-500 rounded-lg text-center"
          >
            Thank you for reaching out! We will get back to you soon.
          </motion.div>
        )}

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-700 shadow-xl transform transition-all hover:scale-105">
            <div className="text-blue-500 text-3xl mb-4">📍</div>
            <h3 className="text-xl font-semibold text-white mb-2">Visit Us</h3>
            <p className="text-gray-300">GNDU Amritsar<br />India</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-700 shadow-xl transform transition-all hover:scale-105">
            <div className="text-blue-500 text-3xl mb-4">📧</div>
            <h3 className="text-xl font-semibold text-white mb-2">Email Us</h3>
            <p className="text-gray-300">Mohitdogra132@gmail.com</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-700 shadow-xl transform transition-all hover:scale-105">
            <div className="text-blue-500 text-3xl mb-4">📱</div>
            <h3 className="text-xl font-semibold text-white mb-2">Call Us</h3>
            <p className="text-gray-300">+91 987654321</p>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 shadow-xl border border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required disabled={isSubmitting} className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all disabled:opacity-50" placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required disabled={isSubmitting} className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all disabled:opacity-50" placeholder="your.email@example.com" />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
              <input type="text" name="subject" value={formData.subject} onChange={handleChange} required disabled={isSubmitting} className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all disabled:opacity-50" placeholder="What is this about?" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
              <textarea name="message" rows={6} value={formData.message} onChange={handleChange} required disabled={isSubmitting} className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all resize-none disabled:opacity-50" placeholder="Your message here..." />
            </div>
            <div>
              <motion.button whileTap={{ scale: 0.9 }} type="submit" disabled={isSubmitting} className={`w-full md:w-auto px-8 py-4 rounded-lg transform transition-all hover:scale-105 disabled:opacity-50 ${buttonSuccess ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}>{isSubmitting ? "Sending..." : "Send Message"}</motion.button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
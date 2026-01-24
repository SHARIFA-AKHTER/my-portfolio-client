/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("✅ Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error("❌ Failed to send message.");
      }
    } catch (error) {
      toast.error("⚠️ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen py-20 px-6 md:px-12 lg:px-20 bg-background overflow-hidden flex items-center">
      
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/5 blur-[120px] rounded-full -z-10"></div>

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left: Contact Information */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Let’s <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500">Connect</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
              I specialize in Next.js, Prisma, and MongoDB. Whether you have a project in mind or just want to say hi, my inbox is always open!
            </p>
          </div>

          <div className="space-y-6">
            {[
              { icon: <FaPhone />, text: "+8801315904044", label: "Call me" },
              { icon: <FaEnvelope />, text: "sr0589071@gmail.com", label: "Email me" },
              { icon: <FaMapMarkerAlt />, text: "Dhaka, Bangladesh", label: "Location" }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4 group">
                <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-teal-500/10 text-teal-500 group-hover:bg-teal-500 group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">{item.label}</p>
                  <p className="text-foreground font-medium">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Contact Form Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-blue-500 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          
          <form
            onSubmit={handleSubmit}
            className="relative bg-card border border-primary/10 p-8 sm:p-10 rounded-[2rem] shadow-2xl space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold px-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-secondary/50 border border-primary/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold px-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-secondary/50 border border-primary/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold px-1">Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Project Collaboration"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-secondary/50 border border-primary/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold px-1">Your Message</label>
              <textarea
                name="message"
                placeholder="Tell me about your project..."
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-secondary/50 border border-primary/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none transition-all resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-teal-700 transition-all active:scale-[0.98] disabled:opacity-50 shadow-lg shadow-teal-500/20"
            >
              {loading ? (
                <span className="animate-pulse">Processing...</span>
              ) : (
                <>
                  <FaPaperPlane className="text-sm" /> Send Message
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
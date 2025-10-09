/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess("✅ Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSuccess("❌ Failed to send message.");
      }
    } catch (error) {
      setSuccess("⚠️ Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 px-6 md:px-12 lg:px-20 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 shadow-lg rounded-2xl overflow-hidden bg-white">
        {/* Left: Contact Information */}
        <div className="bg-teal-600 text-white p-8 flex flex-col justify-center space-y-6">
          <h2 className="text-3xl font-bold">I’m a Full Stack Developer</h2>
          <p className="text-teal-100">
            Specialized in Next.js, Prisma, Express, Redux, React, TypeScript &
            MongoDB. Feel free to reach out for collaboration or any queries!
          </p>
          <div className="space-y-4">
            <p className="flex items-center gap-3">
              <FaPhone /> +8801315904044
            </p>
            <p className="flex items-center gap-3">
              <FaEnvelope /> sr0589071@gmail.com
            </p>
            <p className="flex items-center gap-3">
              <FaMapMarkerAlt /> Dhaka, Bangladesh
            </p>
          </div>
        </div>

        {/* Right: Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="p-8 flex flex-col justify-center space-y-6"
        >
          <h2 className="text-3xl font-bold text-gray-800">
            {" "}
            Let’s connect and collaborate!
          </h2>
          <p className="text-gray-600">
            I help businesses and startups build modern, scalable web
            applications. Let’s discuss how I can support your next project.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
              required
            />
          </div>

          <input
            type="text"
            name="subject"
            placeholder="Your Subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
            required
          />

          <textarea
            name="message"
            placeholder="Write your message..."
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 outline-none"
            required
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="bg-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-teal-700 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {success && <p className="text-center text-sm">{success}</p>}
        </form>
      </div>
    </section>
  );
}

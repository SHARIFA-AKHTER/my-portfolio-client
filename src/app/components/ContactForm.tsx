"use client";
import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Message sent successfully 🚀");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" text-white shadow-2xl rounded-3xl p-6 md:p-10 max-w-lg w-full mx-auto space-y-6"
    >
      <h2 className="text-3xl font-bold text-center mb-4">
        Send a Message
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full p-4 rounded-xl bg-white/20 placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
      />

      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full p-4 rounded-xl bg-white/20 placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
      />

      <textarea
        name="message"
        placeholder="Your Message"
        value={formData.message}
        onChange={handleChange}
        required
        rows={5}
        className="w-full p-4 rounded-xl bg-white/20 placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
      ></textarea>

      <button
        type="submit"
        className="w-full md:w-auto bg-yellow-400 text-gray-900 font-semibold px-6 py-3 rounded-xl hover:bg-yellow-300 hover:scale-105 transition transform duration-300 block mx-auto"
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;



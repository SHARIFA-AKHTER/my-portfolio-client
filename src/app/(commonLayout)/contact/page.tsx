

import ContactForm from "@/app/components/ContactForm";

export default function ContactPage() {
  return (
    <section className="min-h-screen px-6 md:px-12 lg:px-20 py-16  text-white relative overflow-hidden">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12">
        Contact Me
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Contact Form */}
        <div>
          <ContactForm />
        </div>

        {/* Extra Content / Info */}
        <div className="space-y-6 text-center md:text-left">
          <h2 className="text-3xl font-semibold">
            Let’s Work Together!
          </h2>
          <p className="text-gray-200 leading-relaxed">
            I’d love to hear from you. Whether you have a question or just want
            to say hi, feel free to drop a message!
          </p>
          <p className="text-gray-200 text-lg">
            📧 <span className="font-semibold">sr0589071@gmail.com</span>
          </p>
          <p className="text-gray-200 text-lg">📍 Dhaka, Bangladesh</p>
        </div>
      </div>

      {/* Decorative background circles */}
      <div className="absolute -top-32 -left-32 w-72 h-72 bg-yellow-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
    </section>
  );
}



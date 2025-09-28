
import Image from "next/image";

export default function AboutPage() {
  return (
    <section className="relative py-16 px-6 md:px-12 lg:px-20  overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 relative z-10">
        {/* Left: Text */}
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-yellow-400">
            About Me
          </h2>
          <p className="text-lg text-gray-100 leading-relaxed">
            I am a passionate{" "}
            <span className="font-semibold text-white">
              Full-Stack Developer
            </span>{" "}
            with expertise in building modern, scalable, and secure web applications. 
            I enjoy working across the stack, from crafting beautiful frontends to 
            designing robust backends and APIs.
          </p>
          <p className="text-lg text-gray-100 leading-relaxed">
            I specialize in{" "}
            <span className="font-semibold text-white">MERN stack, Next.js, and TypeScript</span>, 
            constantly learning new technologies and improving my skills to deliver 
            high-quality projects.
          </p>
        </div>

        {/* Right: Profile Image */}
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-yellow-400 hover:scale-105 transition-transform duration-500">
            <Image
              src="/profile.jpg"
              alt="Profile Picture"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

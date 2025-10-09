"use client";

import Image from "next/image";
import { FaDownload, FaGithub } from "react-icons/fa";

const techStack = [
  "TypeScript",
  "React",
  "NextJS",
  "NodeJS",
  "ExpressJS",
  "Prisma",
  "MongoDB",
];

export default function AboutPage() {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-20 bg-gray-50 text-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Profile Image */}
        <div className="md:w-1/2 flex justify-center">
          <div
            className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-100 lg:h-100 
          rounded-full overflow-hidden shadow-2xl border-4 border-purple-800  hover:scale-105
          transform transition duration-300"
          >
            <Image
              src="/profile.jpg"
              alt="Profile Picture"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Content */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
          {/* Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-600">
            About Me
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            I am a passionate{" "}
            <span className="font-semibold text-gray-900">
              Full-Stack Developer
            </span>{" "}
            building modern, scalable, and secure web applications. I enjoy
            creating clean UI/UX and robust backends while constantly learning
            and improving. My work focuses on performance optimization, best
            coding practices, and delivering maintainable solutions. I thrive in
            collaborative environments, solving complex problems, mentoring
            juniors, and contributing to open-source projects.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full">
            <div className="bg-blue-50 rounded-xl p-5 shadow hover:shadow-lg transition text-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-blue-600">
                30+
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Projects Completed
              </p>
            </div>
            <div className="bg-green-50 rounded-xl p-5 shadow hover:shadow-lg transition text-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-green-600">
                2+
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Years of Experience
              </p>
            </div>
            <div className="bg-red-50 rounded-xl p-5 shadow hover:shadow-lg transition text-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-red-600">
                100+
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Happy Clients
              </p>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mt-4">
            {techStack.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
            <a
              href="/Sharifa_CV.pdf"
              download
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition text-sm sm:text-base"
            >
              <FaDownload /> Download CV
            </a>
            <a
              href="https://github.com/SHARIFA-AKHTER"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gray-800 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-gray-700 transition text-sm sm:text-base"
            >
              <FaGithub /> GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

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
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-100 lg:h-100 rounded-full overflow-hidden shadow-2xl border-4 border-blue-500 hover:scale-105 transform transition duration-300">
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
              href="/cv.pdf"
              download
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition text-sm sm:text-base"
            >
              <FaDownload /> Download CV
            </a>
            <a
              href="https://github.com/your-username"
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

// "use client";

// import Image from "next/image";
// import { FaDownload, FaGithub } from "react-icons/fa";

// const techStack = [
//   "TypeScript",
//   "React",
//   "NextJS",
//   "NodeJS",
//   "ExpressJS",
//   "Prisma",
//   "MongoDB",
// ];

// export default function AboutPage() {
//   return (
//     <div className="pt-10">
//       <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-20 bg-gray-50 text-gray-900 overflow-hidden">
//         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 relative z-10">
//           {/* Profile Image */}
//           <div className="md:w-1/2 flex justify-center">
//             <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-blue-500 hover:scale-105 transform transition">
//               <Image
//                 src="/profile.jpg"
//                 alt="Profile Picture"
//                 fill
//                 className="object-cover"
//                 priority
//               />
//             </div>
//           </div>

//           {/* Content */}
//           <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
//             {/* About Content */}
//             <div className="space-y-4">
//               <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-600">
//                 About Me
//               </h2>
//               <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
//                 I am a passionate{" "}
//                 <span className="font-semibold text-gray-900">
//                   Full-Stack Developer
//                 </span>{" "}
//                 building modern, scalable, and secure web applications. I enjoy
//                 creating clean UI/UX and robust backends while constantly
//                 learning and improving. My work focuses on optimizing
//                 performance, implementing best coding practices, and delivering
//                 maintainable solutions. I thrive in collaborative environments,
//                 actively contributing to team projects, solving complex
//                 problems, and staying updated with the latest technologies. I
//                 also take pride in mentoring junior developers and sharing
//                 knowledge through blogs, tutorials, and open-source projects.
//               </p>

//               {/* Stats */}
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full">
//                 <div className="bg-blue-50 rounded-xl p-5 shadow hover:shadow-lg transition text-center">
//                   <h3 className="text-2xl sm:text-3xl font-bold text-blue-600">
//                     30+
//                   </h3>
//                   <p className="text-gray-600 text-sm sm:text-base">
//                     Projects Completed
//                   </p>
//                 </div>
//                 <div className="bg-green-50 rounded-xl p-5 shadow hover:shadow-lg transition text-center">
//                   <h3 className="text-2xl sm:text-3xl font-bold text-green-600">
//                     2+
//                   </h3>
//                   <p className="text-gray-600 text-sm sm:text-base">
//                     Years of Experience
//                   </p>
//                 </div>
//                 <div className="bg-red-50 rounded-xl p-5 shadow hover:shadow-lg transition text-center">
//                   <h3 className="text-2xl sm:text-3xl font-bold text-red-600">
//                     100+
//                   </h3>
//                   <p className="text-gray-600 text-sm sm:text-base">
//                     Happy Clients
//                   </p>
//                 </div>
//               </div>
//               <div className="flex flex-wrap gap-2 mt-2">
//                 {techStack.map((tech, index) => (
//                   <span
//                     key={index}
//                     className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
//                   >
//                     {tech}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* Buttons */}
//             <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
//               <a
//                 href="/cv.pdf"
//                 download
//                 className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition text-sm sm:text-base"
//               >
//                 <FaDownload /> Download CV
//               </a>
//               <a
//                 href="https://github.com/your-username"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center gap-2 bg-gray-800 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-gray-700 transition text-sm sm:text-base"
//               >
//                 <FaGithub /> GitHub
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { FaDownload, FaGithub } from "react-icons/fa";

// export default function AboutPage() {
//   return (
//     <div className="pt-10">
//       <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-20 bg-gray-50 text-gray-900 overflow-hidden">
//         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 relative z-10">
//           {/* Profile Image */}
//           <div className="md:w-1/2 flex justify-center">
//             <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-blue-500">
//               <Image
//                 src="/profile.jpg"
//                 alt="Profile Picture"
//                 fill
//                 className="object-cover"
//                 priority
//               />
//             </div>
//           </div>

//           {/* Content */}
//           <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
//             {/* Tabs */}
//             <div className="flex justify-center md:justify-start gap-4 border-b pb-3 mb-6">
//               <Link
//                 href="/education"
//                 className="px-3 sm:px-4 py-2 text-sm sm:text-base font-semibold text-gray-600 hover:text-blue-600 transition"
//               >
//                 Education
//               </Link>
//               <Link
//                 href="/experience"
//                 className="px-3 sm:px-4 py-2 text-sm sm:text-base font-semibold text-gray-600 hover:text-blue-600 transition"
//               >
//                 Experience
//               </Link>
//               <Link
//                 href="/interests"
//                 className="px-3 sm:px-4 py-2 text-sm sm:text-base font-semibold text-gray-600 hover:text-blue-600 transition"
//               >
//                 Interests
//               </Link>
//             </div>

//             {/* Stats */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full">
//               <div className="bg-gray-100 rounded-xl p-5 shadow hover:shadow-lg transition text-center">
//                 <h3 className="text-2xl sm:text-3xl font-bold text-blue-600">
//                   30+
//                 </h3>
//                 <p className="text-gray-600 text-sm sm:text-base">
//                   Projects Completed
//                 </p>
//               </div>
//               <div className="bg-gray-100 rounded-xl p-5 shadow hover:shadow-lg transition text-center">
//                 <h3 className="text-2xl sm:text-3xl font-bold text-green-600">
//                   2+
//                 </h3>
//                 <p className="text-gray-600 text-sm sm:text-base">
//                   Years of Experience
//                 </p>
//               </div>
//               <div className="bg-gray-100 rounded-xl p-5 shadow hover:shadow-lg transition text-center">
//                 <h3 className="text-2xl sm:text-3xl font-bold text-red-600">
//                   100+
//                 </h3>
//                 <p className="text-gray-600 text-sm sm:text-base">
//                   Happy Clients
//                 </p>
//               </div>
//             </div>

//             {/* About Content */}
//             <div className="space-y-4">
//               <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-600">
//                 About Me
//               </h2>
//               <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
//                 I am a passionate{" "}
//                 <span className="font-semibold text-gray-900">
//                   Full-Stack Developer
//                 </span>{" "}
//                 with expertise in building modern, scalable, and secure web
//                 applications. I love creating clean UI/UX and robust backends
//                 while constantly learning and improving.
//               </p>
//             </div>

//             {/* Buttons */}
//             <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
//               <a
//                 href="/cv.pdf"
//                 download
//                 className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition text-sm sm:text-base"
//               >
//                 <FaDownload /> Download CV
//               </a>
//               <a
//                 href="https://github.com/your-username"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center gap-2 bg-gray-800 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-gray-700 transition text-sm sm:text-base"
//               >
//                 <FaGithub /> GitHub
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

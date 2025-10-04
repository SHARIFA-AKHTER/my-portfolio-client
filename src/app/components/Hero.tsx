// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import {
//   SiCss3,
//   SiHtml5,
//   SiJavascript,
//   SiMongodb,
//   SiNextdotjs,
//   SiNodedotjs,
//   SiReact,
//   SiTypescript,
// } from "react-icons/si";

// const subtitles = [
//   "a Full Stack Developer |",
//   "a MERN Stack Developer |",
//   "a Next JS Developer",
//   "a Front End Developer",
//   "a Web Developer |",
//   "a React JS Developer |",
//   "a TypeScript Developer",
//   "a Dedicated Learner |",
//   "a Technology Enthusiast |",
//   "a Backend Developer",
// ];

// const Hero = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [displayText, setDisplayText] = useState("");

//   useEffect(() => {
//     let i = 0;
//     const interval = window.setInterval(() => {
//       setDisplayText(subtitles[currentIndex].slice(0, i));
//       i++;
//       if (i > subtitles[currentIndex].length) {
//         clearInterval(interval);
//         setTimeout(() => {
//           setCurrentIndex((prev) => (prev + 1) % subtitles.length);
//         }, 1500);
//       }
//     }, 100);

//     return () => clearInterval(interval);
//   }, [currentIndex]);

//   return (
//     <section
//       className="min-h-screen flex flex-col md:flex-row items-center justify-center
//     px-6 md:px-12 lg:px-20 pt-20 relative bg-white text-gray-900 overflow-hidden"
//     >
//       {/* Decorative background circles */}
//       <div
//         className="absolute -top-20 -left-20 w-60 h-60 rounded-full
//       blur-3xl opacity-20  animate-pulse"
//       ></div>
//       <div
//         className="absolute -bottom-20 -right-20 w-72 h-72
//        rounded-full blur-3xl opacity-20  animate-pulse"
//       ></div>

//       {/* Left Content */}
//       <div className="md:w-1/2 space-y-6 text-center md:text-left relative z-10">
//         <h1 className="text-3xl sm:text-4xl lg:text-2xl font-extrabold leading-tight">
//           Hi, I’m{" "}
//           <span className="text-green-400 transition-colors duration-300">
//             Sharifa
//           </span>
//         </h1>

//         {/* Animated subtitle */}
//         <h2 className="text-lg sm:text-xl lg:text-2xl min-h-[32px] flex items-center gap-2 text-gray-700">
//           {displayText}
//           <span className="border-r-2 border-purple-800 animate-pulse ml-1"></span>
//           <span className="ml-1">
//             {currentIndex === 0 && (
//               <SiJavascript className="text-yellow-500 text-2xl" />
//             )}
//             {currentIndex === 1 && (
//               <SiMongodb className="text-green-600 text-2xl" />
//             )}
//             {currentIndex === 2 && (
//               <SiNextdotjs className="text-gray-900 text-2xl" />
//             )}
//             {currentIndex === 3 && (
//               <SiHtml5 className="text-orange-500 text-2xl" />
//             )}
//             {currentIndex === 4 && (
//               <SiCss3 className="text-blue-500 text-2xl" />
//             )}
//             {currentIndex === 5 && (
//               <SiReact className="text-blue-400 text-2xl" />
//             )}
//             {currentIndex === 6 && (
//               <SiTypescript className="text-blue-600 text-2xl" />
//             )}
//             {currentIndex === 7 && (
//               <SiJavascript className="text-yellow-500 text-2xl" />
//             )}
//             {currentIndex === 8 && (
//               <SiJavascript className="text-yellow-500 text-2xl" />
//             )}
//             {currentIndex === 9 && (
//               <SiNodedotjs className="text-green-600 text-2xl" />
//             )}
//           </span>
//         </h2>

//         <p className="text-gray-600 max-w-lg mx-auto md:mx-0">
//           I love building modern, scalable, and user-friendly web applications.
//           Explore my projects and skills below.
//         </p>

//         {/* CTA Buttons */}
//         <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
//           <Link
//             href="/projects"
//             className="bg-green-400 text-white px-6 py-3 rounded-lg shadow-md font-semibold hover:bg-purple-700 hover:scale-105 transition transform duration-300"
//           >
//             🚀 Get Started
//           </Link>
//         </div>
//       </div>

//       {/* Right Content (Profile Image) */}
//       <div className="md:w-1/2 flex justify-center mt-10 md:mt-0 relative z-10">
//         <div className="relative rounded-full overflow-hidden shadow-lg border-4 border-purple-800 w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 hover:scale-105 transition-transform duration-300 group">
//           <Image
//             src="/profile.jpg"
//             alt="Profile"
//             fill
//             className="object-cover group-hover:scale-110 transition-transform duration-500"
//             priority
//           />
//           <div className="absolute inset-0 rounded-full ring-4 ring-purple-800 animate-pulse"></div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  SiCss3,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTypescript,
} from "react-icons/si";

const subtitles = [
  "a Full Stack Developer |",
  "a MERN Stack Developer |",
  "a Next JS Developer |",
  "a Front End Developer |",
  "a Web Developer |",
  "a React JS Developer |",
  "a TypeScript Developer |",
  "a Dedicated Learner |",
  "a Technology Enthusiast |",
  "a Backend Developer",
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = window.setInterval(() => {
      setDisplayText(subtitles[currentIndex].slice(0, i));
      i++;
      if (i > subtitles[currentIndex].length) {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % subtitles.length);
        }, 1500);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-12 lg:px-20 pt-20 relative bg-gradient-to-b from-gray-50 via-white to-gray-100 text-gray-900 overflow-hidden">
      {/* Animated background circles */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-purple-200 blur-3xl opacity-30"
      ></motion.div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-green-200 blur-3xl opacity-30"
      ></motion.div>

      {/* Left Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="md:w-1/2 space-y-6 text-center md:text-left relative z-10"
      >
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
          Hi, I’m{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-green-500">
            Sharifa
          </span>
        </h1>

        {/* Animated subtitle */}
        <h2 className="text-lg sm:text-xl lg:text-2xl min-h-[32px] flex items-center gap-2 text-gray-700">
          {displayText}
          <span className="border-r-2 border-purple-800 animate-pulse ml-1"></span>
          <span className="ml-1">
            {currentIndex === 0 && (
              <SiJavascript className="text-yellow-500 text-2xl" />
            )}
            {currentIndex === 1 && (
              <SiMongodb className="text-green-600 text-2xl" />
            )}
            {currentIndex === 2 && (
              <SiNextdotjs className="text-gray-900 text-2xl" />
            )}
            {currentIndex === 3 && (
              <SiHtml5 className="text-orange-500 text-2xl" />
            )}
            {currentIndex === 4 && (
              <SiCss3 className="text-blue-500 text-2xl" />
            )}
            {currentIndex === 5 && (
              <SiReact className="text-blue-400 text-2xl" />
            )}
            {currentIndex === 6 && (
              <SiTypescript className="text-blue-600 text-2xl" />
            )}
            {currentIndex === 7 && (
              <SiJavascript className="text-yellow-500 text-2xl" />
            )}
            {currentIndex === 8 && (
              <SiJavascript className="text-yellow-500 text-2xl" />
            )}
            {currentIndex === 9 && (
              <SiNodedotjs className="text-green-600 text-2xl" />
            )}
          </span>
        </h2>

        <p className="text-gray-600 max-w-lg mx-auto md:mx-0 text-base sm:text-lg">
          I build modern, scalable, and user-friendly web applications with a
          passion for clean code and great UX.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <Link
            href="/projects"
            className="bg-gradient-to-r from-green-400 to-purple-600 text-white px-6 py-3 rounded-lg shadow-md font-semibold hover:scale-105 transition transform duration-300"
          >
            🚀 Get Started
          </Link>
          <Link
            href="/contact"
            className="border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-600 hover:text-white transition duration-300"
          >
            📩 Contact Me
          </Link>
        </div>
      </motion.div>

      {/* Right Content (Profile Image) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="md:w-1/2 flex justify-center mt-10 md:mt-0 relative z-10"
      >
        <div className="relative rounded-full overflow-hidden shadow-lg border-4 border-purple-800 w-64 h-64 sm:w-64 sm:h-64 lg:w-100 lg:h-100 group">
          <Image
            src="/profile.jpg"
            alt="Profile"
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            priority
          />
          <div className="absolute inset-0 rounded-full ring-4 ring-purple-600 animate-pulse"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

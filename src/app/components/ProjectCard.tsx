// import { Projects } from "@/types/project";
// import Image from "next/image";
// import Link from "next/link";

// const gradients = [
//   "from-purple-600 via-purple-700 to-purple-800",
//   "from-indigo-600 via-indigo-700 to-indigo-800",
//   "from-pink-600 via-pink-700 to-pink-800",
//   "from-blue-600 via-blue-700 to-blue-800",
//   "from-green-600 via-green-700 to-green-800",
//   "from-teal-600 via-teal-700 to-teal-800",
// ];

// const ProjectCard = ({ project, index }: { project: Projects; index: number }) => {
//   const gradientClass = gradients[index % gradients.length];

//   return (
//     <div className={`bg-gradient-to-br ${gradientClass} text-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-transform duration-300`}>
//       {/* Image */}
//       <div className="relative w-full h-56 sm:h-64 md:h-48 lg:h-56">
//         <Image
//           src={project.image}
//           alt={project.title}
//           fill
//           className="object-cover"
//           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//         />
//       </div>

//       {/* Content */}
//       <div className="p-5 space-y-3">
//         <h3 className="text-xl font-bold">{project.title}</h3>
//         <p className="text-gray-200 text-sm">{project.description}</p>

//         {/* Tech stack */}
//         <div className="flex flex-wrap gap-2 mt-2">
//           {project.techStack.map((tech, i) => (
//             <span
//               key={i}
//               className="bg-white/20 text-white text-xs px-2 py-1 rounded-md"
//             >
//               {tech}
//             </span>
//           ))}
//         </div>

//         {/* Link */}
//         <Link
//           href={project.link}
//           target="_blank"
//           className="inline-block mt-3 bg-gray-900 text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-800 hover:scale-105 transition transform duration-300"
//         >
//           View Project
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default ProjectCard;

import React from 'react';

const ProjectCard = () => {
  return (
    <div>
      <h1>project card</h1>
    </div>
  );
};

export default ProjectCard;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
// /* eslint-disable @next/next/no-img-element */

// /* eslint-disable @typescript-eslint/no-explicit-any */

// type ProjectCardProps = { project: any };
// export default function ProjectCard({ project }: ProjectCardProps) {
//   return (
//     <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
//       {/* Image/Thumbnail */}
//       <div className="h-40 w-full relative">
//         {project.image ? (
//           <img
//             src={project.image}
//             alt={project.title}
//             className="h-full w-full object-cover"
//           />
//         ) : (
//           <div className="h-full w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold">
//             {project.title?.slice(0, 1) || "P"}
//           </div>
//         )}
//       </div>

//       <div className="p-6">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-3">
//           {project.title}
//         </h2>
//         <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>

//         {project.techStack && (
//           <p className="text-sm text-gray-500 mb-3">
//             <span className="font-medium text-gray-700">Tech:</span>{" "}
//             {project.techStack}
//           </p>
//         )}

//         <div className="flex flex-wrap gap-2 mt-4">
//           {project.liveUrl && (
//             <a
//               href={project.liveUrl}
//               target="_blank"
//               className="px-4 py-2 text-sm rounded-full bg-gradient-to-r from-green-400 to-green-600 text-white font-medium shadow hover:opacity-90"
//             >
//               Live Demo
//             </a>
//           )}
//           {project.repoUrl && (
//             <a
//               href={project.repoUrl}
//               target="_blank"
//               className="px-4 py-2 text-sm rounded-full bg-gray-800 text-white font-medium shadow hover:bg-black"
//             >
//               Repo
//             </a>
//           )}
//           {project.frontendRepo && (
//             <a
//               href={project.frontendRepo}
//               target="_blank"
//               className="px-4 py-2 text-sm rounded-full bg-blue-500 text-white font-medium shadow hover:bg-blue-600"
//             >
//               Frontend
//             </a>
//           )}
//           {project.backendRepo && (
//             <a
//               href={project.backendRepo}
//               target="_blank"
//               className="px-4 py-2 text-sm rounded-full bg-purple-500 text-white font-medium shadow hover:bg-purple-600"
//             >
//               Backend
//             </a>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";

type ProjectCardProps = {
  project: any;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  // Ensure techStack is always array
  const techStack = Array.isArray(project.techStack) ? project.techStack : [];

  // Fallback images for projects
  const fallbackImages: { [slug: string]: string } = {
    "ecommerce-project": "/Ecommerce pic.png",
    "volunteer-management-system": "/Volunteer-management.png",
    ManageMate: "/ManageMate.png",
    "digital-wallet-system": "/digital-wallet-pic.png",
  };

  // Choose first project image or fallback
  const projectImage =
    project.images && project.images.length > 0
      ? project.images[0]
      : fallbackImages[project.slug] || "/default.png";

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col">
      {/* Thumbnail */}
      <div className="relative w-full h-48 bg-gray-100">
        <Image
          src={projectImage}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
        <p className="text-gray-600 mb-3 line-clamp-3">{project.description}</p>

        {/* Tech Stack */}
        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {techStack.map((tech: string, idx: number) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 border"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Buttons */}
        <div className="mt-auto flex flex-wrap gap-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-green-500 text-white text-sm rounded-md hover:bg-green-600"
            >
              Live Demo
            </a>
          )}
          {project.frontendRepo && (
            <a
              href={project.frontendRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
            >
              Frontend
            </a>
          )}
          {project.backendRepo && (
            <a
              href={project.backendRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-purple-500 text-white text-sm rounded-md hover:bg-purple-600"
            >
              Backend
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

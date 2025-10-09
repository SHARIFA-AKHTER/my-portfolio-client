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
    "ecommerce-project": "/images/Ecommerce pic.png",
    "volunteer-management-system": "/images/Volunteer-management.png",
    ManageMate: "/images/ManageMate.png",
    "Digital-Wallet-System": "/images/Digital-wallet.png",
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

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @typescript-eslint/no-explicit-any */

type ProjectCardProps = { project: any };
export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
      {/* Image/Thumbnail */}
      <div className="h-40 w-full relative">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold">
            {project.title?.slice(0, 1) || "P"}
          </div>
        )}
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          {project.title}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>

        {project.techStack && (
          <p className="text-sm text-gray-500 mb-3">
            <span className="font-medium text-gray-700">Tech:</span>{" "}
            {project.techStack}
          </p>
        )}

        <div className="flex flex-wrap gap-2 mt-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              className="px-4 py-2 text-sm rounded-full bg-gradient-to-r from-green-400 to-green-600 text-white font-medium shadow hover:opacity-90"
            >
              Live Demo
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              className="px-4 py-2 text-sm rounded-full bg-gray-800 text-white font-medium shadow hover:bg-black"
            >
              Repo
            </a>
          )}
          {project.frontendRepo && (
            <a
              href={project.frontendRepo}
              target="_blank"
              className="px-4 py-2 text-sm rounded-full bg-blue-500 text-white font-medium shadow hover:bg-blue-600"
            >
              Frontend
            </a>
          )}
          {project.backendRepo && (
            <a
              href={project.backendRepo}
              target="_blank"
              className="px-4 py-2 text-sm rounded-full bg-purple-500 text-white font-medium shadow hover:bg-purple-600"
            >
              Backend
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

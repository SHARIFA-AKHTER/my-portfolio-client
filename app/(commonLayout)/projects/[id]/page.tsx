import { ExternalLink } from "lucide-react";
import { getProjectById } from "../../../../actions/projects";

export default async function ProjectDetail({
  params,
}: {
  params: { id: string };
}) {
  const project = await getProjectById(Number(params.id));

  if (!project) return <p className="text-center">Project not found</p>;

  return (
    <section className="container mx-auto px-4 py-10">
      {/* Title */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
          {project.title}
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">{project.description}</p>
      </div>

      {/* Card */}
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-4xl mx-auto">
        {/* Tech Stack */}
        {project.techStack && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Tech Stack:
            </h3>
            <p className="text-gray-600">{project.techStack}</p>
          </div>
        )}

        {/* Features */}
        {project.features?.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Key Features:
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {project.features.map((feature: string, idx: number) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Links */}
        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              className="flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
            >
              <ExternalLink size={18} /> Live Demo
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-xl hover:bg-black transition"
            >
              <ExternalLink size={18} /> GitHub Repo
            </a>
          )}
          {project.frontendRepo && (
            <a
              href={project.frontendRepo}
              target="_blank"
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
            >
              <ExternalLink size={18} /> Frontend Repo
            </a>
          )}
          {project.backendRepo && (
            <a
              href={project.backendRepo}
              target="_blank"
              className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition"
            >
              <ExternalLink size={18} /> Backend Repo
            </a>
          )}
        </div>

        {/* Author Info */}
        <div className="mt-8 border-t pt-4 text-sm text-gray-500">
          <p>
            <span className="font-medium">Author:</span>{" "}
            {project.author?.name ?? "Unknown"}
          </p>
          <p>
            <span className="font-medium">Created At:</span>{" "}
            {new Date(project.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </section>
  );
}

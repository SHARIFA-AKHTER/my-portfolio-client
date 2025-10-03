/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllProjects } from "@/actions/projects";

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <section className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">My Projects</h1>
      {projects.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project: any) => (
            <div
              key={project.id}
              className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
              <p className="text-gray-600 mb-4">{project.description}</p>

              {project.techStack && (
                <p className="text-sm text-gray-500 mb-2">
                  <span className="font-medium">Tech:</span> {project.techStack}
                </p>
              )}

              <div className="flex flex-wrap gap-3 mt-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    className="px-3 py-1 bg-green-500 text-white text-sm rounded-md hover:bg-green-600"
                  >
                    Live Demo
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    className="px-3 py-1 bg-gray-800 text-white text-sm rounded-md hover:bg-black"
                  >
                    Repo
                  </a>
                )}
                {project.frontendRepo && (
                  <a
                    href={project.frontendRepo}
                    target="_blank"
                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
                  >
                    Frontend
                  </a>
                )}
                {project.backendRepo && (
                  <a
                    href={project.backendRepo}
                    target="_blank"
                    className="px-3 py-1 bg-purple-500 text-white text-sm rounded-md hover:bg-purple-600"
                  >
                    Backend
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No projects found.</p>
      )}
    </section>
  );
}

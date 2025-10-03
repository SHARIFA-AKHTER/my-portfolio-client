/* eslint-disable @typescript-eslint/no-explicit-any */

// import { getAllProjects } from "@/actions/projects";
// import ProjectCard from "@/app/components/ProjectCard";

// export default async function ProjectsPage() {
//   const projects = await getAllProjects();

//   return (
//     <section className="container mx-auto px-4 py-10">
//       <h1 className="text-3xl font-bold text-center mb-8">My Projects</h1>
//       {projects.length > 0 ? (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {projects.map((project: any) => (
//             <ProjectCard key={project.id} project={project} />
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-gray-500">No projects found.</p>
//       )}
//     </section>
//   );
// }

import { getAllProjects } from "@/actions/projects";
import ProjectCard from "@/app/components/ProjectCard";

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">🚀 My Projects</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A showcase of my recent works — built with modern technologies and
          clean UI/UX. Explore the live demos or check the source code!
        </p>
      </div>

      {projects.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project: any) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No projects found.</p>
      )}
    </section>
  );
}

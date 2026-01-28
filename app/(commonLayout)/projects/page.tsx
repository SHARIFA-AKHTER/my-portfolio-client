/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = "force-dynamic";


import ProjectCard from "@/app/components/ProjectCard";
import { getAllProjects } from "@/lib/project";

import * as motion from "framer-motion/client";

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <section className="relative min-h-screen py-20 px-6 sm:px-12 lg:px-20 bg-background text-foreground transition-colors duration-500 overflow-hidden">
      
      <div className="absolute top-0 left-1/4 w-100 h-100 bg-primary/5 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/5 blur-[120px] rounded-full -z-10"></div>

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight"
          >
            🚀 My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-green-500">Projects</span>
          </motion.h1>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1.5 bg-primary rounded-full mx-auto"
          />

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed"
          >
            A showcase of my recent works — built with modern technologies and
            clean UI/UX. Explore the live demos or check the source code!
          </motion.p>
        </div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project: any, index: number) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-muted rounded-3xl"
          >
            <p className="text-xl text-muted-foreground font-medium">No projects found.</p>
            <p className="text-sm text-muted-foreground/60">Check back later or explore my GitHub!</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
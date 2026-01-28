/* eslint-disable @next/next/no-html-link-for-pages */
import { ExternalLink, Github, Code2, Server, Globe } from "lucide-react";

import * as motion from "framer-motion/client";
import { getProjectById } from "@/lib/project";

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(Number(id));

  if (!project)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-xl text-muted-foreground font-medium animate-pulse">
          Project not found 😢
        </p>
      </div>
    );

  const techStackItems = typeof project.techStack === "string" 
    ? project.techStack.split(",") 
    : Array.isArray(project.techStack) 
    ? project.techStack 
    : [];

  return (
    <section className="relative min-h-screen py-20 px-6 sm:px-12 lg:px-20 bg-background text-foreground overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-125 h-125 bg-primary/5 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-0 right-0 w-125 h-125 bg-accent/5 blur-[120px] rounded-full -z-10"></div>

      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            {project.title}
          </h1>
          <div className="h-1.5 w-24 bg-linear-to-r from-purple-500 to-green-500 rounded-full mx-auto"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            {project.description}
          </p>
        </motion.div>

        {/* Content Details Card */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-primary/10 shadow-2xl rounded-3xl p-8 md:p-12 backdrop-blur-md"
        >
          <div className="grid md:grid-cols-2 gap-10">
            
            {/* Left Column: Info */}
            <div className="space-y-8">
              {techStackItems.length > 0 && (
                <div className="group">
                  <h3 className="flex items-center gap-2 text-xl font-bold mb-3 text-foreground/90">
                    <Code2 className="text-primary" size={24} /> Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {techStackItems.map((tech: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-secondary rounded-full text-xs font-semibold border border-primary/5 transition-all hover:bg-primary hover:text-primary-foreground">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {project.features?.length > 0 && (
                <div>
                  <h3 className="flex items-center gap-2 text-xl font-bold mb-3 text-foreground/90">
                    <ExternalLink className="text-primary" size={24} /> Key Features
                  </h3>
                  <ul className="space-y-3">
                    {project.features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 text-muted-foreground text-base leading-relaxed">
                        <span className="mt-2 h-2 w-2 rounded-full bg-green-500 shrink-0 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right Column: Links & Meta */}
            <div className="space-y-6 bg-secondary/30 p-8 rounded-3xl border border-primary/5 shadow-inner">
              <h3 className="text-lg font-bold tracking-tight">Project Access</h3>
              <div className="flex flex-col gap-4">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" className="flex items-center justify-between p-4 bg-green-500/10 text-green-500 rounded-2xl hover:bg-green-500 hover:text-white transition-all duration-300 group font-bold">
                    <span className="flex items-center gap-3"><Globe size={22} /> Live Demo</span>
                    <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                )}
                {project.repoUrl && (
                  <a href={project.repoUrl} target="_blank" className="flex items-center justify-between p-4 bg-foreground text-background rounded-2xl hover:opacity-90 transition-all font-bold">
                    <span className="flex items-center gap-3"><Github size={22} /> GitHub Repo</span>
                    <ExternalLink size={18} />
                  </a>
                )}
                <div className="grid grid-cols-2 gap-3">
                  {project.frontendRepo && (
                    <a href={project.frontendRepo} target="_blank" className="flex items-center justify-center gap-2 p-3 bg-blue-500/10 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all font-bold text-sm">
                      <Code2 size={16} /> Frontend
                    </a>
                  )}
                  {project.backendRepo && (
                    <a href={project.backendRepo} target="_blank" className="flex items-center justify-center gap-2 p-3 bg-purple-500/10 text-purple-500 rounded-xl hover:bg-purple-500 hover:text-white transition-all font-bold text-sm">
                      <Server size={16} /> Backend
                    </a>
                  )}
                </div>
              </div>

              {/* Meta data */}
              <div className="pt-6 border-t border-primary/10 text-xs text-muted-foreground space-y-3">
                <div className="flex justify-between items-center">
                  <span className="opacity-60 uppercase tracking-widest font-bold">Developer</span>
                  <span className="text-foreground font-bold">{project.author?.name ?? "Sharifa"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-60 uppercase tracking-widest font-bold">Completed</span>
                  <span className="text-foreground font-bold">
                  
                    <span suppressHydrationWarning>
                      {new Date(project.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Back Link */}
        <div className="text-center pt-6">
          <a href="/projects" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-all group font-bold">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to all projects
          </a>
        </div>
      </div>
    </section>
  );
}
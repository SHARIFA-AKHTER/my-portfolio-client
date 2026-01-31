/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @next/next/no-html-link-for-pages */
import { getAllProjects } from "@/lib/project";
import { Globe, Github, Code2, ExternalLink, Server } from "lucide-react";
import * as motion from "framer-motion/client";

export async function generateStaticParams() {
  const projects = await getAllProjects();
  const projectList = Array.isArray(projects) ? projects : [];

  return projectList.map((project: any) => ({
    id: String(project.id),
  }));
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) return <div className="p-20 text-center text-white">Project Not Found</div>;

  const result = await res.json();
  const project = result.data;

  if (!project) return <div className="p-20 text-center text-white">No project details found.</div>;


  const techStackItems = Array.isArray(project.techStack) ? project.techStack : [];

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
                <div>
                  <h3 className="flex items-center gap-2 text-xl font-bold mb-4">
                    <Code2 className="text-primary" size={24} /> Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {techStackItems.map((tech: string, i: number) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-secondary rounded-full text-xs font-semibold border border-primary/5 hover:bg-primary hover:text-primary-foreground transition-all"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {project.features?.length > 0 && (
                <div className="space-y-3">
                  <h3 className="flex items-center gap-2 text-xl font-bold">
                    <ExternalLink className="text-primary" size={24} /> Key Features
                  </h3>
                  <ul className="space-y-2">
                    {project.features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                        <span className="mt-2 h-2 w-2 rounded-full bg-green-500 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right Column: Links & Metadata */}
            <div className="space-y-6 bg-secondary/30 p-8 rounded-3xl border border-primary/5 shadow-inner">
              <h3 className="text-lg font-bold tracking-tight">Access & Links</h3>
              <div className="flex flex-col gap-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    className="flex items-center justify-between p-4 bg-green-500/10 text-green-500 rounded-2xl hover:bg-green-500 hover:text-white transition-all font-bold group"
                  >
                    <span className="flex items-center gap-3">
                      <Globe size={22} /> Live Demo
                    </span>
                    <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                )}
                
                <div className="grid grid-cols-2 gap-3">
                  {project.frontendRepo && (
                    <a
                      href={project.frontendRepo}
                      target="_blank"
                      className="flex items-center justify-center gap-2 p-3 bg-blue-500/10 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all font-bold text-sm"
                    >
                      <Github size={16} /> Frontend
                    </a>
                  )}
                  {project.backendRepo && (
                    <a
                      href={project.backendRepo}
                      target="_blank"
                      className="flex items-center justify-center gap-2 p-3 bg-purple-500/10 text-purple-500 rounded-xl hover:bg-purple-500 hover:text-white transition-all font-bold text-sm"
                    >
                      <Server size={16} /> Backend
                    </a>
                  )}
                </div>
              </div>

              {/* Developer Info */}
              <div className="pt-6 border-t border-primary/10 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="opacity-60 uppercase tracking-widest font-bold text-xs">Developer</span>
                  <span className="font-bold">{project.author?.name || "Sharifa"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60 uppercase tracking-widest font-bold text-xs">Date</span>
                  <span className="font-bold">
                    {project.createdAt ? new Date(project.createdAt).toLocaleDateString("en-US", { month: 'long', year: 'numeric' }) : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Back Button */}
        <div className="text-center pt-6">
          <a
            href="/projects"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-all font-bold"
          >
            <span>←</span> Back to all projects
          </a>
        </div>
      </div>
    </section>
  );
}
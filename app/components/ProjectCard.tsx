/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";

type ProjectCardProps = {
  project: any;
};

export default function ProjectCard({ project }: ProjectCardProps) {

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const techStack = Array.isArray(project.techStack) 
    ? project.techStack 
    : typeof project.techStack === 'string' 
    ? project.techStack.split(",") 
    : [];

  const fallbackImages: { [slug: string]: string } = {
    "ecommerce-project": "/images/Ecommerce pic.png",
    "volunteer-management-system": "/images/Volunteer-management.png",
    ManageMate: "/images/ManageMate.png",
    "Digital-Wallet-System": "/images/Digital-wallet.png",
    "Mom-Baby-Wear": "/images/Mom-Baby-Wear.png",
  };

  const projectImage =
    project.image && project.image.length > 0
      ? project.image[0]
      : fallbackImages[project.slug] || "/default.png";


  if (!mounted) {
    return <div className="h-100 w-full bg-secondary/20 animate-pulse rounded-3xl" />;
  }

  return (
    <motion.div
      whileHover={{ y: -10 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group relative bg-card text-card-foreground rounded-3xl border border-primary/10 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden flex flex-col h-full"
    >
      {/* Thumbnail Container */}
      <div className="relative w-full h-52 sm:h-60 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-end p-6">
           <Link 
           href={`/projects/${project.id.toString()}`}
            //  href={`/projects/${project.id}`} 
            
             className="bg-primary text-primary-foreground p-3 rounded-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-xl"
           >
             <ArrowRight size={24} />
           </Link>
        </div>
        
        <Image
          src={projectImage}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
           {techStack.slice(0, 2).map((tech: string, i: number) => (
             <span key={i} className="px-3 py-1 bg-background/60 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider rounded-lg border border-white/10 shadow-lg">
                {tech.trim()}
             </span>
           ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 sm:p-8 flex-1 flex flex-col space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
            {project.title}
          </h2>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto pt-4 flex flex-wrap gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground text-sm font-bold rounded-xl hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-primary/20"
            >
              <ExternalLink size={16} /> Live
            </a>
          )}
          
          <div className="flex gap-2 w-full sm:w-auto">
            {project.frontendRepo && (
              <a
                href={project.frontendRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none p-2.5 bg-secondary text-secondary-foreground rounded-xl hover:bg-foreground hover:text-background transition-colors border border-primary/5 shadow-sm"
              >
                <Github size={20} />
              </a>
            )}
            {project.backendRepo && (
              <a
                href={project.backendRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none p-2.5 bg-secondary text-secondary-foreground rounded-xl hover:bg-foreground hover:text-background transition-colors border border-primary/5 shadow-sm"
              >
                <CodeIcon />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CodeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
  );
}
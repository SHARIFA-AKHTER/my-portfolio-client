/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { 
  Loader2, Rocket, Link as LinkIcon, Code, 
  Globe, Github, Cpu, Image as ImageIcon 
} from "lucide-react";
import { createProject } from "@/actions/projects";

interface ProjectFormData {
  title: string;
  slug: string;
  description: string;
  liveUrl?: string;
  frontendRepo?: string;
  backendRepo?: string;
  techStack?: string;
  image?: string;
}

export default function CreateProjectForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProjectFormData>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: ProjectFormData) => {
    setLoading(true);
    try {
      const token = Cookies.get("token");
      if (!token) throw new Error("Unauthorized: Please login");

      const projectData = {
        ...data,
        techStack: data.techStack?.split(",").map((t) => t.trim()) || [],
        image: data.image?.split(",").map((i) => i.trim()) || [],
      };

      const result = await createProject(projectData, token);
      if (result) {
        toast.success("✅ Project created successfully!");
        reset();
        setTimeout(() => router.push("/dashboard/projects"), 1500);
      }
    } catch (err: any) {
      toast.error(err?.message || "❌ Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto p-1"
    >
      <div className="bg-card text-card-foreground shadow-2xl rounded-[2.5rem] border border-primary/10 overflow-hidden">
        {/* Form Header */}
        <div className="bg-primary/5 p-8 border-b border-primary/10">
          <h2 className="text-2xl md:text-3xl font-black flex items-center gap-3">
            <span className="bg-primary text-primary-foreground p-2 rounded-xl">
              <Rocket size={24} />
            </span>
            Create New Project
          </h2>
          <p className="text-muted-foreground mt-2">Showcase your latest work to the world.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Title</label>
              <input
                {...register("title", { required: "Title is required" })}
                className="w-full bg-secondary/50 border border-primary/10 px-4 py-3 rounded-2xl focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                placeholder="E-commerce Platform"
              />
              {errors.title && <p className="text-destructive text-xs ml-1">{errors.title.message}</p>}
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Slug</label>
              <div className="relative">
                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <input
                  {...register("slug", { required: "Slug is required" })}
                  className="w-full bg-secondary/50 border border-primary/10 pl-11 pr-4 py-3 rounded-2xl focus:ring-2 focus:ring-primary focus:outline-none transition-all font-mono"
                  placeholder="my-cool-project"
                />
              </div>
              {errors.slug && <p className="text-destructive text-xs ml-1">{errors.slug.message}</p>}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Description</label>
            <textarea
              {...register("description", { required: "Description is required" })}
              rows={4}
              className="w-full bg-secondary/50 border border-primary/10 px-4 py-3 rounded-2xl focus:ring-2 focus:ring-primary focus:outline-none transition-all resize-none leading-relaxed"
              placeholder="Tell a story about this project..."
            />
            {errors.description && <p className="text-destructive text-xs ml-1">{errors.description.message}</p>}
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input {...register("liveUrl")} placeholder="Live Link" className="w-full bg-secondary/30 border border-primary/5 pl-11 pr-4 py-3 rounded-xl focus:ring-1 focus:ring-primary focus:outline-none text-sm" />
            </div>
            <div className="relative">
              <Github className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input {...register("frontendRepo")} placeholder="Frontend Repo" className="w-full bg-secondary/30 border border-primary/5 pl-11 pr-4 py-3 rounded-xl focus:ring-1 focus:ring-primary focus:outline-none text-sm" />
            </div>
            <div className="relative">
              <Code className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input {...register("backendRepo")} placeholder="Backend Repo" className="w-full bg-secondary/30 border border-primary/5 pl-11 pr-4 py-3 rounded-xl focus:ring-1 focus:ring-primary focus:outline-none text-sm" />
            </div>
          </div>

          {/* Tech Stack & Images */}
          <div className="space-y-4">
            <div className="relative">
              <Cpu className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input 
                {...register("techStack")} 
                placeholder="Tech Stack (React, Next.js, Tailwind...)" 
                className="w-full bg-secondary/50 border border-primary/10 pl-11 pr-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
            <div className="relative">
              <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input 
                {...register("image")} 
                placeholder="Image URLs (Comma separated)" 
                className="w-full bg-secondary/50 border border-primary/10 pl-11 pr-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 flex items-center justify-center gap-3 text-primary-foreground font-black bg-primary rounded-2xl hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-50 shadow-xl shadow-primary/20 uppercase tracking-widest mt-4"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <Rocket size={18} /> Launch Project
              </>
            )}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
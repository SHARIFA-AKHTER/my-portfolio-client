/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft, Save, Globe, Type, Link as LinkIcon, Github } from "lucide-react";
import { toast } from "sonner";
import { updateProjectAction } from "@/services/ProjectServices/projectService";

export default function ProjectEditForm({ project, projectId }: { project: any; projectId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);


  const [formData, setFormData] = useState({
    title: project?.title || "",
    slug: project?.slug || "",
    description: project?.description || "",
    liveUrl: project?.liveUrl || "",
    frontendRepo: project?.frontendRepo || "",
    backendRepo: project?.backendRepo || "",
    techStack: Array.isArray(project?.techStack) ? project.techStack.join(", ") : "",
    image: Array.isArray(project?.image) ? project.image.join(", ") : "",
  });

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const loadingToast = toast.loading("Updating project...");

    try {
      const res = await updateProjectAction(Number(projectId), formData);
      if (res) {
        toast.success("Project updated successfully!", { id: loadingToast });
        router.push("/dashboard/projects");
        router.refresh();
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update", { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors font-medium"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <div className="bg-card border border-primary/10 shadow-2xl rounded-[2.5rem] p-8 md:p-12">
        <h1 className="text-3xl font-extrabold mb-8 flex items-center gap-3">
          <span className="bg-primary/10 p-3 rounded-2xl text-primary">✏️</span>
          Edit Project <span className="text-primary opacity-50 font-mono">#{projectId}</span>
        </h1>

        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Title & Slug */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Title</label>
              <div className="relative">
                <Type className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
                <input
                  className="w-full bg-secondary/50 border-none rounded-2xl py-4 pl-12 focus:ring-2 focus:ring-primary font-bold"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Slug</label>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
                <input
                  className="w-full bg-secondary/50 border-none rounded-2xl py-4 pl-12 focus:ring-2 focus:ring-primary font-mono text-sm"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Description</label>
            <textarea
              className="w-full bg-secondary/50 border-none rounded-2xl p-6 h-32 focus:ring-2 focus:ring-primary leading-relaxed resize-none"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase ml-1">Live URL</label>
              <div className="relative">
                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
                <input
                  className="w-full bg-secondary/50 border-none rounded-2xl py-4 pl-12 focus:ring-2 focus:ring-primary"
                  value={formData.liveUrl}
                  onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase ml-1">Frontend Repo</label>
              <div className="relative">
                <Github className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
                <input
                  className="w-full bg-secondary/50 border-none rounded-2xl py-4 pl-12 focus:ring-2 focus:ring-primary"
                  value={formData.frontendRepo}
                  onChange={(e) => setFormData({ ...formData, frontendRepo: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Tech Stack & Images */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase ml-1">Tech Stack (comma separated)</label>
              <input
                className="w-full bg-secondary/50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary"
                value={formData.techStack}
                onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase ml-1">Image URLs (comma separated)</label>
              <input
                className="w-full bg-secondary/50 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-primary"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground font-black py-4 rounded-2xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex justify-center items-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            {loading ? "SAVING CHANGES..." : "UPDATE PROJECT"}
          </button>
        </form>
      </div>
    </div>
  );
}
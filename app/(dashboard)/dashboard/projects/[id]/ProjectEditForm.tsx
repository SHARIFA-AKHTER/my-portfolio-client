/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft, Save, Globe, Type } from "lucide-react";

import { toast } from "sonner";
import { updateProjectAction } from "@/services/ProjectServices/projectService";


export default function ProjectEditForm({ project, projectId }: { project: any, projectId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: project.title || "",
    slug: project.slug || "",
    description: project.description || "",
  });
const handleUpdate = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const idToUpdate = Number(projectId); 

      if (!idToUpdate) {
        throw new Error("ID not");
      }
    const payload = { ...project, ...formData };

 await  updateProjectAction(idToUpdate, payload);
    // await projectService(Number(projectId), payload); 
    
    toast.success("✅ Updated!");
    router.push("/dashboard/projects");
    router.refresh();
  } catch (err: any) {
    toast.error(err.message || "Update failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-3xl mx-auto">
       <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors font-medium"
        >
          <ArrowLeft size={18} /> Back
        </button>

        <div className="bg-card border border-primary/10 shadow-2xl rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
          <h1 className="text-3xl font-extrabold mb-8 flex items-center gap-3">
            <span className="bg-primary/10 p-3 rounded-2xl text-primary">✏️</span>
            Edit Project <span className="text-primary opacity-50 font-mono">#{project.id}</span>
          </h1>

          <form onSubmit={handleUpdate} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Title</label>
              <div className="relative">
                <Type className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
                <input 
                  className="w-full bg-secondary/50 border-none rounded-2xl py-4 pl-12 focus:ring-2 focus:ring-primary font-bold"
                  value={formData.title} 
                  onChange={(e) => setFormData({...formData, title: e.target.value})} 
                  required
                />
              </div>
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Slug</label>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
                <input 
                  className="w-full bg-secondary/50 border-none rounded-2xl py-4 pl-12 focus:ring-2 focus:ring-primary font-mono text-sm"
                  value={formData.slug} 
                  onChange={(e) => setFormData({...formData, slug: e.target.value})} 
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Description</label>
              <textarea 
                className="w-full bg-secondary/50 border-none rounded-2xl p-6 h-48 focus:ring-2 focus:ring-primary leading-relaxed resize-none"
                value={formData.description} 
                onChange={(e) => setFormData({...formData, description: e.target.value})} 
                required
              />
            </div>

            <button 
              type="submit"
              disabled={loading} 
              className="w-full bg-primary text-primary-foreground font-black py-4 rounded-2xl shadow-xl hover:opacity-90 transition-all flex justify-center items-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Save size={18} />}
              {loading ? "SAVING..." : "UPDATE PROJECT"}
            </button>
          </form>
        </div>
    </div>
  );
}
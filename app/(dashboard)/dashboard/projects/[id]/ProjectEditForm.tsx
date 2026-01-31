/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft, Save, Globe, Type } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { updateProject } from "@/actions/projects";

export default function ProjectEditForm({ id }: { id: string }) {
  const router = useRouter();
  const [fullProjectData, setFullProjectData] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`);
        const result = await res.json();
        const data = result.data || result;

        setFullProjectData(data);
        setFormData({
          title: data.title || "",
          slug: data.slug || "",
          description: data.description || "",
        });
      } catch (err: any) {
        toast.error("Failed to load project details ❌");
      } finally {
        setFetching(false);
      }
    };
    fetchProject();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      

      const finalPayload = {
        ...fullProjectData,
        ...formData,
      };

      await updateProject(Number(id), finalPayload, token || undefined);
      
      toast.success("✅ Project updated successfully!");
      router.refresh();
      setTimeout(() => router.push("/dashboard/projects"), 1000);
    } catch (err: any) {
      toast.error(err?.message || "❌ Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return (
    <div className="min-h-[80vh] flex items-center justify-center font-bold">
      <Loader2 className="animate-spin mr-2" /> Loading Project Info...
    </div>
  );

  return (
    <div className="min-h-screen bg-background p-4 md:p-10 transition-all">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
        
        <button onClick={() => router.back()} className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors font-bold text-sm uppercase">
          <ArrowLeft size={16} /> Back
        </button>

        <div className="bg-card border border-primary/10 shadow-2xl rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 blur-3xl rounded-full"></div>

          <h1 className="text-3xl font-black mb-10 flex items-center gap-3 italic text-primary">
             EDIT PROJECT <span className="text-muted-foreground/30 font-mono">#{id}</span>
          </h1>

          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Title</label>
              <div className="relative">
                <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50" size={18} />
                <input 
                  type="text" 
                  value={formData.title} 
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-secondary/30 border-none rounded-2xl py-4 pl-12 focus:ring-2 focus:ring-primary font-bold transition-all"
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Slug</label>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/50" size={18} />
                <input 
                  type="text" 
                  value={formData.slug} 
                  onChange={(e) => setFormData({...formData, slug: e.target.value})}
                  className="w-full bg-secondary/30 border-none rounded-2xl py-4 pl-12 focus:ring-2 focus:ring-primary font-mono text-sm transition-all"
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Description</label>
              <textarea 
                value={formData.description} 
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full bg-secondary/30 border-none rounded-2xl py-4 px-6 h-40 focus:ring-2 focus:ring-primary font-medium transition-all resize-none"
                required 
              />
            </div>

            <div className="flex gap-4 pt-6">
              <button type="submit" disabled={loading} className="flex-1 bg-primary text-primary-foreground font-black py-4 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl flex items-center justify-center gap-2">
                {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                {loading ? "SAVING..." : "SAVE CHANGES"}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
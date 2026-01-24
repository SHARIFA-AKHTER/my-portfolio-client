/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Edit, Trash2, Plus, LayoutGrid, Loader2 } from "lucide-react";
import { deleteProject } from "../../../../actions/projects";
import { getAllProjects } from "../../../../lib/project";
import { toast } from "sonner";

export default function DashboardProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllProjects();
        setProjects(data);
      } catch (error) {
        toast.error("Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    
    const loadingToast = toast.loading("Deleting project...");
    try {
      const token = localStorage.getItem("token");
      await deleteProject(id, token || undefined);
      setProjects(prev => prev.filter(p => p.id !== id));
      toast.success("Project deleted successfully", { id: loadingToast });
    } catch (err: any) {
      toast.error(err.message || "Delete failed", { id: loadingToast });
    }
  };

  if (loading) return (
    <div className="flex h-96 items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
    </div>
  );

  return (
    <div className="p-4 md:p-8 flex-1 bg-background text-foreground transition-colors duration-300">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <LayoutGrid className="text-primary" /> Manage Projects
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Total {projects.length} projects found</p>
        </div>
        
        <Link 
          href="/dashboard/create-project" 
          className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-bold hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-primary/20"
        >
          <Plus size={18} /> Add New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-primary/10 rounded-3xl">
          <p className="text-muted-foreground">No projects found. Start by adding one!</p>
        </div>
      ) : (
        /* Responsive Table Container */
        <div className="overflow-hidden rounded-2xl border border-primary/10 bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-secondary/50 text-muted-foreground uppercase text-[11px] font-black tracking-widest">
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Project Title</th>
                  <th className="px-6 py-4 hidden md:table-cell">Slug</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/5">
                {projects.map((p) => (
                  <tr key={p.id} className="hover:bg-primary/5 transition-colors group">
                    <td className="px-6 py-4 font-mono text-sm text-muted-foreground">#{p.id}</td>
                    <td className="px-6 py-4">
                      <span className="font-bold block text-foreground group-hover:text-primary transition-colors">
                        {p.title}
                      </span>
                      <span className="text-[10px] md:hidden text-muted-foreground lowercase">{p.slug}</span>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell text-sm text-muted-foreground">
                      {p.slug}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <Link 
                          href={`/dashboard/projects/${p.id}`} 
                          className="p-2 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all shadow-sm"
                          title="Edit Project"
                        >
                          <Edit size={16}/>
                        </Link>
                        <button 
                          onClick={() => handleDelete(p.id)} 
                          className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all shadow-sm"
                          title="Delete Project"
                        >
                          <Trash2 size={16}/>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
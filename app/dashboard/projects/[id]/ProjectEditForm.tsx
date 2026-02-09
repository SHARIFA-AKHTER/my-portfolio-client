// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Loader2, ArrowLeft, Save, Globe, Type, Cpu, Image as ImageIcon } from "lucide-react";
// import { motion } from "framer-motion";
// import { toast } from "sonner";
// import { updateProjectAction } from "@/services/ProjectServices/projectService"; 

// export default function ProjectEditForm({ project, projectId }: { project: any, projectId: string }) {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     title: project?.title || "",
//     slug: project?.slug || "",
//     description: project?.description || "",
  
//     techStack: Array.isArray(project?.techStack) ? project.techStack.join(", ") : project?.techStack || "",
//     image: Array.isArray(project?.image) ? project.image.join(", ") : project?.image || "",
//     liveUrl: project?.liveUrl || "",
//     frontendRepo: project?.frontendRepo || "",
//     backendRepo: project?.backendRepo || "",
//     authorId: project?.authorId || 3 
//   });

//   const handleUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
 
//       await updateProjectAction(projectId, formData);
//       toast.success("✅ Project updated successfully!");
//       router.push("/dashboard/projects");
//       router.refresh();
//     } catch (err: any) {
//       toast.error(err?.message || "❌ Update failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen p-4 md:p-10">
//       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
//         <button onClick={() => router.back()} className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
//           <ArrowLeft size={18} /> Back to Dashboard
//         </button>

//         <div className="bg-card border border-primary/10 shadow-2xl rounded-[2.5rem] p-6 sm:p-12 relative">
//           <h1 className="text-3xl font-extrabold mb-8 flex items-center gap-3">
//             <span className="bg-primary/10 p-3 rounded-2xl">✏️</span> Edit Project
//           </h1>

//           <form onSubmit={handleUpdate} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-2">
//                 <label className="flex items-center gap-2 text-sm font-bold opacity-70 uppercase"><Type size={14} /> Title</label>
//                 <input type="text" className="w-full bg-secondary/50 border border-primary/10 px-5 py-4 rounded-2xl focus:ring-2 focus:ring-primary outline-none" 
//                   value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
//               </div>

//               <div className="space-y-2">
//                 <label className="flex items-center gap-2 text-sm font-bold opacity-70 uppercase"><Globe size={14} /> Slug</label>
//                 <input type="text" className="w-full bg-secondary/50 border border-primary/10 px-5 py-4 rounded-2xl focus:ring-2 focus:ring-primary outline-none" 
//                   value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} required />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-bold opacity-70 uppercase">Description</label>
//               <textarea className="w-full bg-secondary/50 border border-primary/10 px-5 py-4 rounded-2xl h-32 resize-none" 
//                 value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required />
//             </div>

       
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-2">
//                 <label className="flex items-center gap-2 text-sm font-bold opacity-70 uppercase"><Cpu size={14} /> Tech Stack (Comma separated)</label>
//                 <input type="text" className="w-full bg-secondary/50 border border-primary/10 px-5 py-4 rounded-2xl" 
//                   value={formData.techStack} onChange={(e) => setFormData({...formData, techStack: e.target.value})} placeholder="React, Next.js, Tailwind" />
//               </div>

//               <div className="space-y-2">
//                 <label className="flex items-center gap-2 text-sm font-bold opacity-70 uppercase"><ImageIcon size={14} /> Image URLs (Comma separated)</label>
//                 <input type="text" className="w-full bg-secondary/50 border border-primary/10 px-5 py-4 rounded-2xl" 
//                   value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} placeholder="https://image1.png, https://image2.png" />
//               </div>
//             </div>

//             <div className="flex gap-4 pt-4">
//               <button type="submit" disabled={loading} className="flex-1 flex justify-center items-center gap-2 bg-primary text-primary-foreground font-bold py-4 rounded-2xl hover:opacity-90 transition-all shadow-xl active:scale-95 disabled:opacity-50">
//                 {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <><Save size={18} /> Save Changes</>}
//               </button>
//               <button type="button" onClick={() => router.push("/dashboard/projects")} className="px-8 py-4 bg-secondary text-secondary-foreground font-bold rounded-2xl hover:bg-secondary/80 transition-all">Cancel</button>
//             </div>
//           </form>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft, Save, Globe, Type, Cpu, Image as ImageIcon, Link as LinkIcon, Github } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { updateProjectAction } from "@/services/ProjectServices/projectService"; 

export default function ProjectEditForm({ project, projectId }: { project: any, projectId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

 
  const [formData, setFormData] = useState({
    title: project?.title || "",
    slug: project?.slug || "",
    description: project?.description || "",
    techStack: Array.isArray(project?.techStack) ? project.techStack.join(", ") : project?.techStack || "",
    image: Array.isArray(project?.image) ? project.image.join(", ") : project?.image || "",
    liveUrl: project?.liveUrl || "",
    frontendRepo: project?.frontendRepo || "",
    backendRepo: project?.backendRepo || "",
    authorId: project?.authorId || 3
  });

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const loadingToast = toast.loading("Updating project...");

    try {
      
      const numericId = Number(projectId);
      
     
      await updateProjectAction(numericId, formData);
      
      toast.success("✅ Project updated successfully!", { id: loadingToast });
 
      router.push("/dashboard/projects");
      router.refresh(); 
    } catch (err: any) {
      console.error("Update Error:", err);
      toast.error(err?.message || "❌ Update failed", { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-10 bg-background">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft size={18} /> Back to Projects
        </button>

        <div className="bg-card border border-primary/10 shadow-2xl rounded-[2.5rem] p-6 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <Save size={120} />
          </div>

          <h1 className="text-3xl font-extrabold mb-8 flex items-center gap-3">
            <span className="bg-primary/10 p-3 rounded-2xl text-primary">✏️</span> Edit Project
          </h1>

          <form onSubmit={handleUpdate} className="space-y-6 relative z-10">
            {/* Title & Slug */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold opacity-70 uppercase"><Type size={14} /> Title</label>
                <input 
                  type="text" 
                  className="w-full bg-secondary/50 border border-primary/10 px-5 py-4 rounded-2xl focus:ring-2 focus:ring-primary outline-none" 
                  value={formData.title} 
                  onChange={(e) => setFormData({...formData, title: e.target.value})} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold opacity-70 uppercase"><Globe size={14} /> Slug</label>
                <input 
                  type="text" 
                  className="w-full bg-secondary/50 border border-primary/10 px-5 py-4 rounded-2xl focus:ring-2 focus:ring-primary outline-none" 
                  value={formData.slug} 
                  onChange={(e) => setFormData({...formData, slug: e.target.value})} 
                  required 
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-bold opacity-70 uppercase">Description</label>
              <textarea 
                className="w-full bg-secondary/50 border border-primary/10 px-5 py-4 rounded-2xl h-32 resize-none focus:ring-2 focus:ring-primary outline-none" 
                value={formData.description} 
                onChange={(e) => setFormData({...formData, description: e.target.value})} 
                required 
              />
            </div>

            {/* Tech Stack & Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold opacity-70 uppercase"><Cpu size={14} /> Tech Stack (Comma separated)</label>
                <input 
                  type="text" 
                  className="w-full bg-secondary/50 border border-primary/10 px-5 py-4 rounded-2xl focus:ring-2 focus:ring-primary outline-none" 
                  value={formData.techStack} 
                  onChange={(e) => setFormData({...formData, techStack: e.target.value})} 
                  placeholder="React, Next.js, Node.js" 
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold opacity-70 uppercase"><ImageIcon size={14} /> Image URLs (Comma separated)</label>
                <input 
                  type="text" 
                  className="w-full bg-secondary/50 border border-primary/10 px-5 py-4 rounded-2xl focus:ring-2 focus:ring-primary outline-none" 
                  value={formData.image} 
                  onChange={(e) => setFormData({...formData, image: e.target.value})} 
                  placeholder="https://image1.jpg, https://image2.jpg" 
                />
              </div>
            </div>

            {/* External Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold opacity-70 uppercase"><LinkIcon size={14} /> Live URL</label>
                <input 
                  type="text" 
                  className="w-full bg-secondary/50 border border-primary/10 px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary outline-none" 
                  value={formData.liveUrl} 
                  onChange={(e) => setFormData({...formData, liveUrl: e.target.value})} 
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold opacity-70 uppercase"><Github size={14} /> Frontend Repo</label>
                <input 
                  type="text" 
                  className="w-full bg-secondary/50 border border-primary/10 px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary outline-none" 
                  value={formData.frontendRepo} 
                  onChange={(e) => setFormData({...formData, frontendRepo: e.target.value})} 
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold opacity-70 uppercase"><Github size={14} /> Backend Repo</label>
                <input 
                  type="text" 
                  className="w-full bg-secondary/50 border border-primary/10 px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary outline-none" 
                  value={formData.backendRepo} 
                  onChange={(e) => setFormData({...formData, backendRepo: e.target.value})} 
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <button 
                type="submit" 
                disabled={loading} 
                className="flex-1 flex justify-center items-center gap-2 bg-primary text-primary-foreground font-bold py-4 rounded-2xl hover:opacity-90 transition-all shadow-xl active:scale-95 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <><Save size={18} /> Update Project</>}
              </button>
              <button 
                type="button" 
                onClick={() => router.push("/dashboard/projects")} 
                className="px-8 py-4 bg-secondary text-secondary-foreground font-bold rounded-2xl hover:bg-secondary/80 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
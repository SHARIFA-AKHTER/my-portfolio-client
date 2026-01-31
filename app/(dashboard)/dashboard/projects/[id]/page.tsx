
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { Loader2, ArrowLeft, Save, Globe, Type } from "lucide-react";

// import { motion } from "framer-motion";
// import { toast } from "sonner";
// import { updateProject } from "@/actions/projects";

// export default function ProjectEditPage() {
//   const router = useRouter();
//   const params = useParams();
//   const id = Number(params?.id);

//   const [formData, setFormData] = useState({
//     title: "",
//     slug: "",
//     description: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(true);

//   // 🧠 Fetch project data
//   useEffect(() => {
//     const fetchProject = async () => {
//       try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`);
//         if (!res.ok) throw new Error("Failed to fetch details");
//         const data = await res.json();
//         setFormData({
//           title: data.title || "",
//           slug: data.slug || "",
//           description: data.description || "",
//         });
//       } catch (err: any) {
//         toast.error(err.message || "Failed to load project ❌");
//       } finally {
//         setFetching(false);
//       }
//     };
//     if (id) fetchProject();
//   }, [id]);

//   // 📝 Handle update submission
//   const handleUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const token = localStorage.getItem("token");
//       await updateProject(id, formData, token || undefined);
//       toast.success("✅ Project updated successfully!");
//       setTimeout(() => router.push("/dashboard/projects"), 1200);
//     } catch (err: any) {
//       toast.error(err?.message || "❌ Failed to update project");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (fetching) return (
//     <div className="min-h-[80vh] flex items-center justify-center">
//       <Loader2 className="animate-spin h-10 w-10 text-primary" />
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-background text-foreground p-4 md:p-10 transition-colors duration-300">
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="max-w-3xl mx-auto"
//       >
//         {/* Back Button */}
//         <button 
//           onClick={() => router.back()}
//           className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors font-medium"
//         >
//           <ArrowLeft size={18} /> Back to Dashboard
//         </button>

//         <div className="bg-card border border-primary/10 shadow-2xl rounded-[2.5rem] p-6 sm:p-12 overflow-hidden relative">
//           {/* Decorative Background Blob */}
//           <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 blur-3xl rounded-full"></div>

//           <h1 className="text-3xl font-extrabold mb-8 flex items-center gap-3">
//             <span className="bg-primary/10 p-3 rounded-2xl text-primary">✏️</span>
//             Edit Project <span className="text-primary opacity-50">#{id}</span>
//           </h1>

//           <form onSubmit={handleUpdate} className="space-y-6 relative z-10">
//             {/* Title Field */}
//             <div className="space-y-2">
//               <label className="flex items-center gap-2 text-sm font-bold text-muted-foreground ml-1 uppercase tracking-wider">
//                 <Type size={14} /> Project Title
//               </label>
//               <input
//                 type="text"
//                 className="w-full bg-secondary/50 border border-primary/10 px-5 py-4 rounded-2xl focus:ring-2 focus:ring-primary focus:outline-none transition-all"
//                 placeholder="Awesome Portfolio Website"
//                 value={formData.title}
//                 onChange={(e) => setFormData({...formData, title: e.target.value})}
//                 required
//               />
//             </div>

//             {/* Slug Field */}
//             <div className="space-y-2">
//               <label className="flex items-center gap-2 text-sm font-bold text-muted-foreground ml-1 uppercase tracking-wider">
//                 <Globe size={14} /> Project Slug
//               </label>
//               <input
//                 type="text"
//                 className="w-full bg-secondary/50 border border-primary/10 px-5 py-4 rounded-2xl focus:ring-2 focus:ring-primary focus:outline-none transition-all font-mono text-sm"
//                 placeholder="awesome-portfolio"
//                 value={formData.slug}
//                 onChange={(e) => setFormData({...formData, slug: e.target.value})}
//                 required
//               />
//             </div>

//             {/* Description Field */}
//             <div className="space-y-2">
//               <label className="flex items-center gap-2 text-sm font-bold text-muted-foreground ml-1 uppercase tracking-wider">
//                 Description
//               </label>
//               <textarea
//                 className="w-full bg-secondary/50 border border-primary/10 px-5 py-4 rounded-2xl focus:ring-2 focus:ring-primary focus:outline-none h-40 resize-none transition-all leading-relaxed"
//                 placeholder="Describe your masterpiece..."
//                 value={formData.description}
//                 onChange={(e) => setFormData({...formData, description: e.target.value})}
//                 required
//               />
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4 pt-4">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="flex-1 flex justify-center items-center gap-2 bg-primary text-primary-foreground font-bold py-4 rounded-2xl hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-60 shadow-lg shadow-primary/20"
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="animate-spin h-5 w-5" /> Updating...
//                   </>
//                 ) : (
//                   <>
//                     <Save size={18} /> Update Project
//                   </>
//                 )}
//               </button>
              
//               <button
//                 type="button"
//                 onClick={() => router.push("/dashboard/projects")}
//                 className="px-8 py-4 bg-secondary text-secondary-foreground font-bold rounded-2xl hover:bg-secondary/80 transition-all"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       </motion.div>
//     </div>
//   );
// }


// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { notFound } from "next/navigation";
// import ProjectEditForm from "./ProjectEditForm";


// export async function generateStaticParams() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects`);
//   const result = await res.json();
//   const projects = Array.isArray(result) ? result : result.data || [];

//   return projects.map((project: any) => ({
//     id: String(project.id),
//   }));
// }

// export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
//   const { id } = await params;


//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`, {
//     cache: "no-store", 
//   });

//   if (!res.ok) return notFound();

//   const result = await res.json();
//   const project = result.data || result;

//   if (!project) return notFound();

//   return <ProjectEditForm project={project} />;
// }

export const dynamic = "force-dynamic";

import ProjectEditForm from "../ProjectEditForm"; 

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`, {
     cache: "no-store" 
  });
  
  const project = await res.json();


  return <ProjectEditForm project={project} />;
}
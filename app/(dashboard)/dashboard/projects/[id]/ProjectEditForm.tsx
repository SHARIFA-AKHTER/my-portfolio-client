// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Loader2, ArrowLeft, Save, Globe, Type } from "lucide-react";

// import { toast } from "sonner";
// import { updateProjectAction } from "@/services/ProjectServices/projectService";

// export default function ProjectEditForm({
//   project,
//   projectId,
// }: {
//   project: any;
//   projectId: string;
// }) {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     title: project.title || "",
//     slug: project.slug || "",
//     description: project.description || "",
//   });

//   const handleUpdate = async (formData: any) => {
//     try {
//       const res = await updateProjectAction(project.id, formData);
//       if (res.success) {
//         toast.success("Updated!");
//         router.push("/dashboard/projects");
//       }
//     } catch (err) {
//       toast.error("Failed to update");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto">
//       <button
//         onClick={() => router.back()}
//         className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors font-medium"
//       >
//         <ArrowLeft size={18} /> Back
//       </button>

//       <div className="bg-card border border-primary/10 shadow-2xl rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
//         <h1 className="text-3xl font-extrabold mb-8 flex items-center gap-3">
//           <span className="bg-primary/10 p-3 rounded-2xl text-primary">✏️</span>
//           Edit Project{" "}
//           <span className="text-primary opacity-50 font-mono">
//             #{project.id}
//           </span>
//         </h1>

//         <form onSubmit={handleUpdate} className="space-y-6">
//           {/* Title */}
//           <div className="space-y-2">
//             <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">
//               Title
//             </label>
//             <div className="relative">
//               <Type
//                 className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30"
//                 size={18}
//               />
//               <input
//                 className="w-full bg-secondary/50 border-none rounded-2xl py-4 pl-12 focus:ring-2 focus:ring-primary font-bold"
//                 value={formData.title}
//                 onChange={(e) =>
//                   setFormData({ ...formData, title: e.target.value })
//                 }
//                 required
//               />
//             </div>
//           </div>

//           {/* Slug */}
//           <div className="space-y-2">
//             <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">
//               Slug
//             </label>
//             <div className="relative">
//               <Globe
//                 className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30"
//                 size={18}
//               />
//               <input
//                 className="w-full bg-secondary/50 border-none rounded-2xl py-4 pl-12 focus:ring-2 focus:ring-primary font-mono text-sm"
//                 value={formData.slug}
//                 onChange={(e) =>
//                   setFormData({ ...formData, slug: e.target.value })
//                 }
//                 required
//               />
//             </div>
//           </div>

//           {/* Description */}
//           <div className="space-y-2">
//             <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">
//               Description
//             </label>
//             <textarea
//               className="w-full bg-secondary/50 border-none rounded-2xl p-6 h-48 focus:ring-2 focus:ring-primary leading-relaxed resize-none"
//               value={formData.description}
//               onChange={(e) =>
//                 setFormData({ ...formData, description: e.target.value })
//               }
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-primary text-primary-foreground font-black py-4 rounded-2xl shadow-xl hover:opacity-90 transition-all flex justify-center items-center gap-2"
//           >
//             {loading ? (
//               <Loader2 className="animate-spin" />
//             ) : (
//               <Save size={18} />
//             )}
//             {loading ? "SAVING..." : "UPDATE PROJECT"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft, Save, Globe, Type } from "lucide-react";
import { toast } from "sonner";
import { updateProjectAction } from "@/services/ProjectServices/projectService";

export default function ProjectEditForm({
  project,
  projectId,
}: {
  project: any;
  projectId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: project?.title || "",
    slug: project?.slug || "",
    description: project?.description || "",
    techStack: Array.isArray(project?.techStack)
      ? project.techStack.join(", ")
      : "",
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
    <div className="max-w-3xl mx-auto py-10">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors font-medium"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <div className="bg-card border border-primary/10 shadow-2xl rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
        <h1 className="text-3xl font-extrabold mb-8 flex items-center gap-3">
          <span className="bg-primary/10 p-3 rounded-2xl text-primary">✏️</span>
          Edit Project{" "}
          <span className="text-primary opacity-50 font-mono">
            #{projectId}
          </span>
        </h1>

        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">
              Title
            </label>
            <div className="relative">
              <Type
                className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30"
                size={18}
              />
              <input
                className="w-full bg-secondary/50 border-none rounded-2xl py-4 pl-12 focus:ring-2 focus:ring-primary font-bold text-foreground"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">
              Slug
            </label>
            <div className="relative">
              <Globe
                className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30"
                size={18}
              />
              <input
                className="w-full bg-secondary/50 border-none rounded-2xl py-4 pl-12 focus:ring-2 focus:ring-primary font-mono text-sm text-foreground"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">
              Description
            </label>
            <textarea
              className="w-full bg-secondary/50 border-none rounded-2xl p-6 h-48 focus:ring-2 focus:ring-primary leading-relaxed resize-none text-foreground"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
          </div>
          {/* Tech Stack */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase ml-1">
              Tech Stack (comma separated)
            </label>
            <input
              className="w-full bg-secondary/50 border-none rounded-2xl py-4 px-6 text-foreground"
              value={formData.techStack}
              onChange={(e) =>
                setFormData({ ...formData, techStack: e.target.value })
              }
            />
          </div>

          {/* Image URLs */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-muted-foreground uppercase ml-1">
              Image URLs (comma separated)
            </label>
            <input
              className="w-full bg-secondary/50 border-none rounded-2xl py-4 px-6 text-foreground"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground font-black py-4 rounded-2xl shadow-xl hover:opacity-90 transition-all flex justify-center items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Save size={18} />
            )}
            {loading ? "SAVING..." : "UPDATE PROJECT"}
          </button>
        </form>
      </div>
    </div>
  );
}

// /* eslint-disable @typescript-eslint/no-explicit-any */

// "use client";
// import { useEffect, useState } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { updateProject } from "@/actions/projects";

// export default function ProjectEditPage() {
//   const router = useRouter();
//   const params = useParams();
//   const id = Number(params?.id);

//   const [title, setTitle] = useState("");
//   const [slug, setSlug] = useState("");
//   const [description, setDescription] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchProject = async () => {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`
//       );
//       if (res.ok) {
//         const data = await res.json();
//         setTitle(data.title);
//         setSlug(data.slug);
//         setDescription(data.description);
//       }
//     };
//     fetchProject();
//   }, [id]);

//   const handleUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await updateProject(id, { title, slug, description });
//       alert("✅ Project updated!");
//       router.push("/dashboard/projects");
//     } catch (err: any) {
//       alert(err.message || "Failed to update project");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Edit Project #{id}</h1>
//       <form onSubmit={handleUpdate} className="flex flex-col gap-4">
//         <input
//           className="border px-3 py-2 rounded"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//         <input
//           className="border px-3 py-2 rounded"
//           placeholder="Slug"
//           value={slug}
//           onChange={(e) => setSlug(e.target.value)}
//           required
//         />
//         <textarea
//           className="border px-3 py-2 rounded"
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         />
//         <button
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           disabled={loading}
//         >
//           {loading ? "Updating..." : "Update Project"}
//         </button>
//       </form>
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { updateProject } from "@/actions/projects";
import { Loader2 } from "lucide-react";

export default function ProjectEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params?.id);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 🧠 Fetch project data for editing
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch project details");
        const data = await res.json();
        setTitle(data.title || "");
        setSlug(data.slug || "");
        setDescription(data.description || "");
      } catch (err: any) {
        setError(err.message || "Failed to load project ❌");
      }
    };
    if (id) fetchProject();
  }, [id]);

  // 📝 Handle update submission
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const updatedData = { title, slug, description };
      await updateProject(id, updatedData);
      setSuccess("✅ Project updated successfully!");
      setTimeout(() => {
        router.push("/dashboard/projects");
      }, 1500);
    } catch (err: any) {
      console.error("Update error:", err);
      setError(err?.message || "❌ Failed to update project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="bg-white w-full max-w-2xl shadow-xl rounded-2xl p-8 sm:p-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          ✏️ Edit Project #{id}
        </h1>

        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Title Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Project Title
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter project title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Slug Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Project Slug
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none h-32 resize-none"
              placeholder="Write a short description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Feedback Messages */}
          {success && (
            <p className="text-green-600 font-medium text-center bg-green-50 py-2 rounded-lg">
              {success}
            </p>
          )}
          {error && (
            <p className="text-red-600 font-medium text-center bg-red-50 py-2 rounded-lg">
              {error}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition-all disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5" /> Updating...
              </>
            ) : (
              "Update Project"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

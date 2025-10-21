/* eslint-disable @typescript-eslint/no-explicit-any */
 
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useForm } from "react-hook-form";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// interface BlogFormData {
//   title: string;
//   slug: string;
//   content: string;
//   excerpt?: string;
//   coverUrl?: string;
//   published?: boolean;
// }

// export default function CreateBlogForm() {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<BlogFormData>();
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   // const onSubmit = async (data: BlogFormData) => {
//   //   setLoading(true);
//   //   setError(null);
//   //   setSuccess(null);

//   //   try {
//   //     const token = localStorage.getItem("token");
//   //     if (!token) throw new Error("Unauthorized: No token found");

//   //     const blogData = {
//   //       ...data,
//   //       authorId: 3,
//   //       tags: [],
//   //       isFeatured: false,
//   //     };

//   //     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //         Authorization: `Bearer ${token}`,
//   //       },
//   //       body: JSON.stringify(blogData),
//   //     });

//   //     if (!res.ok) {
//   //       const text = await res.text();
//   //       throw new Error(text || "Failed to create blog");
//   //     }

//   //     const result = await res.json();

//   //     setSuccess("✅ Blog created successfully!");
//   //     setTimeout(() => {
//   //       reset();
//   //       router.push("/blogs");
//   //     }, 1500);
//   //   } catch (err: any) {
//   //     console.error("Blog creation error:", err);
//   //     setError(err?.message || "Failed to create blog ❌");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const onSubmit = async (data: BlogFormData) => {
//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error("Unauthorized: No token found");

//       const blogData = {
//         ...data,
//         tags: [],
//         isFeatured: false,
//       };

//       const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(blogData),
//       });

//       const result = await res.json();
//       console.log("Response:", result);

//       if (!res.ok || !result.success) {
//         throw new Error(result.message || "Failed to create blog ❌");
//       }

//       setSuccess("✅ Blog created successfully!");
//       setTimeout(() => {
//         reset();
//         router.push("/blogs");
//       }, 1500);
//     } catch (err: any) {
//       console.error("Blog creation error:", err);
//       setError(err?.message || "Failed to create blog ❌");
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div className="w-full max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
//       <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">
//         ✍️ Create New Blog
//       </h2>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//         {/* Title */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Title
//           </label>
//           <input
//             {...register("title", { required: true })}
//             className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             placeholder="Enter blog title"
//           />
//           {errors.title && (
//             <p className="text-red-500 text-sm">Title is required</p>
//           )}
//         </div>

//         {/* Slug */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Slug
//           </label>
//           <input
//             {...register("slug", { required: true })}
//             className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             placeholder="unique-blog-slug"
//           />
//           {errors.slug && (
//             <p className="text-red-500 text-sm">Slug is required</p>
//           )}
//         </div>

//         {/* Excerpt */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Excerpt
//           </label>
//           <textarea
//             {...register("excerpt")}
//             rows={2}
//             className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             placeholder="Short summary about blog..."
//           />
//         </div>

//         {/* Content */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Content
//           </label>
//           <textarea
//             {...register("content", { required: true })}
//             rows={6}
//             className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             placeholder="Write your blog content..."
//           />
//           {errors.content && (
//             <p className="text-red-500 text-sm">Content is required</p>
//           )}
//         </div>

//         {/* Cover URL */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Cover URL
//           </label>
//           <input
//             {...register("coverUrl")}
//             type="url"
//             className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             placeholder="https://example.com/cover.jpg"
//           />
//         </div>

//         {/* Published */}
//         <div className="flex items-center gap-2">
//           <input
//             type="checkbox"
//             {...register("published")}
//             className="w-4 h-4"
//           />
//           <label className="text-gray-700 text-sm">Publish now</label>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full py-3 text-white font-semibold bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300 disabled:opacity-60"
//         >
//           {loading ? "Creating..." : "Create Blog"}
//         </button>

//         {/* Messages */}
//         {success && <p className="text-green-600 text-center">{success}</p>}
//         {error && <p className="text-red-600 text-center">{error}</p>}
//       </form>
//     </div>
//   );
// }


"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBlog } from "@/actions/create";


interface BlogFormData {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  coverUrl?: string;
  published?: boolean;
}

export default function CreateBlogForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<BlogFormData>();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: BlogFormData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
     
      const result = await createBlog(data);

      if (!result?.success) throw new Error(result?.message || "Failed to create blog");

      setSuccess("✅ Blog created successfully!");
      setTimeout(() => {
        reset();
        router.push("/blogs");
      }, 1500);
    } catch (err: any) {
      console.error("Blog creation error:", err);
      setError(err?.message || "Failed to create blog ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">
        ✍️ Create New Blog
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            {...register("title", { required: true })}
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter blog title"
          />
          {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Slug</label>
          <input
            {...register("slug", { required: true })}
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="unique-blog-slug"
          />
          {errors.slug && <p className="text-red-500 text-sm">Slug is required</p>}
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Excerpt</label>
          <textarea
            {...register("excerpt")}
            rows={2}
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Short summary about blog..."
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            {...register("content", { required: true })}
            rows={6}
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Write your blog content..."
          />
          {errors.content && <p className="text-red-500 text-sm">Content is required</p>}
        </div>

        {/* Cover URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Cover URL</label>
          <input
            {...register("coverUrl")}
            type="url"
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="https://example.com/cover.jpg"
          />
        </div>

        {/* Published */}
        <div className="flex items-center gap-2">
          <input type="checkbox" {...register("published")} className="w-4 h-4" />
          <label className="text-gray-700 text-sm">Publish now</label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 text-white font-semibold bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300 disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Blog"}
        </button>

        {/* Messages */}
        {success && <p className="text-green-600 text-center">{success}</p>}
        {error && <p className="text-red-600 text-center">{error}</p>}
      </form>
    </div>
  );
}
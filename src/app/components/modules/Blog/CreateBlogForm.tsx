/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { createBlog } from "@/actions/create";
// import Form from "next/form";

// import { useState } from "react";

// export default function CreateBlogForm() {
//   const [isFeatured, setIsFeatured] = useState("false");

//   return (
//     <Form
//       action={createBlog}
//       className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-4 w-full"
//     >
//       <h2 className="text-xl font-semibold mb-4">Create Blog</h2>

//       {/* Title */}
//       <div>
//         <label className="block text-sm font-medium mb-1" htmlFor="title">
//           Title
//         </label>
//         <input
//           type="text"
//           id="title"
//           name="title"
//           className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
//         />
//       </div>

//       {/* Content */}
//       <div>
//         <label className="block text-sm font-medium mb-1" htmlFor="content">
//           Content
//         </label>
//         <textarea
//           id="content"
//           name="content"
//           rows={4}
//           className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
//         />
//       </div>

//       {/* Thumbnail */}
//       <div>
//         <label className="block text-sm font-medium mb-1" htmlFor="thumbnail">
//           Thumbnail URL
//         </label>
//         <input
//           type="url"
//           id="thumbnail"
//           name="thumbnail"
//           className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
//         />
//       </div>

//       {/* Tags */}
//       <div>
//         <label className="block text-sm font-medium mb-1" htmlFor="tags">
//           Tags (comma separated)
//         </label>
//         <input
//           type="text"
//           id="tags"
//           name="tags"
//           placeholder="Next.js, React, Web Development"
//           className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-blue-200"
//         />
//       </div>

//       {/* Featured */}
//       <div>
//         <p className="block text-sm font-medium mb-1">Featured</p>
//         <div className="flex gap-6">
//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               name="isFeatured"
//               value="true"
//               checked={isFeatured === "true"}
//               onChange={(e) => setIsFeatured(e.target.value)}
//               className="text-blue-600 focus:ring-blue-500"
//             />
//             Yes
//           </label>
//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               name="isFeatured"
//               value="false"
//               checked={isFeatured === "false"}
//               onChange={(e) => setIsFeatured(e.target.value)}
//               className="text-blue-600 focus:ring-blue-500"
//             />
//             No
//           </label>
//         </div>
//       </div>

//       <button
//         type="submit"
//         className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
//       >
//         Submit
//       </button>
//     </Form>
//   );
// }

// "use client";

// import { useForm } from "react-hook-form";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function CreateBlogForm({ authorId }: { authorId: number }) {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   const onSubmit = async (data: any) => {
//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       setSuccess("Blog created successfully ✅");

//       setTimeout(() => {
//         reset();
//         router.push("/");
//       }, 1500);
//     } catch (err: any) {
//       setError("Failed to create blog ❌");
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

//         {/* Cover Image */}
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

//         {/* Submit */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full py-3 text-white font-semibold bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300 disabled:opacity-60"
//         >
//           {loading ? "Creating..." : "Create Blog"}
//         </button>

//         {/* Success / Error messages */}
//         {success && <p className="text-green-600 text-center">{success}</p>}
//         {error && <p className="text-red-600 text-center">{error}</p>}
//       </form>
//     </div>
//   );
// }

// "use client";

// import { useForm } from "react-hook-form";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { create } from "@/actions/create";

// export default function CreateBlogForm({ authorId }: { authorId: number }) {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   const onSubmit = async (data: any) => {
//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       // API call
//       const result = await create({ ...data, authorId });

//       if (result?.id) {
//         setSuccess("Blog created successfully ✅");
//         setTimeout(() => {
//           reset();
//           router.push("/blogs"); // blog list page
//         }, 1500);
//       } else {
//         setError("Failed to create blog ❌");
//       }
//     } catch (err: any) {
//       console.error(err);
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

//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Slug
//           </label>
//           <input
//             {...register("slug")}
//             className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             placeholder="unique-blog-slug"
//           />
//         </div>

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

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full py-3 text-white font-semibold bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300 disabled:opacity-60"
//         >
//           {loading ? "Creating..." : "Create Blog"}
//         </button>

//         {success && <p className="text-green-600 text-center">{success}</p>}
//         {error && <p className="text-red-600 text-center">{error}</p>}
//       </form>
//     </div>
//   );
// }

// "use client";

// import { useForm } from "react-hook-form";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { create } from "@/actions/create";

// export default function CreateBlogForm({ authorId }: { authorId: number }) {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   const onSubmit = async (data: any) => {
//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       const result = await create({
//         ...data,
//         authorId: authorId || 1,
//         tags: [],
//         isFeatured: false,
//       });

//       if (result?.id) {
//         setSuccess("✅ Blog created successfully!");
//         setTimeout(() => {
//           reset();
//           router.push("/blogs");
//         }, 1500);
//       } else {
//         setError("❌ Failed to create blog");
//       }
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
//             {...register("slug")}
//             className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             placeholder="unique-blog-slug"
//           />
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
import { create } from "@/actions/create";

interface BlogFormData {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  coverUrl?: string;
  published?: boolean;
}

export default function CreateBlogForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BlogFormData>();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: BlogFormData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await create(data);

      if (result?.id) {
        setSuccess("✅ Blog created successfully!");
        setTimeout(() => {
          reset();
          router.push("/blogs");
        }, 1500);
      } else {
        setError("❌ Failed to create blog");
      }
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
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            {...register("title", { required: true })}
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter blog title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">Title is required</p>
          )}
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Slug
          </label>
          <input
            {...register("slug", { required: true })}
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="unique-blog-slug"
          />
          {errors.slug && (
            <p className="text-red-500 text-sm">Slug is required</p>
          )}
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Excerpt
          </label>
          <textarea
            {...register("excerpt")}
            rows={2}
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Short summary about blog..."
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            {...register("content", { required: true })}
            rows={6}
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Write your blog content..."
          />
          {errors.content && (
            <p className="text-red-500 text-sm">Content is required</p>
          )}
        </div>

        {/* Cover URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Cover URL
          </label>
          <input
            {...register("coverUrl")}
            type="url"
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="https://example.com/cover.jpg"
          />
        </div>

        {/* Published */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("published")}
            className="w-4 h-4"
          />
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

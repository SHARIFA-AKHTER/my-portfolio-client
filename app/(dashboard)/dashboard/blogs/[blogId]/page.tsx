/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { deleteBlog, updateBlog } from "@/actions/blog";

// interface Blog {
//   id: number;
//   title: string;
//   slug: string;
//   content: string;
//   excerpt?: string;
//   coverUrl?: string;
//   published?: boolean;
// }

// export default function BlogEditPage() {
//   const router = useRouter();
//   const params = useParams();
//   const blogId = Number(params?.id);

//   const [blog, setBlog] = useState<Blog | null>(null);
//   const [title, setTitle] = useState("");
//   const [slug, setSlug] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(false);
//   const [deleting, setDeleting] = useState(false);

//   // ✅ Fetch single blog
// useEffect(() => {
//   if (!blogId) return;

//   const fetchBlog = async () => {
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${blogId}`);
//       const result = await res.json();

//       const blogData = result.blog || result;

//       setBlog(blogData);
//       setTitle(blogData.title || "");
//       setSlug(blogData.slug || "");
//     } catch (err) {
//       console.error("Error fetching blog:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchBlog();
// }, [blogId]);

// const handleUpdate = async (e: React.FormEvent) => {
//   e.preventDefault();
//   if (!blog) return;

//   setUpdating(true);
//   try {

//     const updatedPayload = {
//       title: title,
//       slug: slug,
//       content: blog.content,
//       excerpt: blog.excerpt,
//       coverUrl: blog.coverUrl,
//       published: blog.published
//     };

//     const result = await updateBlog(blog.id, updatedPayload);
//     alert(result.message || "Blog updated successfully!");
//     router.push("/dashboard/blog");
//     router.refresh();
//   } catch (err: any) {
//     alert(err.message || "Failed to update blog");
//   } finally {
//     setUpdating(false);
//   }
// };
//   // ✅ Delete handler
//   const handleDelete = async () => {
//     if (!blog) return;
//     if (!confirm("Are you sure you want to delete this blog?")) return;

//     setDeleting(true);
//     try {
//       const result = await deleteBlog(blog.id);
//       alert(result.message || "Blog deleted successfully!");
//       router.push("/dashboard/blog");

//     } catch (err: any) {
//       console.error("Delete Error:", err);
//       alert(err.message || "Failed to delete blog");
//     } finally {
//       setDeleting(false);
//     }
//   };

//   if (loading) return <p>Loading blog...</p>;
//   if (!blog) return <p>Blog not found</p>;

//   return (
//     <div className="p-6 max-w-xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Edit Blog #{blog.id}</h1>
//       <form onSubmit={handleUpdate} className="flex flex-col gap-4">
//         <label>
//           Title
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="border px-3 py-2 rounded w-full"
//             required
//           />
//         </label>
//         <label>
//           Slug
//           <input
//             type="text"
//             value={slug}
//             onChange={(e) => setSlug(e.target.value)}
//             className="border px-3 py-2 rounded w-full"
//             required
//           />
//         </label>

//         <div className="flex gap-2">
//           <button
//             type="submit"
//             disabled={updating}
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             {updating ? "Updating..." : "Update Blog"}
//           </button>
//           <button
//             type="button"
//             disabled={deleting}
//             onClick={handleDelete}
//             className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//           >
//             {deleting ? "Deleting..." : "Delete Blog"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { updateBlog } from "@/actions/blog";

export default function BlogEditPage() {
  const router = useRouter();
  const params = useParams();
  const blogId = Number(params.blogId);

  const [blog, setBlog] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!blogId || isNaN(blogId)) return;

    const fetchBlog = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/blogs/${blogId}`,
      );
      const result = await res.json();
      const blogData = result.success ? result.blog : result;

      setBlog(blogData);
      setTitle(blogData.title || "");
      setContent(blogData.content || "");
      setLoading(false);
    };

    fetchBlog();
  }, [blogId]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    const payload = {
      title,
      content,
      slug: blog.slug,
      excerpt: blog.excerpt || "",
      coverUrl: blog.coverUrl || "",
      published: true,
    };

    const result = await updateBlog(blogId, payload);
    if (result.success) {
      alert("Updated!");
      router.push("/dashboard/blogs");
      router.refresh();
    }

    setUpdating(false);
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!blog)
    return <p className="text-center py-10 text-red-500">Blog not found</p>;

  return (
    <form
      onSubmit={handleUpdate}
      className="p-6 max-w-3xl mx-auto space-y-6 sm:p-8 bg-white shadow-lg rounded-xl"
    >
      <h2 className="text-2xl font-bold text-center">Edit Blog #{blogId}</h2>

      <div className="flex flex-col gap-4">
        <label className="font-semibold">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
        />
      </div>

      <div className="flex flex-col gap-4">
        <label className="font-semibold">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full min-h-[200px] sm:min-h-[300px]"
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
          disabled={updating}
        >
          {updating ? "Updating..." : "Update"}
        </button>
      </div>
    </form>
  );
}

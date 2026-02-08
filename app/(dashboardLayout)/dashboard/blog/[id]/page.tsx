/* eslint-disable @typescript-eslint/no-unused-vars */
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

// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, useParams } from "next/navigation";
// import Cookies from "js-cookie";

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

//   // ✅ Fetch single blog (Client side fetch)
//   useEffect(() => {
//     if (!blogId) return;

//     const fetchBlog = async () => {
//       try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${blogId}`);
//         const result = await res.json();

//         // API response structure handle
//         const blogData = result.blog || result.data || result;

//         setBlog(blogData);
//         setTitle(blogData.title || "");
//         setSlug(blogData.slug || "");
//       } catch (err) {
//         console.error("Error fetching blog:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlog();
//   }, [blogId]);

//   const handleUpdate = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!blog) return;

//     setUpdating(true);
//     try {
//       const token = Cookies.get("token") || localStorage.getItem("token");
//       if (!token) {
//         alert("You must login to update");
//         return;
//       }

//       const updatedPayload = {
//         title: title,
//         slug: slug,
//         content: blog.content,
//         excerpt: blog.excerpt,
//         coverUrl: blog.coverUrl,
//         published: blog.published
//       };

//       const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${blog.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify(updatedPayload),
//       });

//       const result = await res.json();

//       if (res.ok) {
//         alert(result.message || "Blog updated successfully!");
//         router.push("/dashboard/blog");
//         router.refresh();
//       } else {
//         alert(result.message || "Failed to update blog");
//       }
//     } catch (err: any) {
//       alert("Error updating blog");
//     } finally {
//       setUpdating(false);
//     }
//   };

//   // ✅ Delete handler (Direct fetch)
// const handleDelete = async () => {
//   if (!blog) return;
//   if (!confirm("Are you sure you want to delete this blog?")) return;

//   setDeleting(true);
//   try {
//     const token = Cookies.get("token") || localStorage.getItem("token");

//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${blog.id}`, {
//       method: "DELETE",
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     if (res.ok) {
//       alert("Blog deleted successfully!");
//       router.push("/dashboard/blog");
//     } else {
//       const result = await res.json();
//       alert(result.message || "Failed to delete blog");
//     }
//   } catch (err: any) {
//     alert("Failed to delete blog");
//   } finally {
//     setDeleting(false);
//   }
// };

//   if (loading) return <p className="p-10 text-center">Loading blog data...</p>;
//   if (!blog) return <p className="p-10 text-center text-red-500">Blog not found</p>;

//   return (
// <div className="p-6 max-w-xl mx-auto">
//   <h1 className="text-2xl font-bold mb-6 border-b pb-2">Edit Blog Post</h1>
//   <form onSubmit={handleUpdate} className="flex flex-col gap-5">
//     <div className="flex flex-col gap-2">
//       <label className="font-semibold text-sm">Blog Title</label>
//       <input
//         type="text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         className="border px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none"
//         placeholder="Enter blog title"
//         required
//       />
//     </div>

//     <div className="flex flex-col gap-2">
//       <label className="font-semibold text-sm">URL Slug</label>
//       <input
//         type="text"
//         value={slug}
//         onChange={(e) => setSlug(e.target.value)}
//         className="border px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none"
//         placeholder="url-slug-example"
//         required
//       />
//     </div>

//     <div className="flex gap-3 pt-4">
//       <button
//         type="submit"
//         disabled={updating}
//         className="flex-1 bg-blue-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-blue-700 disabled:bg-blue-300 transition-all"
//       >
//         {updating ? "Saving Changes..." : "Update Blog"}
//       </button>

//       <button
//         type="button"
//         disabled={deleting}
//         onClick={handleDelete}
//         className="px-4 py-2.5 bg-red-50 text-red-600 border border-red-200 rounded-lg font-medium hover:bg-red-600 hover:text-white disabled:opacity-50 transition-all"
//       >
//         {deleting ? "Deleting..." : "Delete"}
//       </button>
//     </div>
//   </form>
// </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { updateBlogAction } from "./updateBlogAction";


export default function BlogEditPage() {
  const router = useRouter();
  const params = useParams();
  const blogId = params?.id;

  const [blog, setBlog] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!blogId) return;
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${blogId}`);
        const result = await res.json();
        
        // Postman array response handling
        const blogData = Array.isArray(result) 
          ? result.find((b: any) => b.id == blogId) 
          : (result.blog || result);

        if (blogData) {
          setBlog(blogData);
          setTitle(blogData.title || "");
          setSlug(blogData.slug || "");
          setContent(blogData.content || "");
          setExcerpt(blogData.excerpt || "");
          setCoverUrl(blogData.coverUrl || "");
        }
      } catch (err) {
        console.error("Fetch error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [blogId]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blog) return;

    setUpdating(true);
    try {
      const res = await updateBlogAction({
        id: blog.id,
        title,
        content,
        slug, 
        excerpt,
        coverUrl
      });

      const result = await res.json();

      if (res.ok || result.success) {
        alert("Success: Blog updated following schema!");
        router.push("/dashboard/blog");
        router.refresh();
      } else {
        alert(result.message || "Update failed. Check if slug is unique.");
      }
    } catch (err) {
      alert("Error updating blog");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <p className="p-10 text-center font-bold text-blue-600">Loading Blog Schema Data...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-2xl rounded-2xl mt-10 border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Edit Blog Post</h2>
      
      <form onSubmit={handleUpdate} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2 rounded-lg" required />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">Slug (@unique)</label>
            <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} className="border p-2 rounded-lg bg-gray-50" required />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold">Cover URL</label>
          <input type="text" value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} className="border p-2 rounded-lg" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold">Excerpt (Optional)</label>
          <input type="text" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className="border p-2 rounded-lg" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold">Content</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} className="border p-2 rounded-lg h-48" required />
        </div>

        <button type="submit" disabled={updating} className="bg-indigo-600 text-white p-3 rounded-xl font-bold hover:bg-indigo-700 transition disabled:bg-gray-400">
          {updating ? "Processing Schema Update..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
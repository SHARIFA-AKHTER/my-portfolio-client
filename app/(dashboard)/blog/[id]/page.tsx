

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
export const dynamic = "force-dynamic";
export const dynamicParams = true;


import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { updateBlog } from "@/actions/blog";


export default function BlogEditPage() {
  const router = useRouter();
  const params = useParams();
  const blogId = Number(params?.id);

  const [blog, setBlog] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!blogId) return;

    const fetchBlog = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${blogId}`);
        const result = await res.json();

        const blogData = result.success ? result.blog : result;

        if (blogData) {
          setBlog(blogData);
          setTitle(blogData.title || "");
          setContent(blogData.content || "");
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  // const handleUpdate = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!blogId) return;

  //   setUpdating(true);
  //   try {
  //     const payload = {
  //       title,
  //       content,
  //       slug: blog.slug,
  //     };

  //     const result = await updateBlog(blogId, payload);

  //     if (result) {
  //       alert("Success: Blog updated using Server Action!");
  //       router.push("/dashboard/blog");
  //     }
  //   } catch (err: any) {
  //     alert(err.message || "Update failed");
  //   } finally {
  //     setUpdating(false);
  //   }
  // };

  const handleUpdate = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!blogId || !blog) return;

  setUpdating(true);
  try {

    const payload = {
      title: title,
      content: content,
      slug: blog.slug,
      excerpt: blog.excerpt || "",
      coverUrl: blog.coverUrl || "",
    };

    const result = await updateBlog(blogId, payload);

    if (result.success) {
      alert(result.message); // "Blog updated successfully"
      router.push("/blog");
      router.refresh();
    }
  } catch (err: any) {
    alert("Update Error: " + err.message);
  } finally {
    setUpdating(false);
  }
};

  if (loading) return <div className="p-10 text-center font-bold">Loading...</div>;
  if (!blog) return <div className="p-10 text-center text-red-500">Blog not found!</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-2xl mt-10 border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Blog #{blogId}</h2>

      <form onSubmit={handleUpdate} className="flex flex-col gap-5">
        <div>
          <label className="block text-sm font-bold mb-1">Blog Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-3 w-full rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-1">Blog Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border p-3 w-full h-72 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Write your content..."
            required
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={updating}
            className="flex-1 bg-blue-600 text-white p-3.5 rounded-xl font-bold hover:bg-blue-700 disabled:bg-gray-400 transition-all shadow-md"
          >
            {updating ? "Saving Changes..." : "Update Blog"}
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 bg-gray-100 text-gray-600 rounded-xl font-semibold hover:bg-gray-200 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
 }

// "use client";
// export const dynamic = "force-dynamic";
// export const dynamicParams = true;

// import { use, useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { updateBlog } from "@/actions/blog";


// export default function BlogEditPage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const resolvedParams = use(params);
//   const blogId = resolvedParams.id;

//   const router = useRouter();
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [blogData, setBlogData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_BASE_API}/blog/${blogId}?v=${Date.now()}`,
//           {
//             cache: "no-store",
//           },
//         );
//         const result = await res.json();

//         const data = result.success ? result.blog : result;
//         if (data) {
//           setBlogData(data);
//           setTitle(data.title || "");
//           setContent(data.content || "");
//         }
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
//     if (!blogData) return;

//     try {
//       const payload = {
//         title,
//         content,
//         slug: blogData.slug,
//         excerpt: blogData.excerpt,
//         coverUrl: blogData.coverUrl,
//       };

//       const res = await updateBlog(Number(blogId), payload);

//       if (res && res.success) {
//         alert("Success: Blog updated successfully!");
//         router.push("/dashboard/blog");
//         router.refresh();
//       }
//     } catch (err) {
//       alert("Update failed!");
//     }
//   };

//   if (loading)
//     return <p className="p-10 text-center font-bold">Loading blog data...</p>;

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Edit Blog Post #{blogId}</h1>
//       <form onSubmit={handleUpdate} className="space-y-4">
//         <input
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="border p-3 w-full rounded shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <textarea
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           className="border p-3 w-full h-72 rounded shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold"
//         >
//           Update Blog
//         </button>
//       </form>
//     </div>
//   );
// }

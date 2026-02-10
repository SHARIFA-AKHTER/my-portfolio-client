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
//     router.push("/dashboard/blogs");
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
//       router.push("/dashboard/blogs");

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
export const dynamic = "force-dynamic";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { updateBlog } from "@/actions/blog";

export default function BlogEditPage({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const router = useRouter();

  const resolvedParams = use(params);
  const blogIdParam = resolvedParams.blogId;

  const [blog, setBlog] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // useEffect(() => {
  //   if (!blogIdParam) return;

  //   const fetchBlog = async () => {
  //     try {
  //       const res = await fetch(
  //         `${process.env.NEXT_PUBLIC_BASE_API}/blog/${blogIdParam}`,
  //         {
  //           cache: "no-store",
  //         },
  //       );

  //       const data = await res.json();

  //       if (data.success && data.blog) {
  //         setBlog(data.blog);
  //         setTitle(data.blog.title || "");
  //         setContent(data.blog.content || "");
  //       } else {
  //         throw new Error("Blog data missing in response");
  //       }
  //     } catch (err) {
  //       console.error("Fetch blog error:", err);
  //       setBlog(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchBlog();
  // }, [blogIdParam]);

  useEffect(() => {
    if (!blogIdParam) return;

    const fetchBlog = async () => {
      try {
   
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/blog/${blogIdParam}`,
          {
            cache: "no-store",
          },
        );

        const data = await res.json();

        if (data.success && data.blog) {
          setBlog(data.blog);
          setTitle(data.blog.title || "");
          setContent(data.blog.content || "");
        } else if (data.id) {
 
          setBlog(data);
          setTitle(data.title || "");
          setContent(data.content || "");
        } else {
          throw new Error("Blog not found");
        }
      } catch (err) {
        console.error("Fetch blog error:", err);
        setBlog(null); 
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogIdParam]);
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blog) return;

    setUpdating(true);
    try {
      const identifier = blog.id || blogIdParam;
      const payload = { title, content };

      const result = await updateBlog(identifier, payload);

      if (result) {
        alert("✅ Updated successfully!");
        router.push("/dashboard/manage-blogs");
        router.refresh();
      }
    } catch (err: any) {
      console.error("Update error:", err);
      alert(err.message || "Failed to update blog");
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return (
      <p className="text-center py-10 text-gray-500 italic">
        Loading blog data...
      </p>
    );
  if (!blog)
    return (
      <p className="text-center py-10 text-red-500">
        ❌ Blog not found! (ID: {blogIdParam})
      </p>
    );

  return (
    <form
      className="p-6 max-w-3xl mx-auto space-y-6 bg-white shadow-lg rounded-xl"
      onSubmit={handleUpdate}
    >
      <h2 className="text-2xl font-bold text-center border-b pb-4">
        Edit Blog:{" "}
        <span className="text-blue-600">#{blog.id ?? blogIdParam}</span>
      </h2>
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-gray-700">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 w-full"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-gray-700">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 w-full min-h-62.5"
          required
        />
      </div>
      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 border rounded-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
          disabled={updating}
        >
          {updating ? "Saving..." : "Update Blog"}
        </button>
      </div>
    </form>
  );
}

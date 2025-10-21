/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { deleteBlog, updateBlog } from "@/actions/blog";

interface Blog {
  id: number;
  title: string;
  slug: string;
}

export default function BlogEditPage() {
  const router = useRouter();
  const params = useParams();
  const blogId = Number(params?.id);

  const [blog, setBlog] = useState<Blog | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // ✅ Fetch single blog
  useEffect(() => {
    if (!blogId) return;

    const fetchBlog = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/blog/${blogId}`
        );
        const data = await res.json();
        setBlog(data);
        setTitle(data.title);
        setSlug(data.slug);
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  // ✅ Update handler
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blog) return;

    setUpdating(true);
    try {
      const result = await updateBlog(blog.id, { title, slug });
      alert(result.message || "Blog updated successfully!");
      router.push("/dashboard/blogs");
    } catch (err: any) {
      console.error("Update Error:", err);
      alert(err.message || "Failed to update blog");
    } finally {
      setUpdating(false);
    }
  };

  // ✅ Delete handler
  const handleDelete = async () => {
    if (!blog) return;
    if (!confirm("Are you sure you want to delete this blog?")) return;

    setDeleting(true);
    try {
      const result = await deleteBlog(blog.id);
      alert(result.message || "Blog deleted successfully!");
      router.push("/dashboard/blogs");
    } catch (err: any) {
      console.error("Delete Error:", err);
      alert(err.message || "Failed to delete blog");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <p>Loading blog...</p>;
  if (!blog) return <p>Blog not found</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Blog #{blog.id}</h1>
      <form onSubmit={handleUpdate} className="flex flex-col gap-4">
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border px-3 py-2 rounded w-full"
            required
          />
        </label>
        <label>
          Slug
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="border px-3 py-2 rounded w-full"
            required
          />
        </label>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={updating}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {updating ? "Updating..." : "Update Blog"}
          </button>
          <button
            type="button"
            disabled={deleting}
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            {deleting ? "Deleting..." : "Delete Blog"}
          </button>
        </div>
      </form>
    </div>
  );
}

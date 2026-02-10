/* eslint-disable @typescript-eslint/no-explicit-any */
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

  useEffect(() => {
    if (!blogIdParam) return;

    const fetchBlog = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/blog/${blogIdParam}`,
          {
            cache: "no-store",
          }
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
      <div className="flex justify-center items-center min-h-100">
        <p className="text-gray-500 dark:text-gray-400 italic animate-pulse">
          Loading blog data...
        </p>
      </div>
    );

  if (!blog)
    return (
      <div className="flex justify-center items-center min-h-100">
        <p className="text-red-500 font-medium bg-red-50 dark:bg-red-900/10 px-6 py-3 rounded-xl border border-red-100 dark:border-red-900/20">
          ❌ Blog not found! (ID: {blogIdParam})
        </p>
      </div>
    );

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gray-50/30 dark:bg-transparent">
      <form
        className="p-8 max-w-3xl mx-auto space-y-8 bg-white dark:bg-slate-900 shadow-2xl shadow-slate-200/50 dark:shadow-none rounded-[2rem] border border-slate-100 dark:border-slate-800 transition-colors duration-300"
        onSubmit={handleUpdate}
      >
        <div className="space-y-2 text-center border-b dark:border-slate-800 pb-6">
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Edit Blog
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-mono">
            ID: <span className="text-pink-500 font-bold">#{blog.id ?? blogIdParam}</span>
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-2xl p-4 focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 transition-all outline-none font-medium"
              placeholder="Enter blog title..."
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-2xl p-4 focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 transition-all outline-none min-h-[300px] font-medium resize-none"
              placeholder="Write your content here..."
              required
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-8 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold transition-all active:scale-95"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-linear-to-r from-pink-500 to-rose-600 text-white rounded-2xl font-bold shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
            disabled={updating}
          >
            {updating ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Saving...
              </span>
            ) : (
              "Update Blog"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
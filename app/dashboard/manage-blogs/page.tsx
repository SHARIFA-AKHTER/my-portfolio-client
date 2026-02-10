"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Edit, Trash2, Plus } from "lucide-react";

interface Blog {
  id: number;
  slug: string;
  title: string;
}

export default function DashboardBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
          cache: "no-store",
        });
        const data = await res.json();
        const blogList = Array.isArray(data) ? data : (data.data || data.blogs || []);
        setBlogs(blogList);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      if (res.ok) {
        setBlogs((prev) => prev.filter((b) => b.id !== id));
        alert("✅ Deleted successfully!");
      } else {
        alert("❌ Failed to delete");
      }
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <p className="text-gray-500 dark:text-gray-400 animate-pulse text-lg font-medium">Loading blogs...</p>
    </div>
  );

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-50/50 dark:bg-transparent transition-colors duration-300">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Manage Blogs
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Total {blogs.length} blogs published
          </p>
        </div>
        <Link 
          href="/dashboard/create-blog" 
          className="w-full sm:w-auto bg-linear-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white px-6 py-3 rounded-2xl shadow-lg shadow-pink-500/20 transition-all active:scale-95 flex items-center justify-center gap-2 font-bold"
        >
          <Plus size={18} /> Create New
        </Link>
      </div>

      {/* Desktop & Tablet Table View (Visible on sm and up) */}
      <div className="hidden sm:block overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 rounded-[2rem] bg-white dark:bg-slate-900 transition-all">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
            <thead className="bg-slate-50/50 dark:bg-slate-800/50">
              <tr>
                <th className="px-6 py-5 text-left text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">ID</th>
                <th className="px-6 py-5 text-left text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Title</th>
                <th className="px-6 py-5 text-left text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Slug</th>
                <th className="px-6 py-5 text-right text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 transition-all">
              {blogs.length > 0 ? (
                blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                    <td className="px-6 py-5 text-sm text-slate-500 dark:text-slate-500 font-mono">#{blog.id}</td>
                    <td className="px-6 py-5 text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-pink-500 transition-colors">
                      {blog.title}
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-400 dark:text-slate-500 font-mono italic">
                      {blog.slug}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/dashboard/manage-blogs/${blog.id}`}
                          className="p-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all border border-blue-100 dark:border-blue-900/30"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="p-2.5 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-xl hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-all border border-rose-100 dark:border-rose-900/30"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center text-slate-400 dark:text-slate-500 italic">
                    No blogs found. Start by creating one!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View (Visible only on xs) */}
      <div className="sm:hidden space-y-4">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div 
              key={blog.id} 
              className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all active:scale-[0.98]"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-black text-pink-500 uppercase tracking-widest bg-pink-50 dark:bg-pink-900/20 px-2 py-1 rounded-md">
                  #{blog.id}
                </span>
                <div className="flex gap-2">
                   <Link
                    href={`/dashboard/manage-blogs/${blog.id}`}
                    className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg border border-blue-100 dark:border-blue-900/30"
                  >
                    <Edit size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="p-2 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-lg border border-rose-100 dark:border-rose-900/30"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1 leading-tight">
                {blog.title}
              </h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-mono truncate">
                {blog.slug}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center py-20 text-slate-400 italic">
            No blogs found.
          </div>
        )}
      </div>
    </div>
  );
}
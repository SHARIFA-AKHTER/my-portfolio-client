"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Edit, Trash2 } from "lucide-react";

interface Blog {
  id: number;
  title: string;
  slug: string;
}

export default function DashboardBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
          setBlogs(Array.isArray(data) ? data : data.data ?? []);
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id: number) => {
    
    router.push(`/dashboard/blogs/${id}`);

    // 👇 Optional: if you want to delete directly after navigation confirmation
    // if (!confirm("Are you sure you want to delete this blog?")) return;

    // try {
    //   const token = localStorage.getItem("accessToken");
    //   if (!token) {
    //     alert("No token found! Please login again.");
    //     return;
    //   }

    //   const res = await fetch(
    //     `${process.env.NEXT_PUBLIC_BASE_API}/blog/${id}`,
    //     {
    //       method: "DELETE",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   );

    //   if (res.ok) {
    //     setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    //     alert("✅ Blog deleted successfully!");
    //   } else if (res.status === 401) {
    //     const text = await res.text();
    //     console.warn("Unauthorized:", text);
    //     alert("❌ Unauthorized! Please log in again.");
    //   } else {
    //     const errorText = await res.text();
    //     console.error("Delete failed:", errorText);
    //     alert("⚠️ Failed to delete blog");
    //   }
    // } catch (err) {
    //   console.error("Error deleting blog:", err);
    //   alert("Error deleting blog");
    // }
  };

  if (loading) return <p>Loading blogs...</p>;

  return (
    <div className="p-6 flex-1">
      <h1 className="text-3xl font-bold mb-6">📝 Manage Blogs</h1>

      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <table className="w-full table-auto border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Slug</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{blog.id}</td>
                <td className="px-4 py-2 border">{blog.title}</td>
                <td className="px-4 py-2 border">{blog.slug}</td>
                <td className="px-4 py-2 border flex gap-2">
                  {/* ✏️ Edit button */}
                  <Link
                    href={`/dashboard/blogs/${blog.id}`}
                    className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </Link>

                  {/* 🗑️ Delete button that redirects to ID page */}
                  <button
                    className="flex items-center gap-1 px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={() => handleDelete(blog.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

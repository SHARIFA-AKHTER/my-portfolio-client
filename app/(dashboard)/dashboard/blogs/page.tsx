// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { Edit, Trash2 } from "lucide-react";

// interface Blog {
//   id: number;
//   title: string;
//   slug: string;
// }

// export default function DashboardBlogsPage() {
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
//           cache: "no-store",
//         });
//         if (res.ok) {
//           const data = await res.json();
//           setBlogs(Array.isArray(data) ? data : (data.data ?? []));
//         }
//       } catch (err) {
//         console.error("Error fetching blogs:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlogs();
//   }, []);

//   const handleDelete = async (id: number) => {
//     if (!confirm("Are you sure you want to delete this blog?")) return;

//     try {
//       const token = localStorage.getItem("token");
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_BASE_API}/blog/${id}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       if (res.ok) {
//         setBlogs((prev) => prev.filter((blog) => blog.id !== id));
//         alert("Blog deleted successfully!");
//       } else {
//         alert("Failed to delete blog");
//       }
//     } catch (err) {
//       console.error("Delete Error:", err);
//     }
//   };
//   if (loading) return <p>Loading blogs...</p>;

//   return (
//     <div className="p-6 flex-1">
//       <h1 className="text-3xl font-bold mb-6">📝 Manage Blogs</h1>

//       {blogs.length === 0 ? (
//         <p>No blogs found.</p>
//       ) : (
//         <table className="w-full table-auto border border-gray-300">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="px-4 py-2 border">ID</th>
//               <th className="px-4 py-2 border">Title</th>
//               <th className="px-4 py-2 border">Slug</th>
//               <th className="px-4 py-2 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {blogs.map((blog) => (
//               <tr key={blog.id} className="hover:bg-gray-100">
//                 <td className="px-4 py-2 border">{blog.id}</td>
//                 <td className="px-4 py-2 border">{blog.title}</td>
//                 <td className="px-4 py-2 border">{blog.slug}</td>
//                 <td className="px-4 py-2 border flex gap-2">
//                   {/* ✏️ Edit button */}
//                   <Link
//                     href={`/dashboard/blogs/${blog.id}`}
//                     className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
//                   >
//                     <Edit className="h-4 w-4" />
//                     Edit
//                   </Link>

//                   {/* 🗑️ Delete button that redirects to ID page */}
//                   <button
//                     className="flex items-center gap-1 px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
//                     onClick={() => handleDelete(blog.id)}
//                   >
//                     <Trash2 className="h-4 w-4" />
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { Edit, Trash2 } from "lucide-react";

// interface Blog {
//   id: number;
//   title: string;
//   slug: string;
// }

// export default function DashboardBlogsPage() {
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
//           cache: "no-store",
//         });
//         const data = await res.json();
//         setBlogs(Array.isArray(data) ? data : data.data ?? []);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBlogs();
//   }, []);

//   const handleDelete = async (id: number) => {
//     if (!confirm("Delete this blog?")) return;
//     const token = localStorage.getItem("token");
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${id}`, {
//       method: "DELETE",
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     if (res.ok) {
//       setBlogs((prev) => prev.filter((b) => b.id !== id));
//       alert("Deleted!");
//     }
//   };

//   if (loading)
//     return <p className="text-center py-10 text-gray-500">Loading...</p>;

//   return (
//     <div className="p-4 sm:p-6">
//       <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">
//         Manage Blogs
//       </h1>

//       <div className="overflow-x-auto shadow rounded-lg">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
//                 ID
//               </th>
//               <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
//                 Title
//               </th>
//               <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
//                 Slug
//               </th>
//               <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {blogs.map((blog) => (
//               <tr key={blog.id} className="hover:bg-gray-50">
//                 <td className="px-4 py-2 text-sm">{blog.id}</td>
//                 <td className="px-4 py-2 text-sm font-medium">{blog.title}</td>
//                 <td className="px-4 py-2 text-sm font-mono">{blog.slug}</td>
//                 <td className="px-4 py-2 flex flex-wrap gap-2">
//                   <Link
//                     href={`/dashboard/blogs/${blog.id}`}
//                     className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//                   >
//                     <Edit size={16} /> Edit
//                   </Link>
//                   <button
//                     onClick={() => handleDelete(blog.id)}
//                     className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
//                   >
//                     <Trash2 size={16} /> Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Edit, Trash2 } from "lucide-react";

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

  if (loading) return <p className="text-center py-10 text-gray-500 animate-pulse">Loading blogs...</p>;

  return (
    <div className="p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Blogs</h1>
        <Link 
          href="/dashboard/dashboard/create-blog" 
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          + Create New
        </Link>
      </div>

      <div className="overflow-x-auto shadow-md border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Title</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Slug</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-4 text-sm text-gray-600">{blog.id}</td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">{blog.title}</td>
                  <td className="px-4 py-4 text-sm text-gray-500 font-mono">{blog.slug}</td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex justify-end gap-3">
                      
                      <Link
                        href={`/dashboard/blogs/${blog.id}`}
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition"
                      >
                        <Edit size={14} /> Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-gray-400">No blogs found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
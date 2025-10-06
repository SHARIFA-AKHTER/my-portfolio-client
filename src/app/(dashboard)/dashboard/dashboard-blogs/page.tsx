// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";

// export default function DashboardBlogs() {
//   const { data: session } = useSession();
//   const [blogs, setBlogs] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   const BASE_URL = process.env.PUBLIC_PORTFOLIO_BASE_API;

//   // Fetch all blogs
//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/blog`);
//         const data = await res.json();
//         setBlogs(data);
//       } catch (err) {
//         console.error("Error fetching blogs:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBlogs();
//   }, [BASE_URL]);

//   // Delete a blog
//   const handleDelete = async (id: number) => {
//     if (!confirm("Are you sure you want to delete this blog?")) return;

//     try {
//       const res = await fetch(`${BASE_URL}/blog/${id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${session?.user?.accessToken}`,
//         },
//       });

//       if (res.ok) {
//         setBlogs((prev) => prev.filter((b) => b.id !== id));
//         alert("Blog deleted successfully ✅");
//       } else {
//         alert("Failed to delete ❌");
//       }
//     } catch (error) {
//       console.error("Delete Error:", error);
//     }
//   };

//   if (!session) {
//     return (
//       <div className="text-center mt-20 text-red-500">
//         Please log in first 🔒
//       </div>
//     );
//   }

//   if (session?.user?.role !== "ADMIN") {
//     return (
//       <div className="text-center mt-20 text-red-500">Admin Access Only 🚫</div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6 text-center">🗂 Manage Blogs</h1>

//       {loading ? (
//         <p className="text-center text-gray-500">Loading blogs...</p>
//       ) : blogs.length === 0 ? (
//         <p className="text-center text-gray-500">No blogs found 😢</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {blogs.map((blog) => (
//             <div
//               key={blog.id}
//               className="bg-white shadow-md rounded-xl p-5 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
//             >
//               <div>
//                 <h2 className="font-semibold text-xl mb-2 text-gray-800">
//                   {blog.title}
//                 </h2>
//                 <p className="text-gray-600 line-clamp-3 mb-3">
//                   {blog.excerpt || "No excerpt provided."}
//                 </p>
//               </div>

//               <div className="flex justify-between items-center mt-auto">
//                 <a
//                   href={`/dashboard/blogs/${blog.id}`}
//                   className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
//                 >
//                   Edit
//                 </a>
//                 <button
//                   onClick={() => handleDelete(blog.id)}
//                   className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import React from "react";

const page = () => {
  return (
    <div>
      <h1>hello dashboard-blog</h1>
    </div>
  );
};

export default page;

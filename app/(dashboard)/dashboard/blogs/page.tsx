// "use client";

// import Link from "next/link";
// import { useRouter } from "next/navigation";
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
//   const router = useRouter();

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
//           cache: "no-store",
//         });
//         if (res.ok) {
//           const data = await res.json();
//           setBlogs(Array.isArray(data) ? data : data.data ?? []);
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
    
//     router.push(`/dashboard/blogs/${id}`);

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


"use client";

import { useEffect, useState } from "react";
import DeleteEditActions from "./DeleteEditActions";

interface Blog {
  id: number;
  title: string;
  slug: string;
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
                <td className="px-4 py-2 border">
                  <DeleteEditActions
                    blog={blog}
                    onDeleted={() =>
                      setBlogs(blogs.filter((b) => b.id !== blog.id))
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

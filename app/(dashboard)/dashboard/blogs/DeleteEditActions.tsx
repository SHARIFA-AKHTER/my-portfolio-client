// "use client";

// import Link from "next/link";
// import { Trash2, Edit } from "lucide-react";
// import { useState } from "react";

// interface Blog {
//   id: number;
//   title: string;
//   slug: string;
// }

// export default function DeleteEditActions({ blog }: { blog: Blog }) {
//   const [deleted, setDeleted] = useState(false);

//   const handleDelete = async () => {
//     if (!confirm("Are you sure you want to delete this blog?")) return;

//     try {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_BASE_API}/blog/${blog.id}`,
//         {
//           method: "DELETE",
//         }
//       );
//       if (res.ok) setDeleted(true);
//       else alert("Failed to delete blog");
//     } catch (err) {
//       console.error(err);
//       alert("Error deleting blog");
//     }
//   };

//   if (deleted) return <span className="text-red-500">Deleted</span>;

//   return (
//     <div className="flex flex-wrap gap-2">
//       <Link
//         href={`/dashboard/blogs/${blog.id}`}
//         className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm sm:text-base"
//       >
//         <Edit className="h-4 w-4" /> Edit
//       </Link>
//       <button
//         onClick={handleDelete}
//         className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm sm:text-base"
//       >
//         <Trash2 className="h-4 w-4" /> Delete
//       </button>
//     </div>
//   );
// }

// "use client";

// import Link from "next/link";
// import { Trash2, Edit } from "lucide-react";

// interface Blog {
//   id: number;
//   title: string;
//   slug: string;
// }

// interface Props {
//   blog: Blog;
//   onDeleted: () => void;
// }

// export default function DeleteEditActions({ blog, onDeleted }: Props) {
//   const handleDelete = async () => {
//     if (!confirm("Are you sure you want to delete this blog?")) return;

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return alert("You must login to delete");

//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_BASE_API}/blog/${blog.id}`,
//         {
//           method: "DELETE",
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (res.ok) {
//         alert("Blog deleted successfully!");
//         onDeleted();
//       } else {
//         alert("Failed to delete blog");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error deleting blog");
//     }
//   };

//   return (
//     <div className="flex flex-wrap gap-2">
//       <Link
//         href={`/dashboard/blogs/${blog.id}`}
//         className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm sm:text-base"
//       >
//         <Edit className="h-4 w-4" /> Edit
//       </Link>
//       <button
//         onClick={handleDelete}
//         className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm sm:text-base"
//       >
//         <Trash2 className="h-4 w-4" /> Delete
//       </button>
//     </div>
//   );
// }


"use client";

import Link from "next/link";
import { Trash2, Edit } from "lucide-react";

interface Blog {
  id: number;
  title: string;
  slug: string;
}

interface Props {
  blog: Blog;
  onDeleted: () => void;
}

export default function DeleteEditActions({ blog, onDeleted }: Props) {
  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${blog.title}"?`)) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("You must login to delete");

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${blog.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        alert(data.message || "Blog deleted successfully!");
        onDeleted();
      } else {
        alert(data.message || "Failed to delete blog");
      }
    } catch (err) {
      console.error("❌ Error deleting blog:", err);
      alert("Error deleting blog");
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href={`/dashboard/blogs/${blog.id}`}
        className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm sm:text-base"
      >
        <Edit className="h-4 w-4" /> Edit
      </Link>
      <button
        onClick={handleDelete}
        className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm sm:text-base"
      >
        <Trash2 className="h-4 w-4" /> Delete
      </button>
    </div>
  );
}

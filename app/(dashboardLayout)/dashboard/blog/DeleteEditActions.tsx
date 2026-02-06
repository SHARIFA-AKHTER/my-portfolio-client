/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import Link from "next/link";
import { Trash2, Edit } from "lucide-react";
import Cookies from "js-cookie"; 

interface Blog {
  id: number;
  title: string;
}

interface Props {
  blog: Blog;
  onDeleted: () => void;
}

export default function DeleteEditActions({ blog, onDeleted }: Props) {
  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${blog.title}"?`)) return;

    try {

      const token = Cookies.get("token") || localStorage.getItem("token");
      
      if (!token) return alert("You must login to delete");

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${blog.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        alert("Blog deleted successfully!");
        onDeleted();
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Failed to delete blog");
      }
    } catch (err) {
      alert("Error deleting blog");
    }
  };

  return (
    <div className="flex gap-2">
      <Link
        href={`/dashboard/blog/${blog.id}`}
        className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        <Edit className="h-4 w-4" /> Edit
      </Link>
      <button
        onClick={handleDelete}
        className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
      >
        <Trash2 className="h-4 w-4" /> Delete
      </button>
    </div>
  );
}

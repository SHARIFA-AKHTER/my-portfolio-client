/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import Link from "next/link";
import { Trash2, Edit } from "lucide-react";
import { deleteBlog } from "@/actions/blog";

interface Blog {
  id: number;
  title: string;
}

export default function DeleteEditActions({ blog, onDeleted }: { blog: Blog; onDeleted: () => void }) {
  const handleDelete = async () => {
    if (!confirm(`Delete "${blog.title}"?`)) return;

    try {
      const result = await deleteBlog(blog.id);

      if (result.success) {
        alert("Deleted!");
        onDeleted();
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="flex gap-2">
      <Link
        href={`/dashboard/blogs/${blog.id}`}
        className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded"
      >
        <Edit size={16} /> Edit
      </Link>

      <button
        onClick={handleDelete}
        className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded"
      >
        <Trash2 size={16} /> Delete
      </button>
    </div>
  );
}

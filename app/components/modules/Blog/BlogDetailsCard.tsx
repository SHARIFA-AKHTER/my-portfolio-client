/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { incrementBlogView } from "@/actions/blog";

export default function BlogDetailsCard({ blog }: { blog: any }) {
  const [views, setViews] = useState(blog.views ?? 0);

  useEffect(() => {
    const updateViews = async () => {
      const updatedBlog = await incrementBlogView(blog.id);
      if (updatedBlog) {
        setViews(updatedBlog.views);
      }
    };
    updateViews();
  }, [blog.id]);

  if (!blog)
    return (
      <div className="py-20 text-center text-gray-500">Blog not found.</div>
    );

  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">{blog.title}</h1>

      <div className="flex items-center gap-4 mb-8">
        <Image
          src={
            blog.author?.picture ??
            "https://cdn-icons-png.flaticon.com/512/9385/9385289.png"
          }
          alt={blog.author?.name ?? "Author"}
          width={48}
          height={48}
          className="rounded-full"
        />
        <div>
          <p className="font-semibold">
            {blog.author?.name ?? "Unknown Author"}{" "}
            {blog.author?.isVerified && (
              <span className="text-blue-500">✔</span>
            )}
          </p>
          <p className="text-gray-500 text-sm">
            {blog.createdAt
              ? new Date(blog.createdAt).toLocaleDateString()
              : "-"}{" "}
            • {views} views
          </p>
        </div>
      </div>

      {blog.coverUrl && (
        <div className="relative h-80 w-full overflow-hidden mb-6">
          <Image
            src={blog.coverUrl}
            alt={blog.title}
            fill
            className="rounded-lg object-cover shadow-md"
          />
        </div>
      )}

      <article className="prose prose-lg max-w-none">
        <p>{blog.content}</p>
      </article>
    </main>
  );
}

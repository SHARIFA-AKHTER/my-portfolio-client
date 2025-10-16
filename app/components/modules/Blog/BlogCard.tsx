/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from "next/link";
import Image from "next/image";

export default function BlogCard({ post }: { post: any }) {
  const blogLink = `/blogs/${post.slug || post.id}`;

  return (
    <Link
      href={blogLink}
      className="block group transform hover:-translate-y-1 transition-transform duration-300"
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
        {post.coverUrl ? (
          <div className="relative h-56 w-full overflow-hidden">
            <Image
              src={post.coverUrl}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ) : (
          <div className="h-56 w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300">
            No Image
          </div>
        )}

        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
            {post.excerpt || post.content}
          </p>
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="text-right">
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm hover:underline">
              Read More →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

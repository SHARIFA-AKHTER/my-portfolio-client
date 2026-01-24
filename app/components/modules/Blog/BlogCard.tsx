/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";

export default function BlogCard({ post }: { post: any }) {
  // slug বা id দিয়ে লিংক তৈরি করা
  const blogLink = `/blogs/${post.slug || post.id || post._id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Link href={blogLink} className="group block h-full">
        <div className="flex flex-col h-full bg-card hover:bg-accent/5 rounded-3xl overflow-hidden border border-primary/10 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
          
          {/* Thumbnail Container */}
          <div className="relative h-52 sm:h-60 w-full overflow-hidden">
            {post.coverUrl ? (
              <Image
                src={post.coverUrl}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="h-full w-full bg-secondary/30 flex items-center justify-center text-muted-foreground">
                <span className="text-sm font-medium italic">No Cover Image</span>
              </div>
            )}
            
            {/* Category/Badge (If available) */}
            {post.category && (
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 bg-background/60 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider rounded-lg border border-white/10 shadow-lg">
                  {post.category}
                </span>
              </div>
            )}
          </div>

          {/* Content Area */}
          <div className="p-6 flex flex-col flex-1 space-y-4">
            {/* Date */}
            <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
              <Calendar size={14} className="text-primary" />
              <span suppressHydrationWarning>
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold leading-snug group-hover:text-primary transition-colors duration-300">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed flex-1">
              {post.excerpt || post.content?.replace(/<[^>]*>?/gm, "")}
            </p>

            {/* Footer */}
            <div className="pt-4 border-t border-primary/5 flex items-center justify-between">
              <span className="text-primary text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                Read Article <ArrowRight size={16} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
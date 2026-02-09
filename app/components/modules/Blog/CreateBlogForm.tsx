
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
export const dynamic = "force-dynamic";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBlog } from "@/actions/create";
import { Loader2, Image as ImageIcon, FileText, Link as LinkIcon, Send } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface BlogFormData {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  coverUrl?: string;
  published?: boolean;
}

export default function CreateBlogForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<BlogFormData>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: BlogFormData) => {
    setLoading(true);
    try {
      const result = await createBlog(data);
      if (!result?.success) throw new Error(result?.message || "Failed to create blog");

      toast.success("✅ Blog created successfully!");
      reset();
      
      setTimeout(() => router.push("/dashboard/blogs"), 1500);
    } catch (err: any) {
      toast.error(err?.message || "Failed to create blog ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-4xl mx-auto p-1"
    >
      <div className="bg-card text-card-foreground shadow-2xl rounded-[2.5rem] border border-primary/10 overflow-hidden">
        {/* Header */}
        <div className="bg-primary/5 p-8 border-b border-primary/10">
          <h2 className="text-2xl md:text-3xl font-black flex items-center gap-3">
            <span className="bg-primary text-primary-foreground p-2 rounded-xl">
              <FileText size={24} />
            </span>
            Create New Blog
          </h2>
          <p className="text-muted-foreground mt-2">Share your thoughts with the world.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-bold ml-1 flex items-center gap-2 uppercase tracking-wider text-muted-foreground">
                Blog Title
              </label>
              <input
                {...register("title", { required: "Title is required" })}
                className="w-full bg-secondary/50 border border-primary/10 px-4 py-3 rounded-2xl focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                placeholder="The Future of Web Development"
              />
              {errors.title && <p className="text-destructive text-xs ml-1">{errors.title.message}</p>}
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <label className="text-sm font-bold ml-1 flex items-center gap-2 uppercase tracking-wider text-muted-foreground">
                <LinkIcon size={14} /> Slug
              </label>
              <input
                {...register("slug", { required: "Slug is required" })}
                className="w-full bg-secondary/50 border border-primary/10 px-4 py-3 rounded-2xl focus:ring-2 focus:ring-primary focus:outline-none transition-all font-mono"
                placeholder="future-of-web"
              />
              {errors.slug && <p className="text-destructive text-xs ml-1">{errors.slug.message}</p>}
            </div>
          </div>

          {/* Excerpt */}
          <div className="space-y-2">
            <label className="text-sm font-bold ml-1 uppercase tracking-wider text-muted-foreground">
              Excerpt (Short Summary)
            </label>
            <textarea
              {...register("excerpt")}
              rows={2}
              className="w-full bg-secondary/50 border border-primary/10 px-4 py-3 rounded-2xl focus:ring-2 focus:ring-primary focus:outline-none transition-all resize-none"
              placeholder="A brief introduction to catch readers' attention..."
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <label className="text-sm font-bold ml-1 uppercase tracking-wider text-muted-foreground">
              Main Content
            </label>
            <textarea
              {...register("content", { required: "Content is required" })}
              rows={8}
              className="w-full bg-secondary/50 border border-primary/10 px-4 py-4 rounded-2xl focus:ring-2 focus:ring-primary focus:outline-none transition-all leading-relaxed"
              placeholder="Start writing your story here..."
            />
            {errors.content && <p className="text-destructive text-xs ml-1">{errors.content.message}</p>}
          </div>

          {/* Cover URL */}
          <div className="space-y-2">
            <label className="text-sm font-bold ml-1 flex items-center gap-2 uppercase tracking-wider text-muted-foreground">
              <ImageIcon size={14} /> Cover Image URL
            </label>
            <input
              {...register("coverUrl")}
              type="url"
              className="w-full bg-secondary/50 border border-primary/10 px-4 py-3 rounded-2xl focus:ring-2 focus:ring-primary focus:outline-none transition-all"
              placeholder="https://images.unsplash.com/your-image.jpg"
            />
          </div>

          {/* Published Toggle */}
          <div className="flex items-center gap-3 p-4 bg-secondary/30 rounded-2xl border border-primary/5">
            <input 
              type="checkbox" 
              {...register("published")} 
              id="published"
              className="w-5 h-5 accent-primary cursor-pointer" 
            />
            <label htmlFor="published" className="text-sm font-medium cursor-pointer select-none">
              Mark as Published (Visible to everyone)
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 flex items-center justify-center gap-3 text-primary-foreground font-black bg-primary rounded-2xl hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-50 shadow-xl shadow-primary/20 uppercase tracking-widest"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <Send size={18} /> Publish Blog Post
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
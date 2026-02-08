/* eslint-disable @typescript-eslint/no-explicit-any */

import Hero from "@/app/components/Hero";
import BlogCard from "@/app/components/modules/Blog/BlogCard";


export const dynamic = "force-dynamic";

export default async function HomePage() {
  let blogs: any[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
      next: {
        tags: ["BLOGS"],
        revalidate: 60, 
      },
    });

    if (res.ok) {
      const result = await res.json();
      blogs = Array.isArray(result) ? result : result.data ?? [];
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }

  return (
    <div className="pb-20">
      <Hero />

      <section className="max-w-6xl mx-auto px-4 mt-12">
        <div className="flex flex-col items-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            📚 Featured Blogs
          </h2>
          <div className="h-1 w-20 bg-primary mt-2 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.length > 0 ? (
            blogs.slice(0, 6).map((blog: any) => (
              <BlogCard key={blog.id ?? blog._id} post={blog} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center border-2 border-dashed rounded-3xl">
               <p className="text-gray-500">No blogs found at the moment.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
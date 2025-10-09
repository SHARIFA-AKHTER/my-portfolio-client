// /* eslint-disable @typescript-eslint/no-explicit-any */

// import Hero from "@/app/components/Hero";
// import BlogCard from "@/app/components/modules/Blog/BlogCard";

// export default async function HomePage() {
//   const res = await fetch(`${process.env.PUBLIC_PORTFOLIO_BASE_API}/blog`, {
//     next: {
//       tags: ["BLOGS"],
//     },
//   });
//   const { data: blogs } = await res.json();

//   return (
//     <div>
//       <Hero />
//       <h2 className="text-center my-5 text-4xl">Featured Posts</h2>

//       <div className="grid grid-cols-3 gap-4 max-w-6xl mx-auto my-5">
//         {blogs.slice(0, 3).map((blog: any) => (
//           <BlogCard key={blog?.id} post={blog} />
//         ))}
//       </div>
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */

import Hero from "../../components/Hero";
import BlogCard from "../../components/modules/Blog/BlogCard";

export default async function HomePage() {
  let blogs: any[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
      cache: "no-store",
      next: {
        tags: ["BLOGS"],
        // revalidate: 30,
      },
    });

    if (!res.ok) {
      console.error("Failed to fetch blogs:", res.statusText);
    } else {
      const result = await res.json();
      // result data check
      console.log("Fetched blogs from API:", result);

      blogs = Array.isArray(result) ? result : result.data ?? [];
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }

  return (
    <div>
      <Hero />

      <h2 className="text-center my-8 text-3xl font-bold">📚 Features Blogs</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto my-5 px-4">
        {blogs.length > 0 ? (
          blogs
            .slice(0, 6)
            .map((blog: any) => (
              <BlogCard key={blog.id ?? blog._id} post={blog} />
            ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No blogs available.
          </p>
        )}
      </div>
    </div>
  );
}

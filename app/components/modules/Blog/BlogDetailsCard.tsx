// /* eslint-disable @typescript-eslint/no-explicit-any */

// "use client";
// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { incrementBlogView } from "@/actions/blog";

// export default function BlogDetailsCard({ blog }: { blog: any }) {
//   const [views, setViews] = useState(blog.views ?? 0);

//   useEffect(() => {
//     const updateViews = async () => {
//       if (!blog.id) return;
//       const updatedBlog = await incrementBlogView(blog.id);
//       if (updatedBlog) {
//         setViews(updatedBlog.views);
//       }
//     };
//     updateViews();
//   }, [blog.id]);

//   if (!blog)
//     return (
//       <div className="py-20 text-center text-gray-500">Blog not found.</div>
//     );

//   return (
//     <main className="max-w-4xl mx-auto py-10 px-4">
//       <h1 className="text-4xl md:text-5xl font-bold mb-6">{blog.title}</h1>

//       <div className="flex items-center gap-4 mb-8">
//         <Image
//           src={
//             blog.author?.picture ??
//             "https://cdn-icons-png.flaticon.com/512/9385/9385289.png"
//           }
//           alt={blog.author?.name ?? "Author"}
//           width={48}
//           height={48}
//           className="rounded-full"
//         />
//         <div>
//           <p className="font-semibold">
//             {blog.author?.name ?? "Unknown Author"}{" "}
//             {blog.author?.isVerified && (
//               <span className="text-blue-500">✔</span>
//             )}
//           </p>
//           <p className="text-gray-500 text-sm">
//             {blog.createdAt
//               ? new Date(blog.createdAt).toLocaleDateString()
//               : "-"}{" "}
//             • {views} views
//           </p>
//         </div>
//       </div>

//       {blog.coverUrl && (
//         <div className="relative h-80 w-full overflow-hidden mb-6">
//           <Image
//             src={blog.coverUrl}
//             alt={blog.title}
//             fill
//             className="rounded-lg object-cover shadow-md"
//           />
//         </div>
//       )}

//       <article className="prose prose-lg max-w-none">
//         <p>{blog.content}</p>
//       </article>
//     </main>
//   );
// }


/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { incrementBlogView } from "@/actions/blog";

export default function BlogDetailsCard({ blog }: { blog: any }) {
  const [views, setViews] = useState(blog.views ?? 0);
  

  const hasCalledAPI = useRef(false);

  useEffect(() => {
    const updateViews = async () => {

      const numericId = Number(blog.id);


      if (!numericId || isNaN(numericId) || hasCalledAPI.current) {
        return;
      }

      try {
        hasCalledAPI.current = true; 
        const result = await incrementBlogView(numericId);
        
        if (result) {
        
          setViews(result.views ?? result.data?.views);
        }
      } catch (err) {
        console.error("View count update failed:", err);
      }
    };

    updateViews();
  }, [blog.id]);

  if (!blog)
    return (
      <div className="py-20 text-center text-gray-500 font-medium">
        Blog not found.
      </div>
    );

  return (
    <main className="max-w-4xl mx-auto py-10 px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Title Section */}
      <h1 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white leading-tight tracking-tight">
        {blog.title}
      </h1>

      {/* Meta Info Section */}
      <div className="flex items-center gap-4 mb-8 p-5 bg-slate-50 dark:bg-slate-900/40 rounded-3xl border border-slate-100 dark:border-slate-800 backdrop-blur-sm">
        <Image
          src={blog.author?.picture ?? "https://cdn-icons-png.flaticon.com/512/9385/9385289.png"}
          alt={blog.author?.name ?? "Author"}
          width={52}
          height={52}
          className="rounded-full ring-4 ring-pink-500/10 border-2 border-white dark:border-slate-800 shadow-sm"
        />
        <div className="flex flex-col">
          <p className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
            {blog.author?.name ?? "Unknown Author"}
            {blog.author?.isVerified && (
              <span className="text-blue-500 bg-blue-50 dark:bg-blue-500/10 p-0.5 rounded-full" title="Verified Author">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
              </span>
            )}
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold flex items-center gap-2">
            <span>{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "-"}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
            <span className="text-pink-600 dark:text-pink-400 font-black">{views.toLocaleString()}</span> views
          </p>
        </div>
      </div>

      {/* Cover Image Section */}
      {blog.coverUrl && (
        <div className="relative aspect-video w-full overflow-hidden mb-10 rounded-[2.5rem] shadow-2xl shadow-slate-200 dark:shadow-none border border-slate-100 dark:border-slate-800">
          <Image
            src={blog.coverUrl}
            alt={blog.title}
            fill
            priority
            className="object-cover transition-transform duration-1000 hover:scale-105"
          />
        </div>
      )}

      {/* Content Section */}
      <article className="prose prose-lg md:prose-xl dark:prose-invert max-w-none 
        prose-headings:font-black prose-p:text-slate-600 dark:prose-p:text-slate-300 
        prose-p:leading-relaxed prose-strong:text-slate-900 dark:prose-strong:text-white
        selection:bg-pink-100 dark:selection:bg-pink-900/30">
        <p className="whitespace-pre-wrap">{blog.content}</p>
      </article>
    </main>
  );
}
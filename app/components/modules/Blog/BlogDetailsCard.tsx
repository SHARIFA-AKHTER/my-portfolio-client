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
import { useEffect, useState} from "react";
import Image from "next/image";
import { incrementBlogView } from "@/actions/blog";

export default function BlogDetailsCard({ blog }: { blog: any }) {
  const [views, setViews] = useState(blog.views ?? 0);
 

  // useEffect(() => {
  //   const updateViews = async () => {
   
  //     const idToIncrement = blog._id || blog.id; 
      
  //     if (!idToIncrement || hasIncremented.current) return;

  //     try {
        
  //       const updatedBlog = await incrementBlogView(idToIncrement);
        
  //       if (updatedBlog) {
         
  //         const newViewCount = updatedBlog.views ?? updatedBlog.data?.views;
  //         if (newViewCount) {
  //           setViews(newViewCount);
  //           hasIncremented.current = true; 
  //         }
  //       }
  //     } catch (err) {
  //       console.error("View count update failed:", err);
  //     }
  //   };

  //   updateViews();
  // }, [blog.id, blog._id]);

  useEffect(() => {
  const updateViews = async () => {

    const idToIncrement = Number(blog.id); 
    
    if (!idToIncrement || isNaN(idToIncrement)) return;

    const updatedData = await incrementBlogView(idToIncrement);
    
    if (updatedData && typeof updatedData.views !== 'undefined') {
      setViews(updatedData.views); 
    }
  };

  updateViews();
}, [blog.id]);

  if (!blog)
    return (
      <div className="py-20 text-center text-gray-500">Blog not found.</div>
    );

  return (
    <main className="max-w-4xl mx-auto py-10 px-4 animate-in fade-in duration-500">
      <h1 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 dark:text-white leading-tight">
        {blog.title}
      </h1>

      <div className="flex items-center gap-4 mb-8 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
        <Image
          src={
            blog.author?.picture ??
            "https://cdn-icons-png.flaticon.com/512/9385/9385289.png"
          }
          alt={blog.author?.name ?? "Author"}
          width={48}
          height={48}
          className="rounded-full ring-2 ring-pink-500/20"
        />
        <div>
          <p className="font-bold text-slate-800 dark:text-slate-200">
            {blog.author?.name ?? "Unknown Author"}{" "}
            {blog.author?.isVerified && (
              <span className="text-blue-500 ml-1">✔</span>
            )}
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            {blog.createdAt
              ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "-"}{" "}
            <span className="mx-2 text-slate-300">•</span> 
            <span className="text-pink-500 font-bold">{views}</span> views
          </p>
        </div>
      </div>

      {blog.coverUrl && (
        <div className="relative h-62.5 md:h-112.5 w-full overflow-hidden mb-10 rounded-4xl shadow-2xl">
          <Image
            src={blog.coverUrl}
            alt={blog.title}
            fill
            priority
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
      )}

      <article className="prose prose-lg dark:prose-invert max-w-none 
        prose-headings:font-black prose-p:text-slate-600 dark:prose-p:text-slate-300 
        prose-p:leading-relaxed selection:bg-pink-100 dark:selection:bg-pink-900/30">
        {blog.content}
      </article>
    </main>
  );
}
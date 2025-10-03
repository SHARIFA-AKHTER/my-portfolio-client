// /* eslint-disable @typescript-eslint/no-explicit-any */

// import BlogDetailsCard from "@/app/components/modules/Blog/BlogDetailsCard";
// import { getBlogById } from "@/services/BlogServices";

// export const generateStaticParams = async () => {
//   const res = await fetch(`${process.env.PUBLIC_PORTFOLIO_BASE_API}/blog`);

//   const { data: blogs } = await res.json();

//   return blogs.slice(0, 2).map((blog: any) => ({
//     blogId: String(blog.id),
//   }));
// };

// export const generateMetadata =
//   async () =>
//   async ({ params }: { params: { blogId: string } }) => {
//     const { blogId } = await params;
//     const blog = await getBlogById(blogId);
//     return {
//       title: blog?.title,
//       Description: blog?.content,
//     };
//   };

// const BlogDetailsPage = async ({ params }: { params: { blogId: string } }) => {
//   const { blogId } = params;

//   const blog = await getBlogById(blogId);

//   return (
//     <div className="py-30 px-4 max-w-7xl mx-auto">
//       <BlogDetailsCard blog={blog} />
//     </div>
//   );
// };

// export default BlogDetailsPage;

/* eslint-disable @typescript-eslint/no-explicit-any */
import BlogDetailsCard from "@/app/components/modules/Blog/BlogDetailsCard";
import { getBlogById } from "@/services/BlogServices";

// Generate static params for SSG
export const generateStaticParams = async () => {
  const res = await fetch(`${process.env.PUBLIC_PORTFOLIO_BASE_API}/blog`);
  const { data: blogs } = await res.json();

  if (!blogs || blogs.length === 0) return [];

  return blogs.map((blog: any) => ({
    blogId: String(blog.id),
  }));
};

// Metadata for SEO
export const generateMetadata = async ({
  params,
}: {
  params: { blogId: string };
}) => {
  try {
    const blog = await getBlogById(params.blogId);
    return {
      title: blog?.title ?? "Blog",
      description: blog?.content?.slice(0, 160) ?? "",
    };
  } catch {
    return {
      title: "Blog",
      description: "",
    };
  }
};

const BlogDetailsPage = async ({ params }: { params: { blogId: string } }) => {
  const { blogId } = params;

  const blog = await getBlogById(blogId);

  if (!blog) {
    return (
      <div className="py-20 text-center text-gray-500">Blog not found.</div>
    );
  }

  return (
    <div className="py-30 px-4 max-w-7xl mx-auto">
      <BlogDetailsCard blog={blog} />
    </div>
  );
};

export default BlogDetailsPage;

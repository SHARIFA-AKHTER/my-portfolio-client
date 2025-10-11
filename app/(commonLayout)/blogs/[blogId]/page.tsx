/* eslint-disable @typescript-eslint/no-explicit-any */

import { getBlogById } from "../../../../services/BlogServices";
import BlogDetailsCard from "../../../components/modules/Blog/BlogDetailsCard";

interface Props {
  params: {
    blogId: string;
  };
}

// export const generateStaticParams = async () => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`);

//   const { data: blogs } = await res.json();

//   return blogs.slice(0, 2).map((blog: any) => ({
//     blogId: String(blog.id),
//   }));
// };

export const generateStaticParams = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`);
    if (!res.ok) {
      console.error("Failed to fetch blogs:", res.statusText);
      return [];
    }

    const result = await res.json();
    const blogs = Array.isArray(result) ? result : result.data ?? [];

    return blogs.slice(0, 2).map((blog: any) => ({
      blogId: String(blog.id ?? blog._id),
    }));
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [];
  }
};

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

export const generateMetadata = async ({ params }: Props) => {
  const { blogId } = params;
  const blog = await getBlogById(blogId);

  return {
    title: blog?.title,
    description: blog?.content,
  };
};

const BlogDetailsPage = async ({ params }: { params: { blogId: string } }) => {
  const { blogId } = params;

  const blog = await getBlogById(blogId);
  console.log(blog);

  return (
    <div className="py-30 px-4 max-w-7xl mx-auto">
      <BlogDetailsCard blog={blog} />
    </div>
  );
};

export default BlogDetailsPage;

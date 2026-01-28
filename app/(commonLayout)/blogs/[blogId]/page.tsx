/* eslint-disable @typescript-eslint/no-explicit-any */
import BlogDetailsCard from "@/app/components/modules/Blog/BlogDetailsCard";
import { getBlogById } from "@/services/BlogServices";
import { Metadata } from "next";


type Props = {
  params: Promise<{ blogId: string }>;
};


export const generateStaticParams = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`);
    if (!res.ok) return [];

    const result = await res.json();
    const blogs = Array.isArray(result) ? result : result.data ?? [];

    return blogs.slice(0, 10).map((blog: any) => ({
      blogId: String(blog.id ?? blog._id),
    }));
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [];
  }
};


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { blogId } = await params;
  const blog = await getBlogById(blogId);

  return {
    title: blog?.title || "Blog Details",
    description: blog?.content?.substring(0, 160) || "Read our latest blog post.",
  };
}

export default async function BlogDetailsPage({ params }: Props) {
  const { blogId } = await params;
  const blog = await getBlogById(blogId);

  if (!blog) {
    return (
      <div className="py-20 text-center text-gray-500">
        <h2 className="text-2xl font-bold">Blog not found 😢</h2>
      </div>
    );
  }

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <BlogDetailsCard blog={blog} />
    </div>
  );
}
// export const getBlogById = async (blogId: string) => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${blogId}`);
//   return await res.json();
// };

export const getBlogById = async (slug: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/blog?slug=${slug}`
  );
  const blogs = await res.json();
  return blogs[0];
};

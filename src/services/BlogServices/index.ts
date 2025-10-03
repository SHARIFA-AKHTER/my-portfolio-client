export const getBlogById = async (blogId: string) => {
  const res = await fetch(
    `${process.env.PUBLIC_PORTFOLIO_BASE_API}/blog/${blogId}`
  );
  return await res.json();
};
// export const getBlogById = async (id: string) => {
//   if (!id) return null;

//   const res = await fetch(
//     `${process.env.PUBLIC_PORTFOLIO_BASE_API}/blog/${id}`
//   );
//   const result = await res.json();

//   console.log("Fetched blog by ID:", result); // check author object here

//   return result?.data ?? result;
// };

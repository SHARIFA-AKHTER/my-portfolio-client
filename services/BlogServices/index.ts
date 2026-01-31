export const getBlogById = async (idOrSlug: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/blog/${idOrSlug}`,
  );
  return await res.json();
};

//ami sorasori projectDetails a fetch koresi tai akana off raklam
// export const getProjectById = async (id: string | number) => {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`,
//       { cache: "no-store" }
//     );
//     if (!res.ok) return null;
//     const result = await res.json();
  
//     return result.success ? result.data : null; 
//   } catch (err) {
//     console.error("API Fetch Error:", err);
//     return null;
//   }
// };

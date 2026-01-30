export const getBlogById = async (idOrSlug: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/blog/${idOrSlug}`,
  );
  return await res.json();
};

// export const getProjectById = async (id: string | number) => {
 
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`,
//       {
//         cache: "no-store",
//       },
//     );
//     const result = await res.json();
//     return result.success ? result.data : result;
//   } catch (err) {
//     console.error("API Fetch Error:", err);
//     return null;

//   }
// };

export const getProjectById = async (id: string | number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const result = await res.json();
    
    // পোস্টম্যান অনুযায়ী যদি success true হয়, তবে সরাসরি data অবজেক্টটি রিটার্ন করবে
    return result.success ? result.data : result; 
  } catch (err) {
    console.error("API Fetch Error:", err);
    return null;
  }
};
// export const getProjectById = async (id: string) => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`, {
//     cache: "no-store",
//   });
//   const result = await res.json();
//   return result.data; 
// };
export const getBlogById = async (idOrSlug: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${idOrSlug}`);
  return await res.json();
};

// export const getProjectById = async (id: string | number) => {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`, {
//       cache: "no-store",
//     });

//     if (!res.ok) return null;

//     const result = await res.json();
    
//     return result
//   } catch (err) {
//     console.error("Fetch error:", err);
//     return null;
//   }
// };

// export const getProjectById = async (id: string | number) => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`);
//   if (!res.ok) return null;
//   return await res.json();
// };

export const getProjectById = async (id: string | number) => {
  try {
  
    if (!id) return null;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`API response error: ${res.status}`);
      return null;
    }

    const result = await res.json();
    
    return result.data || result; 

  } catch (err) {
    console.error("Fetch error details:", err);
    return null;
  }
};
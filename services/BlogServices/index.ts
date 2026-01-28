export const getBlogById = async (idOrSlug: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${idOrSlug}`);
  return await res.json();
};

export const getProjectById = async (id: string | number) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const result = await res.json();
    
    return result
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
};
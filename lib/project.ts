export const getAllProjects = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch projects");
    return await res.json();
  } catch (err) {
    console.error("Error fetching projects:", err);
    return [];
  }
};

// export const getProjectById = async (id: number) => {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`
//     );
//     if (!res.ok) throw new Error("Failed to fetch project");

//    const result = await res.json();
//     console.log("Full API Response:", result);
//     return result.data || result;
//   } catch (err) {
//     console.error("Error fetching project:", err);
//     return null;
//   }
// };
// export const getProjectById = async (id: string | number) => {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`, {
//       cache: "no-store",
//     });

//     if (!res.ok) return null;

//     const result = await res.json();
    
//     return result.data || result;
//   } catch (err) {
//     console.error("Fetch error:", err);
//     return null;
//   }
// };
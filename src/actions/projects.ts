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

export const getProjectById = async (id: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`
    );
    if (!res.ok) throw new Error("Failed to fetch project");
    return await res.json();
  } catch (err) {
    console.error("Error fetching project:", err);
    return null;
  }
};

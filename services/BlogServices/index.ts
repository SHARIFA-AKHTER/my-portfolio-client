/* eslint-disable @typescript-eslint/no-explicit-any */

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

export async function updateProject(id: number, data: any, token?: string) {
  const headers: any = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    console.error("❌ Update failed:", text);
    throw new Error("Project update failed");
  }

  return res.json();
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

// Create Project
export async function createProject(data: any, token: string) {
  if (!token) throw new Error("Unauthorized: No token provided");

  const modifiedData = {
    ...data,
    authorId: 3,
    images: data.images || [],
    techStack: data.techStack || [],
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(modifiedData),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("❌ Backend error response text:", text);
    throw new Error("Project creation failed");
  }

  return res.json();
}

// Update Project
// export async function updateProject(id: number, data: any, token?: string) {
//   const headers: any = { "Content-Type": "application/json" };
//   if (token) headers.Authorization = `Bearer ${token}`;

//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`,
//     {
//       method: "PUT",
//       headers,
//       body: JSON.stringify(data),
//     }
//   );

//   if (!res.ok) {
//     const text = await res.text();
//     console.error("❌ Update failed:", text);
//     throw new Error("Project update failed");
//   }

//   return res.json();
// }




// Delete Project
export async function deleteProject(id: number, token?: string) {
  const headers: any = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`,
    {
      method: "DELETE",
      headers,
    }
  );

  if (!res.ok) {
    const text = await res.text();
    console.error("❌ Delete failed:", text);
    throw new Error("Project delete failed");
  }

  return res.json();
}

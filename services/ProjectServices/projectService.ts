/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use server"; 

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const updateProjectService = async (id: number, data: any) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      throw new Error("Unauthorized: No token found in cookies");
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    };

    const { id: _, createdAt, updatedAt, authorId, ...cleanData } = data;

    const url = `${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`;

    const res = await fetch(url, {
      method: "PUT",
      headers,
      body: JSON.stringify(cleanData),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`❌ API Error for ID ${id}:`, text);
      throw new Error(text || "Update failed");
    }


    revalidatePath("/dashboard/projects");
    revalidatePath(`/dashboard/projects/${id}`);

    return await res.json();
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};



// export const projectService = {
//   update: async (id: number, data: any, token?: string) => {
//     const headers: Record<string, string> = {
//       "Content-Type": "application/json",
//     };

//     if (token) {
//       headers.Authorization = `Bearer ${token}`;
//     }

//     // 💡 বডি থেকে অদরকারি ডাটা ক্লিন করা (আইডি এবং ডেট)
//     const { id: _, createdAt, updatedAt, authorId, ...cleanData } = data;

//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`,
//       {
//         method: "PUT",
//         headers,
//         body: JSON.stringify(cleanData),
//       }
//     );

//     if (!res.ok) {
//       const text = await res.text();
//       console.error(`❌ API Error for ID ${id}:`, text);
//       throw new Error(text || "Update failed");
//     }

//     return res.json();
//   },
// };
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use server"; 

// import { cookies } from "next/headers";
// import { revalidatePath } from "next/cache";

// export const updateProjectAction = async (id: any, data: any) => {
//   try {
//     const cookieStore = await cookies();
//     const token = cookieStore.get("token")?.value;

//     if (!token) throw new Error("Unauthorized: Please login again");

//     const techStackArray = typeof data.techStack === "string" 
//       ? data.techStack.split(",").map((t: string) => t.trim()).filter(Boolean) 
//       : data.techStack;

//     const imageArray = typeof data.image === "string" 
//       ? data.image.split(",").map((i: string) => i.trim()).filter(Boolean) 
//       : data.image;

//     const payload = {
//       title: data.title,
//       slug: data.slug,
//       description: data.description,
//       techStack: techStackArray,
//       image: imageArray,
//       liveUrl: data.liveUrl || "",
//       frontendRepo: data.frontendRepo || "",
//       backendRepo: data.backendRepo || "",
//     };

//     const url = `${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`;
    
//     const res = await fetch(url, {
//       method: "PUT", 
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(payload),
//     });

//     const result = await res.json();

//     if (!res.ok) {
//       throw new Error(result.message || "Update failed");
//     }

//     revalidatePath("/dashboard/projects");
//     revalidatePath(`/dashboard/projects/${id}`);
    
//     return result;
//   } catch (error: any) {
//     throw new Error(error.message || "Something went wrong");
//   }
// };


"use server"; 
/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

// Update Project
export async function updateProjectAction(id: number | string, data: any) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const headers: any = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;


  const payload = {
    ...data,
    techStack: typeof data.techStack === "string" 
      ? data.techStack.split(",").map((t: string) => t.trim()).filter(Boolean) 
      : data.techStack,
    image: typeof data.image === "string" 
      ? data.image.split(",").map((i: string) => i.trim()).filter(Boolean) 
      : data.image,
    authorId: data.authorId ? Number(data.authorId) : 3,
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    console.error("❌ Update failed:", text);
    throw new Error("Project update failed");
  }


  revalidatePath("/dashboard/projects");
  revalidatePath(`/dashboard/projects/${id}`);

  return res.json();
}

/* eslint-disable @typescript-eslint/no-explicit-any */
// "use server"; 

// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */


// import { cookies } from "next/headers";
// import { revalidatePath } from "next/cache";

// export const projectService = async (id: number, data: any) => {
//   try {
//     const cookieStore = await cookies();
//     const token = cookieStore.get("token")?.value;

//     if (!token) {
//       throw new Error("Unauthorized: No token found in cookies");
//     }

//     const headers: Record<string, string> = {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${token}`,
//     };

//     const { id: _, createdAt, updatedAt, authorId, ...cleanData } = data;

//     const url = `${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`;

//     const res = await fetch(url, {
//       method: "PUT",
//       headers,
//       body: JSON.stringify(cleanData),
//     });

//     if (!res.ok) {
//       const text = await res.text();
//       console.error(`❌ API Error for ID ${id}:`, text);
//       throw new Error(text || "Update failed");
//     }


//     revalidatePath("/dashboard/projects");
//     revalidatePath(`/dashboard/projects/${id}`);

//     return await res.json();
//   } catch (error: any) {
//     throw new Error(error.message || "Something went wrong");
//   }
// };

"use server"; 

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const updateProjectAction = async (id: number, data: any) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) throw new Error("Unauthorized: Please login again");


    const techStackArray = typeof data.techStack === "string" 
      ? data.techStack.split(",").map((t: string) => t.trim()).filter(Boolean) 
      : data.techStack;

    const imageArray = typeof data.image === "string" 
      ? data.image.split(",").map((i: string) => i.trim()).filter(Boolean) 
      : data.image;

    const payload = {
      title: data.title,
      slug: data.slug,
      description: data.description,
      techStack: techStackArray,
      image: imageArray,
      liveUrl: data.liveUrl || "",
      repoUrl: data.repoUrl || null,
      frontendRepo: data.frontendRepo || "",
      backendRepo: data.backendRepo || "",
    };

    const url = `${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`;
    
    const res = await fetch(url, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok) {
      console.error("❌ API Error Details:", result);
      throw new Error(result.message || "Update failed");
    }

    revalidatePath("/dashboard/projects");
    revalidatePath(`/dashboard/projects/${id}`);
    
    return result;
  } catch (error: any) {
    console.error("❌ Service Error:", error.message);
    throw new Error(error.message || "Something went wrong");
  }
};
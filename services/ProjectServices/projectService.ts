/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"; 

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const updateProjectAction = async (id: any, data: any) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) throw new Error("Unauthorized: Please login again");

 
    const techStackArray = typeof data.techStack === "string" 
      ? data.techStack.split(",").map((t: string) => t.trim()).filter(Boolean) 
      : Array.isArray(data.techStack) ? data.techStack : [];


    const imageArray = typeof data.image === "string" 
      ? data.image.split(",").map((i: string) => i.trim()).filter(Boolean) 
      : Array.isArray(data.image) ? data.image : [];


    const payload = {
      title: data.title,
      slug: data.slug,
      description: data.description,
      techStack: techStackArray,
      image: imageArray,
      liveUrl: data.liveUrl || "",
      frontendRepo: data.frontendRepo || "",
      backendRepo: data.backendRepo || "",
     
      authorId: data.authorId ? Number(data.authorId) : 3, 
    };


    const url = `${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`;
    
    console.log("Updating project at:", url); 

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
      console.error("Backend Error Detail:", result);
      throw new Error(result.message || `Update failed with status ${res.status}`);
    }

  
    revalidatePath("/dashboard/projects");
    revalidatePath(`/dashboard/projects/${id}`);
    revalidatePath("/projects"); 
    
    return result;
  } catch (error: any) {
    console.error("Update Action Exception:", error.message);
    throw new Error(error.message || "Something went wrong during update");
  }
};
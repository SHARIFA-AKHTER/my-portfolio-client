/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use server";

// import { cookies } from "next/headers";

// // ✅ Update Blog
// export async function updateBlog(blogId: number, data: any, p0: string | undefined) {
//   const cookieStore = cookies();
//   const token = (await cookieStore).get("token")?.value;

//   if (!token) throw new Error("Unauthorized: No token found in cookies");

//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_API}/blog/${blogId}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(data),
//       }
//     );

//     if (!res.ok) {
//       const text = await res.text();
//       console.error("❌ Update error:", text);
//       throw new Error(text || "Blog update failed");
//     }

//     const json = await res.json();
//     console.log("✅ Blog updated:", json);
//     return json;
//   } catch (err: any) {
//     console.error("⚠️ updateBlog Error:", err);
//     throw err;
//   }
// }

// // ✅ Delete Blog
// export async function deleteBlog(blogId: number) {
//   const cookieStore = cookies();
//   const token = (await cookieStore).get("token")?.value;

//   if (!token) throw new Error("Unauthorized: No token found in cookies");

//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_API}/blog/${blogId}`,
//       {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     if (!res.ok) {
//       const text = await res.text();
//       console.error("❌ Delete error:", text);
//       throw new Error(text || "Blog delete failed");
//     }

//     const json = await res.json();
//     console.log("✅ Blog deleted:", json);
//     return json;
//   } catch (err: any) {
//     console.error("⚠️ deleteBlog Error:", err);
//     throw err;
//   }
// }

// //incrementBlogView
// export async function incrementBlogView(blogId: number) {
//   const cookieStore = cookies();
//   const token = (await cookieStore).get("token")?.value;

//   if (!token) throw new Error("Unauthorized: No token found in cookies");

//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_API}/blog/${blogId}/view`,
//       {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     if (!res.ok) {
//       const text = await res.text();
//       console.error("❌ Increment view error:", text);
//       throw new Error(text || "Failed to increment views");
//     }

//     const json = await res.json();
//     return json.blog;
//   } catch (err: any) {
//     console.error("⚠️ incrementBlogView Error:", err);
//     return null;
//   }
// }
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

async function getAuthHeaders() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) throw new Error("Unauthorized: Please login again.");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function updateBlog(blogId: number, data: any, p0?: string | undefined) {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${blogId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Blog update failed");

    revalidatePath("/dashboard/blogs");
    revalidatePath(`/blog/${blogId}`); 
    
    return result;
  } catch (err: any) {
    console.error("⚠️ updateBlog Error:", err.message);
    throw err;
  }
}

export async function deleteBlog(blogId: number) {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${blogId}`, {
      method: "DELETE",
      headers,
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Blog delete failed");

    revalidatePath("/dashboard/blogs");
    return result;
  } catch (err: any) {
    console.error("⚠️ deleteBlog Error:", err.message);
    throw err;
  }
}


export async function incrementBlogView(blogId: number) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${blogId}/view`, {
      method: "PATCH",
    });

    if (!res.ok) throw new Error("Failed to increment views");
    const json = await res.json();
    return json.blog;
  } catch (err: any) {
    return null;
  }
}
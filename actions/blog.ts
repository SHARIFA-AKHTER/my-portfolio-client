/* eslint-disable @typescript-eslint/no-explicit-any */
// "use server";

// export async function updateBlog(blogId: number, data: any, token: string) {
//   if (!token) throw new Error("Unauthorized: No token provided");

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

// export async function deleteBlog(blogId: number, token: string) {
//   if (!token) throw new Error("Unauthorized: No token provided");

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

// export const incrementBlogView = async (id: number) => {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_API}/blog/${id}/view`,
//       {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
//         },
//       }
//     );

//     if (!res.ok) throw new Error("Failed to increment views");

//     const data = await res.json();
//     return data.blog;
//   } catch (err: any) {
//     console.error(err);
//     return null;
//   }
// };


/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

// ✅ Update Blog
export async function updateBlog(blogId: number, data: any) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("Unauthorized: No token found in cookies");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/blog/${blogId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("❌ Update error:", text);
      throw new Error(text || "Blog update failed");
    }

    const json = await res.json();
    console.log("✅ Blog updated:", json);
    return json;
  } catch (err: any) {
    console.error("⚠️ updateBlog Error:", err);
    throw err;
  }
}

// ✅ Delete Blog
export async function deleteBlog(blogId: number) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("Unauthorized: No token found in cookies");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/blog/${blogId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("❌ Delete error:", text);
      throw new Error(text || "Blog delete failed");
    }

    const json = await res.json();
    console.log("✅ Blog deleted:", json);
    return json;
  } catch (err: any) {
    console.error("⚠️ deleteBlog Error:", err);
    throw err;
  }
}

// ✅ Increment Blog View (unchanged)
export const incrementBlogView = async (id: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/blog/${id}/view`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
        },
      }
    );

    if (!res.ok) throw new Error("Failed to increment views");

    const data = await res.json();
    return data.blog;
  } catch (err: any) {
    console.error(err);
    return null;
  }
};

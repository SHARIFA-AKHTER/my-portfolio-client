

"use server";
import { revalidatePath } from "next/cache";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { cookies } from "next/headers";

async function getAuthHeaders() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) throw new Error("Unauthorized: Please login again.");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

// Update Blog (id or slug)
export async function updateBlog(blogIdOrSlug: string | number, data: any) {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/blog/${blogIdOrSlug}`,
      {
        method: "PUT",
        headers,
        body: JSON.stringify(data),
      },
    );

    const result = await res.json();

    if (res.ok && result.success) {
      revalidatePath("/dashboard/manage-blogs");
      revalidatePath(`/dashboard/manage-blogs/${blogIdOrSlug}`);
      return result;
    } else {
      throw new Error(result.message || "Update failed");
    }
  } catch (err: any) {
    console.error("⚠️ updateBlog Error:", err.message);
    throw err;
  }
}

// Delete Blog (id or slug)
export async function deleteBlog(blogIdOrSlug: string | number) {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/blog/${blogIdOrSlug}`,
      {
        method: "DELETE",
        headers,
      },
    );

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Blog delete failed");

    return result;
  } catch (err: any) {
    console.error("⚠️ deleteBlog Error:", err.message);
    throw err;
  }
}

export async function incrementBlogView(blogId: number) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/blog/${blogId}/view`,
      {
        method: "PATCH",
        cache: "no-store",
      }
    );

    const json = await res.json();

    if (json.success && json.data) {
      return json.data; 
    }
    return null;
  } catch (err) {
    console.error("Increment Error:", err);
    return null;
  }
}
/* eslint-disable @typescript-eslint/no-explicit-any */
// actions/blog.ts
"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/helpers/authOptions";

export async function updateBlog(blogId: number, data: any) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/blog/${blogId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    console.error("❌ Update error:", text);
    throw new Error("Blog update failed");
  }

  return res.json();
}

export async function deleteBlog(blogId: number) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/blog/${blogId}`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${session.accessToken}` },
    }
  );

  if (!res.ok) {
    const text = await res.text();
    console.error("❌ Delete error:", text);
    throw new Error("Blog delete failed");
  }

  return res.json();
}

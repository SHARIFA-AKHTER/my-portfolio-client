
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

export async function createBlog(data: any) {

  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if (!token) throw new Error("Unauthorized: No token provided");

  const modifiedData = {
    ...data,
    authorId: 3,
    tags: data.tags || [],
    isFeatured: data.isFeatured || false,
  };

  console.log("🟢 Sending blog data to backend:", modifiedData);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(modifiedData),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("❌ Blog creation failed:", text);
    throw new Error(text || "Blog creation failed");
  }

  const json = await res.json();
  console.log("✅ Blog created successfully:", json);
  return json;
}

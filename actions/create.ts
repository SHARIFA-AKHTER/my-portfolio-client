/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../helpers/authOptions";

export async function create(data: any) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  const modifiedData = {
    ...data,
    authorId: 3,
    tags: data.tags || [],
    isFeatured: data.isFeatured || false,
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify(modifiedData),
  });

  console.log("🟢 Request Sent to Backend:", modifiedData);

  if (!res.ok) {
    const text = await res.text();
    console.error("❌ Backend error response text:", text);
    throw new Error("Blog creation failed");
  }

  const json = await res.json();
  console.log("✅ Backend Success Response:", json);
  return json;
}

//${process.env.NEXT_PUBLIC_BASE_API}/blog?slug=${slug}

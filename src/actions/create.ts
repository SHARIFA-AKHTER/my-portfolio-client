/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/helpers/authOptions";

export async function create(data: any) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  const modifiedData = {
    ...data,
    authorId: session.user.id,
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

  if (!res.ok) throw new Error("Blog creation failed");

  return await res.json();
}

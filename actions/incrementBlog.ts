/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";

export const incrementBlogView = async (id: number) => {
  try {
    // 🍪 Get token from cookies
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    if (!token) {
      console.error("❌ No token found in cookies");
      throw new Error("Unauthorized: No token found");
    }

    // 🛰️ API Request
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/blog/${id}/view`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("❌ Failed to increment views:", text);
      throw new Error("Failed to increment views");
    }

    const data = await res.json();
    console.log("✅ View incremented successfully:", data);
    return data.blog;
  } catch (err: any) {
    console.error("❌ incrementBlogView Error:", err.message);
    return null;
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

export async function getContacts() {
  try {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      console.error("❌ No token found in cookies");
      throw new Error("Unauthorized: Please login as admin");
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/contacts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("❌ Backend Error:", text);
      throw new Error(`Failed to fetch contacts: ${text}`);
    }

    const data = await res.json();
    console.log("✅ Contacts fetched successfully:", data);

    if (Array.isArray(data?.data)) {
      return data.data;
    }

    if (data?.contact) {
      return Array.isArray(data.contact) ? data.contact : [data.contact];
    }

    return [];
  } catch (err: any) {
    console.error("❌ getContacts Error:", err.message);
    throw new Error(
      err.message || "Something went wrong while fetching contacts"
    );
  }
}

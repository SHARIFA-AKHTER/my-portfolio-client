"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/helpers/authOptions";

export async function getContacts() {
  const session = await getServerSession(authOptions);
  if (!session || !session.accessToken) throw new Error("Unauthorized");

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/contacts`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error("Failed to fetch contacts: " + text);
  }

  const data = await res.json();
  return data.data; 
}


export async function deleteContact(id: string) {
  const session = await getServerSession(authOptions);
  if (!session || !session.accessToken) throw new Error("Unauthorized");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/contacts/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error("Failed to delete contact: " + text);
  }

  return true;
}


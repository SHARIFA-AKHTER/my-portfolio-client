/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../helpers/authOptions";

export const getAllProjects = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch projects");
    return await res.json();
  } catch (err) {
    console.error("Error fetching projects:", err);
    return [];
  }
};

export const getProjectById = async (id: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`
    );
    if (!res.ok) throw new Error("Failed to fetch project");
    return await res.json();
  } catch (err) {
    console.error("Error fetching project:", err);
    return null;
  }
};

export async function createProject(data: any) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  const modifiedData = {
    ...data,
    // authorId: Number(session.user.id),
    authorId: 3,
    images: data.images || [],
    techStack: data.techStack || [],
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects`, {
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
    throw new Error("Project creation failed");
  }

  const json = await res.json();
  console.log("✅ Backend Success Response:", json);
  return json;
}

export async function updateProject(id: number, data: any) {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken)
    throw new Error("Unauthorized! Please login again.");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`,
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
    console.error("Update failed:", text);
    throw new Error("Project update failed");
  }

  return await res.json();
}

export async function deleteProject(id: number) {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken)
    throw new Error("Unauthorized! Please login again.");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${session.accessToken}` },
    }
  );

  if (!res.ok) {
    const text = await res.text();
    console.error("Delete failed:", text);
    throw new Error("Project delete failed");
  }
  return await res.json();
}

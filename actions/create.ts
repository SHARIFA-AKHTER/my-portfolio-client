/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */

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

// "use server";

// export async function create(data: any) {
//   const modifiedData = {
//     ...data,
//     tags:
//       typeof data.tags === "string"
//         ? data.tags.split(",").map((tag: string) => tag.trim())
//         : data.tags || [],
//     authorId: 3,
//     isFeatured: data.isFeatured || false,
//   };

//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(modifiedData),
//   });

//   if (!res.ok) {
//     const text = await res.text();
//     console.error("❌ Backend error response:", text);
//     throw new Error("Blog creation failed");
//   }

//   const result = await res.json();

//   // ✅ On success, revalidate and redirect
//   // if (result?.id) {
//   //   revalidateTag("BLOGS");
//   //   revalidatePath("/blogs");
//   //   redirect("/");
//   // }

//   return result;
// }

//${process.env.NEXT_PUBLIC_BASE_API}/blog?slug=${slug}

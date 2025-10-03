/* eslint-disable @typescript-eslint/no-explicit-any */
// "use server";

// import { revalidatePath, revalidateTag } from "next/cache";
// import { redirect } from "next/navigation";

// export const create = async (data: FormData) => {
//   const blogInfo = Object.fromEntries(data.entries());
//   const modifiedData = {
//     ...blogInfo,
//     tags: blogInfo.tags
//       .toString()
//       .split(",")
//       .map((tag) => tag.trim()),
//     authorId: 7,
//     isFeatured: blogInfo.isFeatured === "true",
//     slug: ((blogInfo.slug as string) || (blogInfo.title as string))
//       .toLowerCase()
//       .trim()
//       .replace(/\s+/g, "-"),
//   };
//   console.log("Modified Data:", modifiedData);
//   const res = await fetch(`${process.env.PUBLIC_PORTFOLIO_BASE_API}/blog`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(modifiedData),
//   });

//   if (!res.ok) {
//     const errorText = await res.text();
//     console.error("Blog creation failed:", errorText);
//     throw new Error(errorText);
//   }

//   const result = await res.json();
//   console.log("Backend Response:", result);

//   if (result?.id) {
//     revalidateTag("BLOGS");
//     revalidatePath("/blogs");
//     redirect("/");
//   }
//   return result;
// };

"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const createBlog = async (data: any) => {
  const modifiedData = {
    ...data,
    authorId: 1,
    slug: (data.slug || data.title).toLowerCase().trim().replace(/\s+/g, "-"),
  };

  const res = await fetch(`${process.env.PUBLIC_PORTFOLIO_BASE_API}/blog`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(modifiedData),
  });

  if (!res.ok) throw new Error(await res.text());
  const result = await res.json();

  // if (result?.id) {
  //   revalidateTag("BLOGS");
  //   revalidatePath("/blogs");
  //   redirect("/");
  // }
  return result;
};

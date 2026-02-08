// import Cookies from "js-cookie";

// interface UpdateData {
//   id: number;
//   title: string;
//   content: string;
//   slug: string;
// }

// export const updateBlogAction = async (data: UpdateData) => {
//   const { id, title, content, slug } = data;
//   const token = Cookies.get("token") || localStorage.getItem("token");

//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ title, content, slug }),
//     });

//     return res; 
//   } catch (err) {
//     throw err;
//   }
// };
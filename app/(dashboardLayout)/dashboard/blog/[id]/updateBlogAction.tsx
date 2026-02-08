import Cookies from "js-cookie";

interface UpdateData {
  id: number;
  title: string;
  content: string;
  slug: string;
  excerpt?: string;
  coverUrl?: string;
}

export const updateBlogAction = async (data: UpdateData) => {
  const token = Cookies.get("token") || localStorage.getItem("token");

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: data.title,
      content: data.content,
      slug: data.slug,
      excerpt: data.excerpt,
      coverUrl: data.coverUrl,
    }),
  });

  return res;
};
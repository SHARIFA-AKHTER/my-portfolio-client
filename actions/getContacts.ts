

"use server";

export async function getContacts() {
  try {
    const token = process.env.ADMIN_TOKEN;

    if (!token) {
      console.error("❌ No ADMIN_TOKEN found in env");
      throw new Error("Unauthorized: No admin token found");
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
    throw new Error(err.message || "Something went wrong while fetching contacts");
  }
}
  
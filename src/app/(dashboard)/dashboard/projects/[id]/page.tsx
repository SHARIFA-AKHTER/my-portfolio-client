

"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { updateProject } from "@/actions/projects";

export default function ProjectEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params?.id);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/projects/${id}`
      );
      if (res.ok) {
        const data = await res.json();
        setTitle(data.title);
        setSlug(data.slug);
        setDescription(data.description);
      }
    };
    fetchProject();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProject(id, { title, slug, description });
      alert("✅ Project updated!");
      router.push("/dashboard/projects");
    } catch (err: any) {
      alert(err.message || "Failed to update project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Project #{id}</h1>
      <form onSubmit={handleUpdate} className="flex flex-col gap-4">
        <input
          className="border px-3 py-2 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          className="border px-3 py-2 rounded"
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
        />
        <textarea
          className="border px-3 py-2 rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Project"}
        </button>
      </form>
    </div>
  );
}

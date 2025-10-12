
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProject } from "../../../../actions/projects";

interface ProjectFormData {
  title: string;
  slug: string;
  description: string;
  liveUrl?: string;
  frontendRepo?: string;
  backendRepo?: string;
  techStack?: string;
  images?: string;
}

export default function CreateProjectForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormData>();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: ProjectFormData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const projectData = {
        ...data,
        authorId: 3,
        techStack: data.techStack?.split(",").map((t) => t.trim()) || [],
        images: data.images?.split(",").map((i) => i.trim()) || [],
      };

      const result = await createProject(projectData);

      if (result?.id) {
        setSuccess("✅ Project created successfully!");
        setTimeout(() => {
          reset();
          router.push("/dashboard/projects");
        }, 1500);
      } else {
        setError("❌ Failed to create project");
      }
    } catch (err: any) {
      console.error("Project creation error:", err);
      setError(err?.message || "Failed to create project ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">
        🚀 Create New Project
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            {...register("title", { required: true })}
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Project Title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">Title is required</p>
          )}
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Slug
          </label>
          <input
            {...register("slug", { required: true })}
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="unique-project-slug"
          />
          {errors.slug && (
            <p className="text-red-500 text-sm">Slug is required</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register("description", { required: true })}
            rows={4}
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Project description..."
          />
          {errors.description && (
            <p className="text-red-500 text-sm">Description is required</p>
          )}
        </div>

        {/* Optional fields */}
        <input
          {...register("liveUrl")}
          placeholder="Live URL"
          className="w-full px-4 py-2 mt-1 border rounded-lg"
        />
        <input
          {...register("frontendRepo")}
          placeholder="Frontend Repo URL"
          className="w-full px-4 py-2 mt-1 border rounded-lg"
        />
        <input
          {...register("backendRepo")}
          placeholder="Backend Repo URL"
          className="w-full px-4 py-2 mt-1 border rounded-lg"
        />
        <input
          {...register("techStack")}
          placeholder="Tech Stack (comma separated)"
          className="w-full px-4 py-2 mt-1 border rounded-lg"
        />
        <input
          {...register("images")}
          placeholder="Images URLs (comma separated)"
          className="w-full px-4 py-2 mt-1 border rounded-lg"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 text-white font-semibold bg-green-600 rounded-lg hover:bg-green-700 transition-all duration-300 disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Project"}
        </button>

        {success && <p className="text-green-600 text-center">{success}</p>}
        {error && <p className="text-red-600 text-center">{error}</p>}
      </form>
    </div>
  );
}

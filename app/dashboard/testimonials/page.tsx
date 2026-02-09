/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Trash2, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function TestimonialDashboard() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  // ১. Fetch All Testimonials (Read)
  const fetchTestimonials = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/testimonials`);
    const data = await res.json();
    if (data.success) setTestimonials(data.data);
  };

  useEffect(() => { fetchTestimonials(); }, []);

  // ২. Add Testimonial (Create)
  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/testimonials/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast.success("Testimonial Added!");
        reset();
        fetchTestimonials();
      }
    } catch (error) {
      toast.error("Failed to add");
    } finally {
      setLoading(false);
    }
  };

  // ৩. Delete Testimonial (Delete)
  const deleteTestimonial = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/testimonials/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      toast.success("Deleted!");
      fetchTestimonials();
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-10">
      <h1 className="text-3xl font-bold">Manage Testimonials</h1>

      {/* Add Form Section */}
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-2xl border shadow-sm">
        <input {...register("name", { required: true })} placeholder="Client Name" className="p-3 border rounded-lg focus:ring-2 ring-purple-500 outline-none" />
        <input {...register("role", { required: true })} placeholder="Role (e.g. CEO of X)" className="p-3 border rounded-lg focus:ring-2 ring-purple-500 outline-none" />
        <input {...register("avatar", { required: true })} placeholder="Avatar URL" className="p-3 border rounded-lg focus:ring-2 ring-purple-500 outline-none" />
        <textarea {...register("comment", { required: true })} placeholder="Client Comment" className="p-3 border rounded-lg md:col-span-2 focus:ring-2 ring-purple-500 outline-none" rows={3} />
        <button disabled={loading} className="bg-purple-600 text-white p-3 rounded-lg flex justify-center items-center gap-2 hover:bg-purple-700 transition">
          {loading ? <Loader2 className="animate-spin" /> : <Plus size={20} />} Add Testimonial
        </button>
      </form>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white rounded-2xl border shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4 font-bold">Client</th>
              <th className="p-4 font-bold">Comment</th>
              <th className="p-4 font-bold">Action</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((t: any) => (
              <tr key={t.id} className="border-b hover:bg-slate-50 transition">
                <td className="p-4 flex items-center gap-3">
                  <img src={t.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-bold">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </td>
                <td className="p-4 text-sm text-slate-600 truncate max-w-xs">{t.comment}</td>
                <td className="p-4">
                  <button onClick={() => deleteTestimonial(t.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-full transition">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
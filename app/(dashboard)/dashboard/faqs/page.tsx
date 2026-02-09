/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Trash2, Plus, Loader2, HelpCircle } from "lucide-react";
import { toast } from "sonner";

export default function FaqDashboard() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const fetchFaqs = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/faqs`);
    const data = await res.json();
    if (data.success) setFaqs(data.data);
  };

  useEffect(() => { fetchFaqs(); }, []);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/faqs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast.success("FAQ Added Successfully!");
        reset();
        fetchFaqs();
      }
    } catch (error) {
      toast.error("Failed to add FAQ");
    } finally {
      setLoading(false);
    }
  };

  const deleteFaq = async (id: string) => {
    if (!confirm("Delete this FAQ?")) return;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/faqs/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      toast.success("FAQ Deleted!");
      fetchFaqs();
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-10">
      <div className="flex items-center gap-3">
        <HelpCircle className="text-purple-600" size={32} />
        <h1 className="text-3xl font-bold">Manage FAQs</h1>
      </div>

      {/* Add FAQ Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="grid grid-cols-1 gap-4">
          <input 
            {...register("question", { required: true })} 
            placeholder="Enter Question (e.g. What is your return policy?)" 
            className="p-4 border rounded-2xl bg-slate-50 dark:bg-slate-800 focus:ring-2 ring-purple-500 outline-none" 
          />
          <textarea 
            {...register("answer", { required: true })} 
            placeholder="Enter Answer" 
            className="p-4 border rounded-2xl bg-slate-50 dark:bg-slate-800 focus:ring-2 ring-purple-500 outline-none" 
            rows={4} 
          />
        </div>
        <button disabled={loading} className="w-full md:w-auto px-8 py-3 bg-purple-600 text-white rounded-xl flex justify-center items-center gap-2 hover:bg-purple-700 transition font-bold">
          {loading ? <Loader2 className="animate-spin" /> : <Plus size={20} />} Add FAQ
        </button>
      </form>

      {/* FAQ List/Table */}
      <div className="grid gap-4">
        {faqs.map((faq: any) => (
          <div key={faq.id} className="flex justify-between items-start p-6 bg-white dark:bg-slate-900 border rounded-3xl hover:border-purple-200 transition-all">
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">Q: {faq.question}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">A: {faq.answer}</p>
            </div>
            <button onClick={() => deleteFaq(faq.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full">
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { Trash2, Mail, Calendar, Loader2, Send } from "lucide-react";
import { toast } from "sonner";

interface ISubscriber {
  id: string;
  email: string;
  createdAt: string;
}

export default function NewsletterDashboard() {
  const [subscribers, setSubscribers] = useState<ISubscriber[]>([]);
  const [loading, setLoading] = useState(true);

  // ১. Fetch All Subscribers
  const fetchSubscribers = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/newsletter/subscribers`);
      const result = await res.json();
      if (result.success) {
        setSubscribers(result.data);
      }
    } catch (error) {
      toast.error("Failed to load subscribers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  // ২. Delete Subscriber
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this subscriber?")) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/newsletter/subscribers/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();

      if (result.success) {
        toast.success("Subscriber removed");
        setSubscribers(subscribers.filter((s) => s.id !== id));
      }
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <Loader2 className="animate-spin text-purple-600" size={40} />
        <p className="text-slate-500 font-medium">Loading subscribers...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-purple-600 to-indigo-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-purple-500/20">
        <div>
          <h1 className="text-3xl font-extrabold flex items-center gap-3">
            <Send size={32} /> Newsletter List
          </h1>
          <p className="opacity-80 mt-1">Total {subscribers.length} people subscribed to your updates.</p>
        </div>
        <div className="bg-white/20 backdrop-blur-md px-6 py-2 rounded-2xl font-bold border border-white/10">
          Subscribers: {subscribers.length}
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="p-6 font-bold text-slate-700 dark:text-slate-200 uppercase text-xs tracking-widest">Email Address</th>
                <th className="p-6 font-bold text-slate-700 dark:text-slate-200 uppercase text-xs tracking-widest">Subscribed At</th>
                <th className="p-6 font-bold text-slate-700 dark:text-slate-200 uppercase text-xs tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {subscribers.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-10 text-center text-slate-400 italic">No subscribers found.</td>
                </tr>
              ) : (
                subscribers.map((sub) => (
                  <tr key={sub.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-50 dark:bg-purple-900/20 text-purple-600 rounded-lg">
                          <Mail size={18} />
                        </div>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{sub.email}</span>
                      </div>
                    </td>
                    <td className="p-6 text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        {new Date(sub.createdAt).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                    </td>
                    <td className="p-6 text-right">
                      <button
                        onClick={() => handleDelete(sub.id)}
                        className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl transition-all"
                        title="Remove Subscriber"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
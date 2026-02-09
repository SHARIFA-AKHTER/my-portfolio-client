/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Mail, Linkedin, Camera, Save, Loader2, Shield } from "lucide-react";
import { toast } from "sonner";

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    linkedin: "", 
    picture: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      fetchUserData(parsedUser.id);
    }
  }, []);

  const fetchUserData = async (id: number) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/${id}`);
      const result = await res.json();
      if (result.success) {
        setUserData(result.data);
        setFormData({
          name: result.data.name || "",
          email: result.data.email || "",
          linkedin: result.data.linkedin || "",
          picture: result.data.picture || "",
        });
      }
    } catch (error) {
      toast.error("Failed to load profile data");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/${userData.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Profile updated successfully!");
        localStorage.setItem("user", JSON.stringify(result.data));
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (!userData) return <div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto p-4 md:p-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Profile Card */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center text-center">
          <div className="relative group mb-6">
            <div className="h-36 w-36 rounded-4xl bg-linear-to-br from-pink-500 to-rose-600 p-1">
              <div className="h-full w-full bg-white dark:bg-slate-900 rounded-[1.9rem] overflow-hidden flex items-center justify-center">
                {formData.picture ? (
                  <img src={formData.picture} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <span className="text-5xl font-black text-pink-500">{formData.name.charAt(0)}</span>
                )}
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-black">{userData.name}</h2>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">{userData.role}</p>
          
          <div className="mt-6 w-full space-y-3">
             <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                <span className="text-xs font-bold text-slate-400">Status</span>
                <span className="text-xs font-black text-green-500 uppercase">{userData.status}</span>
             </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
          <h3 className="text-xl font-black mb-8 flex items-center gap-2">
            <Shield className="text-pink-500" /> Account Settings
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl py-4 pl-12 focus:ring-2 focus:ring-pink-500 transition-all font-bold text-sm"
                  />
                </div>
              </div>

              {/* LinkedIn URL Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">LinkedIn Profile URL</label>
                <div className="relative">
                  <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="url" 
                    placeholder="https://www.linkedin.com/in/sharifa-akhter-dev"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl py-4 pl-12 focus:ring-2 focus:ring-pink-500 transition-all font-bold text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Email Address (Read Only)</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400/50" size={18} />
                <input 
                  type="email" 
                  value={formData.email}
                  disabled
                  className="w-full bg-slate-100 dark:bg-slate-800/30 border-none rounded-2xl py-4 pl-12 text-slate-400 font-bold text-sm cursor-not-allowed"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Profile Picture URL</label>
              <div className="relative">
                <Camera className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  value={formData.picture}
                  onChange={(e) => setFormData({...formData, picture: e.target.value})}
                  placeholder="https://imgbb.com/your-image.jpg"
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border-none rounded-2xl py-4 pl-12 focus:ring-2 focus:ring-pink-500 transition-all font-bold text-sm"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-slate-900 dark:bg-pink-600 text-white rounded-2xl py-4 font-black shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
              {loading ? "SAVING..." : "SAVE CHANGES"}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
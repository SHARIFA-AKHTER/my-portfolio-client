/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        toast.success("Welcome aboard! Check your inbox soon.");
        setEmail("");
      } else {
        toast.error(data.message || "Something went wrong");
        setStatus("idle");
      }
    } catch (error) {
      toast.error("Connection failed. Try again.");
      setStatus("idle");
    }
  };

  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-purple-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-green-500/10 blur-[120px] rounded-full animate-pulse" />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-white/5 backdrop-blur-xl rounded-[3rem] p-8 md:p-16 overflow-hidden shadow-2xl shadow-purple-500/5"
        >
          {/* Top Icon Area */}
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-purple-600/10 rounded-2xl">
              <Sparkles className="text-purple-600 animate-bounce" size={32} />
            </div>
          </div>

          <div className="text-center max-w-2xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              Let's Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-green-500">Together</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
              Subscribe to my newsletter for the latest tech insights, project updates, and exclusive development tips. No spam, only value.
            </p>

            {status === "success" ? (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center gap-3 p-8 bg-green-500/5 border border-green-500/20 rounded-3xl"
              >
                <CheckCircle className="text-green-500 w-12 h-12" />
                <h3 className="font-bold text-xl text-green-600 dark:text-green-400">You're officially on the list!</h3>
                <button onClick={() => setStatus("idle")} className="text-sm underline text-slate-400">Subscribe another email</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="relative mt-10 flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="flex-1 px-6 py-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 ring-purple-500 transition-all shadow-inner"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="px-8 py-5 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-70 shadow-lg shadow-purple-600/20"
                >
                  {status === "loading" ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                  Subscribe
                </button>
              </form>
            )}
            
            <p className="text-[12px] text-slate-400 dark:text-slate-500 pt-4 font-medium">
              Join 500+ developers. Unsubscribe at any time.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_API}/faqs`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setFaqs(data.data);
      });
  }, []);

  if (faqs.length === 0) return null;

  return (
    <section className="relative py-24 px-6 bg-white dark:bg-[#0a0a0a] overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-purple-500/3 blur-[120px] rounded-full z-0" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            Common <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-green-500">Questions</span>
          </motion.h2>
          <div className="h-1.5 w-24 bg-purple-600 rounded-full mt-4 mx-auto"></div>
          <p className="text-slate-500 dark:text-slate-400 mt-6 text-lg">
            Everything you need to know about my services and workflow.
          </p>
        </div>

        {/* FAQ Accordion Grid */}
        <div className="space-y-5">
          {faqs.map((faq: any, index: number) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group border rounded-4xl transition-all duration-300 ${
                activeId === faq.id
                  ? "border-purple-500/30 bg-white dark:bg-slate-900/80 shadow-xl shadow-purple-500/5"
                  : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:border-purple-200 dark:hover:border-purple-900/30"
              }`}
            >
              <button
                onClick={() => setActiveId(activeId === faq.id ? null : faq.id)}
                className="w-full p-7 text-left flex justify-between items-center transition-colors"
              >
                <span className="font-bold text-lg md:text-xl text-slate-800 dark:text-slate-200 flex gap-4 items-center">
                  <div className={`p-2 rounded-xl transition-colors ${
                    activeId === faq.id ? "bg-purple-600 text-white" : "bg-purple-50 dark:bg-purple-900/20 text-purple-600"
                  }`}>
                    <HelpCircle size={20} />
                  </div>
                  {faq.question}
                </span>
                <div className={`transition-transform duration-300 ${activeId === faq.id ? "rotate-180 text-purple-600" : "text-slate-400"}`}>
                  {activeId === faq.id ? <Minus size={24} /> : <Plus size={24} />}
                </div>
              </button>

              <AnimatePresence>
                {activeId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-7 pb-8 text-slate-600 dark:text-slate-400 leading-relaxed text-lg border-t border-slate-50 dark:border-slate-800/50 pt-6 mx-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
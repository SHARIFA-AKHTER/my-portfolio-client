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
      .then(res => res.json())
      .then(data => { if(data.success) setFaqs(data.data) });
  }, []);

  if (faqs.length === 0) return null;

  return (
    <section className="py-24 px-6 bg-white dark:bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white">
            Common <span className="text-purple-600">Questions</span>
          </h2>
          <p className="text-slate-500 mt-4">Everything you need to know about my services.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq: any) => (
            <div 
              key={faq.id} 
              className="border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden bg-slate-50/30 dark:bg-slate-900/50"
            >
              <button
                onClick={() => setActiveId(activeId === faq.id ? null : faq.id)}
                className="w-full p-6 text-left flex justify-between items-center transition-colors"
              >
                <span className="font-bold text-lg text-slate-800 dark:text-slate-200 flex gap-3 items-center">
                  <HelpCircle className="text-purple-500" size={20} />
                  {faq.question}
                </span>
                {activeId === faq.id ? <Minus size={20}/> : <Plus size={20}/>}
              </button>

              <AnimatePresence>
                {activeId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 mt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
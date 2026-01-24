"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface ITestimonial {
  id: string;
  name: string;
  role: string;
  comment: string;
  avatar: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<ITestimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/testimonials`);
        const result = await res.json();
        if (result.success) setTestimonials(result.data);
      } catch (error) {
        console.error("Failed to fetch testimonials", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-6 max-w-7xl mx-auto bg-white dark:bg-background">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4 p-8 border rounded-[2.5rem] bg-white">
              <Skeleton className="h-12 w-12 rounded-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-24 w-full" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) return null;

  return (
    <section className="relative py-24 px-6 sm:px-12 lg:px-20 bg-white dark:bg-background overflow-hidden">
      

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-purple-500/5 blur-[120px] rounded-full -z-10"></div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Client <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-green-500">Feedback</span>
          </h2>
          <div className="h-1.5 w-24 bg-purple-600 rounded-full mt-4 mx-auto"></div>
          <p className="mt-6 text-muted-foreground max-w-xl mx-auto text-lg italic">
            &ldquo;Quality means doing it right when no one is looking.&rdquo; — Here is what they say about my work.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative p-8 sm:p-10 rounded-[2.5rem] bg-white dark:bg-secondary/20 border border-slate-100 dark:border-primary/5 backdrop-blur-sm flex flex-col gap-6 transition-all hover:shadow-2xl hover:shadow-purple-500/10"
            >
              {/* Rating Stars */}
              <div className="flex gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>

              <Quote className="absolute top-8 right-10 w-12 h-12 text-purple-600/10 group-hover:text-purple-600/20 transition-colors" />
              
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg italic z-10">
                &ldquo;{item.comment}&rdquo;
              </p>

              <div className="flex items-center gap-4 mt-4 border-t border-slate-50 dark:border-white/5 pt-6">
                <div className="relative w-14 h-14 rounded-full overflow-hidden ring-4 ring-purple-50 dark:ring-purple-900/20">
                  <Image 
                    src={item.avatar} 
                    alt={item.name} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 dark:text-white">{item.name}</h4>
                  <p className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">
                    {item.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
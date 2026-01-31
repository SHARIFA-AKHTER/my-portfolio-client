/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  LayoutDashboard,
  ShieldCheck,
  Briefcase,
  FileText,
  Users,
  Mail,
  TrendingUp,
  Loader2,
  Send,
  HelpCircle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const fetchStats = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/analytics/stats`,
        );
        const result = await res.json();
        if (result.success) {
          setStats(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <Loader2 className="animate-spin text-pink-500 mb-4" size={40} />
        <p className="text-muted-foreground animate-pulse font-medium">
          Synchronizing dashboard data...
        </p>
      </div>
    );
  }

  const chartData = [
    { name: "Projects", total: stats?.projects || 0, color: "#8b5cf6" },
    { name: "Blogs", total: stats?.blogs || 0, color: "#ec4899" },
    { name: "Users", total: stats?.users || 0, color: "#10b981" },
    { name: "Messages", total: stats?.messages || 0, color: "#f59e0b" },
    { name: "FAQs", total: stats?.faqs || 0, color: "#3b82f6" },
    { name: "Subscribers", total: stats?.subscribers || 0, color: "#6366f1" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-10"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
            <LayoutDashboard className="text-pink-500" size={32} />
            System Overview
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time performance and content metrics.
          </p>
        </div>

        {/* {user && (
          <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="h-10 w-10 bg-linear-to-tr from-pink-500 to-rose-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-pink-500/20">
              {user.name.charAt(0)}
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Administrator</p>
              <p className="text-sm font-bold truncate max-w-37.5">{user.name}</p>
            </div>
          </div>
        )} */}

        {user && (
          <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="h-10 w-10 bg-linear-to-tr from-pink-500 to-rose-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-pink-500/20">
              
              {user?.name ? user.name.charAt(0) : "A"}
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Administrator
              </p>
             
              <p className="text-sm font-bold truncate max-w-37.5">
                {user?.name || "Admin"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Projects"
          value={stats?.projects}
          icon={Briefcase}
          color="bg-blue-500"
        />
        <StatCard
          label="Blogs"
          value={stats?.blogs}
          icon={FileText}
          color="bg-pink-500"
        />
        <StatCard
          label="Subscribers"
          value={stats?.subscribers}
          icon={Send}
          color="bg-indigo-500"
        />
        <StatCard
          label="Inquiries"
          value={stats?.messages}
          icon={Mail}
          color="bg-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Charts Section */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-xl flex items-center gap-2">
              <TrendingUp className="text-green-500" /> Content Distribution
            </h3>
          </div>
          <div className="h-87.5 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 0, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  opacity={0.05}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  fontSize={10}
                  fontWeight="bold"
                  tick={{ fill: "#94a3b8" }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  fontSize={12}
                  tick={{ fill: "#94a3b8" }}
                />
                <Tooltip
                  cursor={{ fill: "rgba(0,0,0,0.02)" }}
                  contentStyle={{
                    borderRadius: "16px",
                    border: "none",
                    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar dataKey="total" radius={[10, 10, 0, 0]} barSize={40}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      fillOpacity={0.9}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Links / Info */}
        <div className="space-y-6">
          <div className="bg-linear-to-br from-slate-800 to-slate-900 p-8 rounded-[2.5rem]
           text-white shadow-xl relative overflow-hidden group border border-slate-700">
            <ShieldCheck size={40} className="mb-4 text-pink-500" />
            <h2 className="text-xl font-bold">Admin Security</h2>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed italic">
              "Your session is encrypted. You have full access to manage system
              resources and user data."
            </p>
            <div className="mt-8 flex gap-2">
              <div className="h-1.5 w-8 bg-pink-500 rounded-full"></div>
              <div className="h-1.5 w-1.5 bg-slate-700 rounded-full"></div>
              <div className="h-1.5 w-1.5 bg-slate-700 rounded-full"></div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <h4 className="font-bold mb-4 text-sm uppercase tracking-widest text-slate-400">
              Quick Actions
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <QuickAction
                label="New Blog"
                icon={FileText}
                href="/dashboard/create-blog"
              />
              <QuickAction
                label="New Project"
                icon={Briefcase}
                href="/dashboard/create-project"
              />
              <QuickAction
                label="FAQs"
                icon={HelpCircle}
                href="/dashboard/faqs"
              />
              <QuickAction label="Users" icon={Users} href="/dashboard/users" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StatCard({ label, value, icon: Icon, color }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between hover:border-pink-500/30 transition-all group cursor-default">
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          {label}
        </p>
        <h3 className="text-3xl font-black mt-1 group-hover:scale-105 transition-transform origin-left text-slate-900 dark:text-white">
          {value || 0}
        </h3>
      </div>
      <div
        className={`p-4 ${color} rounded-2xl text-white shadow-lg shadow-opacity-20`}
      >
        <Icon size={24} strokeWidth={2.5} />
      </div>
    </div>
  );
}

function QuickAction({ label, icon: Icon, href }: any) {
  return (
    <Link href={href}>
      <button className="w-full flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-pink-50 dark:hover:bg-pink-900/10 hover:text-pink-500 transition-all border border-transparent hover:border-pink-500/20 group">
        <Icon
          size={20}
          className="mb-2 group-hover:scale-110 transition-transform"
        />
        <span className="text-[10px] font-bold uppercase tracking-tighter text-center">
          {label}
        </span>
      </button>
    </Link>
  );
}

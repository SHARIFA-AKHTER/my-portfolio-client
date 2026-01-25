/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link"; 
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, PlusCircle, LogOut, FileText, 
  Briefcase, Mail, Sun, Moon, Users, 
  MessageSquare, HelpCircle, Send, LayoutDashboard, Settings, Menu, X
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useTheme } from "next-themes"; 
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const [user, setUser] = useState<any>(null);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false); 

  useEffect(() => {
    setMounted(true);
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login"; 
  };

  if (!mounted) return null;

  const menuGroups = [
    {
      label: "Main",
      links: [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "Home Site", href: "/", icon: Home },
      ]
    },
    {
      label: "Content",
      links: [
        { name: "Projects", href: "/dashboard/projects", icon: Briefcase },
        { name: "Create Project", href: "/dashboard/create-project", icon: PlusCircle },
        { name: "Blogs", href: "/dashboard/blogs", icon: FileText },
        { name: "Create Blog", href: "/dashboard/create-blog", icon: PlusCircle },
      ]
    },
    {
      label: "Interactions", 
      links: [
        { name: "Testimonials", href: "/dashboard/testimonials", icon: MessageSquare },
        { name: "All Contacts", href: "/dashboard/contacts", icon: Mail },
        { name: "Newsletter", href: "/dashboard/newsletter", icon: Send },
        { name: "Faqs", href: "/dashboard/faqs", icon: HelpCircle },
      ]
    },
    {
      label: "System",
      links: [
        { name: "Users", href: "/dashboard/users", icon: Users },
        { name: "Profile", href: "/dashboard/profile", icon: Settings },
      ]
    }
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-4 left-4 z-60">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-xl shadow-xl bg-white dark:bg-slate-900 border-pink-500/20 text-pink-500"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Backdrop for Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-950 border-r transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:block shadow-2xl lg:shadow-none",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        
        {/* Logo Section */}
        <div className="p-8 flex items-center gap-3">
          <div className="h-10 w-10 bg-linear-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-pink-500/20">
            <LayoutDashboard size={20} />
          </div>
          <div>
            <span className="font-black text-xl tracking-tight block leading-none text-slate-900 dark:text-white">KAIZEN</span>
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Admin Panel</span>
          </div>
        </div>

        {/* Navigation - Scrollable Area */}
        <nav className="flex-1 px-4 space-y-6 overflow-y-auto h-[calc(100vh-220px)] custom-scrollbar pb-10">
          {menuGroups.map((group, idx) => (
            <div key={idx} className="space-y-2">
              <h4 className="px-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                {group.label}
              </h4>
              <div className="space-y-1">
                {group.links.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200 relative",
                        isActive 
                          ? "bg-pink-50 dark:bg-pink-950/30 text-pink-600 dark:text-pink-400" 
                          : "hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
                      )}
                    >
                      {isActive && (
                        <motion.div 
                          layoutId="activeNav"
                          className="absolute left-0 w-1 h-6 bg-pink-500 rounded-r-full" 
                        />
                      )}
                      <Icon className={cn("h-5 w-5", isActive ? "text-pink-500" : "group-hover:text-pink-500")} />
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer Actions */}
        <div className="p-6 border-t bg-slate-50/50 dark:bg-slate-900/20 space-y-4 mt-auto">
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-xl border-slate-200 dark:border-slate-800 gap-2 h-10"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun size={14} className="text-yellow-500" /> : <Moon size={14} className="text-blue-500" />}
              <span className="text-[10px] uppercase font-bold tracking-tighter">Theme</span>
            </Button>

            <Button
              variant="destructive"
              size="sm"
              className="rounded-xl gap-2 bg-rose-500 h-10 shadow-lg shadow-rose-500/20"
              onClick={handleLogout}
            >
              <LogOut size={14} />
              <span className="text-[10px] uppercase font-bold tracking-tighter">Exit</span>
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}

// "use client";
 
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { usePathname } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   Home, PlusCircle, LogOut, FileText, 
//   Briefcase, Mail, Sun, Moon, Users, 
//   MessageSquare, HelpCircle, Send, LayoutDashboard, Settings, Menu, X
// } from "lucide-react";
// import { Button } from "../../../components/ui/button";
// import { useTheme } from "next-themes"; 
// import { cn } from "@/lib/utils";

// export default function Sidebar() {
//   const [user, setUser] = useState<any>(null);
//   const { theme, setTheme } = useTheme();
//   const pathname = usePathname();
//   const [mounted, setMounted] = useState(false);
//   const [isOpen, setIsOpen] = useState(false); 

//   useEffect(() => {
//     setMounted(true);
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) setUser(JSON.parse(storedUser));
//   }, []);

//   useEffect(() => {
//     setIsOpen(false);
//   }, [pathname]);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     window.location.href = "/login"; 
//   };

//   if (!mounted) return null;

//   const menuGroups = [
//     {
//       label: "Main",
//       links: [
//         { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
//         { name: "Home Site", href: "/", icon: Home },
//       ]
//     },
//     {
//       label: "Content",
//       links: [
//         { name: "Projects", href: "/dashboard/projects", icon: Briefcase },
//         { name: "Create Project", href: "/dashboard/create-project", icon: PlusCircle },
//         { name: "Blogs", href: "/dashboard/blogs", icon: FileText },
//         { name: "Create Blog", href: "/dashboard/create-blog", icon: PlusCircle },
//       ]
//     },
    // {
    //   label: "Interactions",
    //   links: [
    //     { name: "Testimonials", href: "/dashboard/testimonials", icon: MessageSquare },
    //     { name: "All Contacts", href: "/dashboard/contacts", icon: Mail },
    //     { name: "Newsletter", href: "/dashboard/newsletter", icon: Send },
    //     { name: "Faqs", href: "/dashboard/faqs", icon: HelpCircle },
    //   ]
    // },
//     {
//       label: "System",
//       links: [
//         { name: "Users", href: "/dashboard/users", icon: Users },
//         { name: "Profile", href: "/dashboard/profile", icon: Settings },
//       ]
//     }
//   ];

//   return (
//     <>

//       <div className="lg:hidden fixed top-4 left-4 z-50">
//         <Button 
//           variant="outline" 
//           size="icon" 
//           onClick={() => setIsOpen(!isOpen)}
//           className="rounded-full shadow-lg bg-background"
//         >
//           {isOpen ? <X size={20} /> : <Menu size={20} />}
//         </Button>
//       </div>

//       {/* Backdrop for Mobile */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setIsOpen(false)}
//             className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
//           />
//         )}
//       </AnimatePresence>

//       {/* Sidebar Main Content */}
//       <aside className={cn(
//         "fixed inset-y-0 left-0 z-40 w-72 bg-white dark:bg-slate-950 border-r transition-transform duration-300 lg:translate-x-0 lg:static lg:block",
//         isOpen ? "translate-x-0" : "-translate-x-full"
//       )}>
        
//         {/* Brand Logo Section */}
//         <div className="p-8 flex items-center gap-3">
//           <div className="h-10 w-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center text-white shadow-lg">
//             <LayoutDashboard size={20} />
//           </div>
//           <div>
//             <span className="font-black text-xl tracking-tight block leading-none">KAIZEN</span>
//             <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Admin Panel</span>
//           </div>
//         </div>

//         {/* Navigation Groups */}
//         <nav className="flex-1 px-4 space-y-8 overflow-y-auto custom-scrollbar pb-6 h-[calc(100vh-250px)]">
//           {menuGroups.map((group, idx) => (
//             <div key={idx} className="space-y-2">
//               <h4 className="px-4 text-[11px] font-black uppercase tracking-widest text-slate-400">
//                 {group.label}
//               </h4>
//               <div className="space-y-1">
//                 {group.links.map((link) => {
//                   const Icon = link.icon;
//                   const isActive = pathname === link.href;
//                   return (
//                     <Link
//                       key={link.href}
//                       href={link.href}
//                       className={cn(
//                         "group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200 relative",
//                         isActive 
//                           ? "bg-pink-50 dark:bg-pink-950/30 text-pink-600 dark:text-pink-400" 
//                           : "hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-500 hover:text-slate-900"
//                       )}
//                     >
//                       {isActive && (
//                         <motion.div 
//                           layoutId="activeNav"
//                           className="absolute left-0 w-1 h-6 bg-pink-500 rounded-r-full" 
//                         />
//                       )}
//                       <Icon className={cn("h-5 w-5", isActive ? "text-pink-500" : "group-hover:text-pink-500")} />
//                       {link.name}
//                     </Link>
//                   );
//                 })}
//               </div>
//             </div>
//           ))}
//         </nav>

//         {/* Bottom Footer Section */}
//         <div className="p-6 border-t bg-slate-50/50 dark:bg-slate-900/20 space-y-4">
//           <div className="grid grid-cols-2 gap-2">
//             <Button
//               variant="outline"
//               size="sm"
//               className="rounded-xl border-slate-200 dark:border-slate-800 gap-2"
//               onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//             >
//               {theme === "dark" ? <Sun size={14} className="text-yellow-500" /> : <Moon size={14} className="text-blue-500" />}
//               <span className="text-[10px] uppercase font-bold tracking-tighter">Theme</span>
//             </Button>

//             <Button
//               variant="destructive"
//               size="sm"
//               className="rounded-xl gap-2 bg-rose-500"
//               onClick={handleLogout}
//             >
//               <LogOut size={14} />
//               <span className="text-[10px] uppercase font-bold tracking-tighter">Exit</span>
//             </Button>
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// }
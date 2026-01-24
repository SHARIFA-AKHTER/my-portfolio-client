// /* eslint-disable @typescript-eslint/no-explicit-any */

// "use client";

// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { Home, PlusCircle, LogOut, FileText } from "lucide-react";
// import { Button } from "../../../components/ui/button";

// export default function Sidebar() {
//   const [user, setUser] = useState<any>(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) setUser(JSON.parse(storedUser));
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//     window.location.href = "/login"; 
//   };

//   return (
//     <aside className="flex min-h-screen w-64 flex-col border-r bg-orange-900 text-white">
//       {/* Top navigation */}
//       <nav className="flex-1 space-y-2 p-4">
//         <Link
//           href="/"
//           className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-orange-800 transition-colors"
//         >
//           <Home className="h-4 w-4" />
//           Home
//         </Link>

//         <Link
//           href="/dashboard/create-blog"
//           className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-orange-800 transition-colors"
//         >
//           <PlusCircle className="h-4 w-4" />
//           Create Blog
//         </Link>

//         <Link
//           href="/dashboard/blogs"
//           className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-orange-800 transition-colors"
//         >
//           <FileText className="h-4 w-4" />
//           Blogs
//         </Link>

//         <Link
//           href="/dashboard/create-project"
//           className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-orange-800 transition-colors"
//         >
//           <PlusCircle className="h-4 w-4" />
//           Create Projects
//         </Link>

//         <Link
//           href="/dashboard/projects"
//           className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-orange-800 transition-colors"
//         >
//           <PlusCircle className="h-4 w-4" />
//           All Projects
//         </Link>

//         <Link
//           href="/dashboard/contacts"
//           className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-orange-800 transition-colors"
//         >
//           <PlusCircle className="h-4 w-4" />
//           All Contacts
//         </Link>
//       </nav>

//       {/* Bottom action */}
//       {user && (
//         <div className="p-4 border-t border-gray-500">
//           <Button
//             variant="destructive"
//             className="w-full justify-start gap-2 cursor-pointer"
//             onClick={handleLogout}
//           >
//             <LogOut className="h-4 w-4" />
//             Logout
//           </Button>
//         </div>
//       )}
//     </aside>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { 
  Home, PlusCircle, LogOut, FileText, 
  Briefcase, Mail, Sun, Moon
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useTheme } from "next-themes"; 
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const [user, setUser] = useState<any>(null);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login"; 
  };

  if (!mounted) return null;

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Create Blog", href: "/dashboard/create-blog", icon: PlusCircle },
    { name: "Blogs", href: "/dashboard/blogs", icon: FileText },
    { name: "Create Projects", href: "/dashboard/create-project", icon: PlusCircle },
    { name: "All Projects", href: "/dashboard/projects", icon: Briefcase },
    { name: "All Contacts", href: "/dashboard/contacts", icon: Mail },
  ];

  return (
    <aside className="flex min-h-screen w-64 flex-col border-r bg-card text-card-foreground transition-colors duration-300">
      
      {/* Brand Logo / Navbar Header */}
      <div className="p-6 border-b flex items-center gap-3">
        <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
          D
        </div>
        <span className="font-bold text-xl tracking-tight">Dashboard</span>
      </div>

      {/* Top navigation */}
      <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "hover:bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section: Theme Toggle & Logout */}
      <div className="p-4 border-t space-y-2 bg-secondary/20">
        
        {/* Theme Toggle Button */}
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start gap-3 rounded-xl border-dashed"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <><Sun className="h-4 w-4 text-yellow-500" /> Light Mode</>
          ) : (
            <><Moon className="h-4 w-4 text-blue-500" /> Dark Mode</>
          )}
        </Button>

        {user && (
          <Button
            variant="destructive"
            className="w-full justify-start gap-3 rounded-xl transition-all active:scale-95"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        )}
      </div>
    </aside>
  );
}
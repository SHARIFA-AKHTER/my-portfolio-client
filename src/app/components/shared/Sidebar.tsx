"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, PlusCircle, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function Sidebar() {
  const session = useSession();
  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-black text-white">
      {/* Top navigation */}
      <nav className="flex-1 space-y-2 p-4">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black"
        >
          <Home className="h-4 w-4" />
          Home
        </Link>

        <Link
          href="/dashboard/create-blog"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black"
        >
          <PlusCircle className="h-4 w-4" />
          Create Blog
        </Link>
      </nav>

      {/* Bottom action */}
      <div className="p-4 border-t border-gray-500">
        {session.status === "authenticated" && (
          <Button
            variant="destructive"
            className="w-full justify-start gap-2 cursor-pointer"
            onClick={() => signOut()}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        )}
      </div>
    </aside>
  );
}

// "use client";

// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Home, PlusCircle, LogOut, Menu } from "lucide-react";
// import { signOut, useSession } from "next-auth/react";
// import { usePathname } from "next/navigation";
// import { useState } from "react";

// export default function Sidebar() {
//   const session = useSession();
//   const pathname = usePathname();
//   const [isOpen, setIsOpen] = useState(false);

//   const navItems = [
//     { name: "Home", href: "/", icon: Home },
//     { name: "Create Blog", href: "/dashboard/create-blog", icon: PlusCircle },
//   ];

//   return (
//     <>
//       {/* Mobile Topbar */}
//       <div className="md:hidden flex items-center justify-between px-4 py-3 bg-gray-900 text-white">
//         <div className="text-xl font-bold">
//           My<span className="text-blue-500">Dashboard</span>
//         </div>
//         <button
//           className="p-2 rounded-md bg-gray-800 hover:bg-gray-700"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           <Menu className="h-6 w-6" />
//         </button>
//       </div>

//       {/* Sidebar */}
//       <aside
//         className={`fixed md:static inset-y-0 left-0 transform ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0 transition-transform duration-300 ease-in-out
//         flex h-screen w-64 flex-col border-r border-gray-800 bg-gradient-to-b from-gray-900 to-black text-white shadow-lg z-50`}
//       >
//         {/* Logo / Title */}
//         <div className="hidden md:block px-6 py-4 text-2xl font-bold tracking-wide border-b border-gray-800">
//           My<span className="text-blue-500">Dashboard</span>
//         </div>

//         {/* Top navigation */}
//         <nav className="flex-1 space-y-1 p-4">
//           {navItems.map((item) => {
//             const isActive = pathname === item.href;
//             const Icon = item.icon;

//             return (
//               <Link
//                 key={item.name}
//                 href={item.href}
//                 className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
//                   isActive
//                     ? "bg-blue-600 text-white shadow-md"
//                     : "text-gray-300 hover:bg-gray-800 hover:text-white"
//                 }`}
//                 onClick={() => setIsOpen(false)}
//               >
//                 <Icon className="h-4 w-4" />
//                 {item.name}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Bottom action */}
//         <div className="p-4 border-t border-gray-800">
//           {session.status === "authenticated" && (
//             <Button
//               variant="destructive"
//               className="w-full justify-start gap-2 cursor-pointer rounded-lg"
//               onClick={() => signOut()}
//             >
//               <LogOut className="h-4 w-4" />
//               Logout
//             </Button>
//           )}
//         </div>
//       </aside>

//       {/* Mobile overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
//           onClick={() => setIsOpen(false)}
//         />
//       )}
//     </>
//   );
// }

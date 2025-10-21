/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Home, PlusCircle, LogOut, FileText } from "lucide-react";
import { Button } from "../../../components/ui/button";

export default function Sidebar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login"; 
  };

  return (
    <aside className="flex min-h-screen w-64 flex-col border-r bg-orange-900 text-white">
      {/* Top navigation */}
      <nav className="flex-1 space-y-2 p-4">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-orange-800 transition-colors"
        >
          <Home className="h-4 w-4" />
          Home
        </Link>

        <Link
          href="/dashboard/create-blog"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-orange-800 transition-colors"
        >
          <PlusCircle className="h-4 w-4" />
          Create Blog
        </Link>

        <Link
          href="/dashboard/blogs"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-orange-800 transition-colors"
        >
          <FileText className="h-4 w-4" />
          Blogs
        </Link>

        <Link
          href="/dashboard/create-project"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-orange-800 transition-colors"
        >
          <PlusCircle className="h-4 w-4" />
          Create Projects
        </Link>

        <Link
          href="/dashboard/projects"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-orange-800 transition-colors"
        >
          <PlusCircle className="h-4 w-4" />
          All Projects
        </Link>

        <Link
          href="/dashboard/contacts"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-orange-800 transition-colors"
        >
          <PlusCircle className="h-4 w-4" />
          All Contacts
        </Link>
      </nav>

      {/* Bottom action */}
      {user && (
        <div className="p-4 border-t border-gray-500">
          <Button
            variant="destructive"
            className="w-full justify-start gap-2 cursor-pointer"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      )}
    </aside>
  );
}
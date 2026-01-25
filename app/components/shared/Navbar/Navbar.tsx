
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { Button } from "../../../../components/ui/button";
import ThemeToggle from "../theme-toggle";

const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("User parsing error", error);
      }
    }
  }, []);

  const handleLogout = async () => {

    localStorage.removeItem("user");
   
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  
    await signOut({ callbackUrl: "/login" });
  };


  if (!mounted) return null;

  return (
    <nav className="fixed top-4 inset-x-4 md:top-6 md:inset-x-8 lg:top-8 lg:inset-x-16 h-16 max-w-7xl mx-auto rounded-full bg-background/80 dark:bg-slate-900/80 backdrop-blur-md border shadow-md z-50 transition-all" suppressHydrationWarning>
      <div className="flex h-full items-center justify-between px-4 md:px-6 lg:px-8">
        
        {/* Left - Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Logo />
          <span className="text-purple-600 dark:text-purple-400 font-extrabold text-lg sm:text-xl lg:text-2xl tracking-tight">
            SHARIFA.
          </span>
        </Link>

        {/* Center - Menu */}
        <div className="hidden sm:flex flex-1 justify-center">
          <NavMenu className="flex gap-4 md:gap-8 font-medium" />
        </div>

        {/* Right - Auth Section */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <ThemeToggle />

          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden md:inline text-sm text-muted-foreground font-medium">
                Hi, {user.name?.split(' ')[0] || 'User'}
              </span>
              <Button
                onClick={handleLogout}
                size="sm"
                variant="destructive"
                className="rounded-full px-4 transition-all"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Button size="sm" variant="ghost" className="rounded-full" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm" className="rounded-full bg-purple-600 hover:bg-purple-700 text-white border-none transition-all" asChild>
                <Link href="/register">Register</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Icon */}
          <div className="sm:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
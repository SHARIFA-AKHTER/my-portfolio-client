/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { Button } from "../../../../components/ui/button";

const Navbar = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    // const decodeToken = jwtDecode(JSON.parse(storedUser));
    console.log(storedUser);
    // console.log(decodeToken);
    // if (decodeToken) setUser(decodeToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <nav className="fixed top-4 inset-x-4 md:top-6 md:inset-x-8 lg:top-8 lg:inset-x-16 h-16 max-w-screen-xl mx-auto rounded-full bg-white border shadow-md z-50 transition-all">
      <div className="flex h-full items-center justify-between px-4 md:px-6 lg:px-8">
        {/* Left - Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <Logo />
          <span className="text-purple-600 font-extrabold text-lg sm:text-xl lg:text-2xl tracking-tight">
            SHARIFA.
          </span>
        </Link>

        {/* Center - Desktop & Tablet Menu */}
        <div className="hidden sm:flex flex-1 justify-center">
          <NavMenu className="flex gap-4 md:gap-8 font-medium text-gray-700" />
        </div>

        {/* Right - Auth Section */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-5">
          {user ? (
            <>
              <span className="hidden md:inline text-sm text-gray-600">
                Welcome, {user.email}
              </span>
              <Button
                onClick={handleLogout}
                className="rounded-full px-4 py-2 text-xs sm:text-sm md:text-base bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </Button>
            </>
          ) : (
            <div className="hidden sm:flex gap-2 md:gap-4">
              <Button className="rounded-full px-4 py-2 text-xs sm:text-sm md:text-base bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition-all">
                <Link href="/login" className="block text-center">
                  Login
                </Link>
              </Button>
              <Button className="rounded-full px-4 py-2 text-xs sm:text-sm md:text-base bg-white text-purple-600 border border-purple-600 hover:bg-purple-50 transition-all">
                <Link href="/register" className="block text-center">
                  Register
                </Link>
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

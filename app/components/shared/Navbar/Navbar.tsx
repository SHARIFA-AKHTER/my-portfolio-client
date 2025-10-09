// "use client";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useState } from "react";

// const Navbar = () => {
//   const [isOpen, setOpen] = useState(false);
//  const pathname = usePathname();
//   console.log(pathname);
//   return (
//     <nav className="bg-white shadow-md fixed top-0 w-full z-50">
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-10 py-4">
//         {/* Logo */}
//         <Link href="/" className="text-2xl font-bold">
//           <span className="text-purple-800">SHARIFA .</span>
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex space-x-6 font-medium text-gray-700">
//           <Link href="/" className="hover:text-purple-700 transition-colors">
//             Home
//           </Link>
//           {/* <Link href="/about" className="hover:text-purple-700 transition-colors">
//             About
//           </Link> */}
//             <Link href="/about" className={`${
//          pathname==="/about"?"text-blue-500 font-semibold underline"
//          :"text-gray hover:underline"
//          }`}>
//           About
//          </Link>
//           <Link href="/skills" className="hover:text-purple-700 transition-colors">
//             Skills
//           </Link>
//           <Link href="/projects" className="hover:text-purple-700 transition-colors">
//             Projects
//           </Link>
//           <Link href="/contact" className="hover:text-purple-700 transition-colors">
//             Contact
//           </Link>
//         </div>

//         {/* Mobile Toggle Button */}
//         <button
//           className="md:hidden text-gray-700 text-2xl focus:outline-none"
//           onClick={() => setOpen(!isOpen)}
//         >
//           {isOpen ? "✕" : "☰"}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-gray-50 px-6 py-4 space-y-3 shadow-inner">
//           <Link
//             href="/"
//             className="block hover:text-purple-700 transition-colors"
//             onClick={() => setOpen(false)}
//           >
//             Home
//           </Link>
// <Link
//   href="/about"
//   className="block hover:text-purple-700 transition-colors"
//   onClick={() => setOpen(false)}
// >
//   About
// </Link>
//           <Link
//             href="/skills"
//             className="block hover:text-purple-700 transition-colors"
//             onClick={() => setOpen(false)}
//           >
//             Skills
//           </Link>
//           <Link
//             href="/projects"
//             className="block hover:text-purple-700 transition-colors"
//             onClick={() => setOpen(false)}
//           >
//             Projects
//           </Link>
//           <Link
//             href="/contact"
//             className="block hover:text-purple-700 transition-colors"
//             onClick={() => setOpen(false)}
//           >
//             Contact
//           </Link>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
"use client";

import Link from "next/link";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { Button } from "../../../../components/ui/button";


const Navbar = () => {
  return (
    <nav className="fixed top-4 inset-x-4 md:top-6 md:inset-x-8 lg:top-8 lg:inset-x-16 h-16 max-w-screen-xl mx-auto rounded-full bg-white border shadow z-50">
      <div className="flex h-full items-center justify-between px-4 md:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <Logo />
          <span className="text-purple-500 font-bold text-lg md:text-xl">
            SHARIFA.
          </span>
        </Link>

        {/* Desktop Menu */}
        <NavMenu className="hidden md:flex gap-6 font-medium text-gray-700" />

        {/* Auth + Mobile Hamburger */}
        <div className="flex items-center gap-3 md:gap-6">
          <div className="hidden md:flex gap-3">
            {/* Login Button */}
            <Button className="rounded-full px-4 py-2 text-sm md:text-base bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition-colors">
              <Link href="/login" className="w-full text-center block">
                Login
              </Link>
            </Button>

            {/* Register Button */}
            <Button className="rounded-full px-4 py-2 text-sm md:text-base bg-white text-purple-600 border border-purple-600 hover:bg-purple-50 transition-colors">
              <Link href="/register" className="w-full text-center block">
                Register
              </Link>
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

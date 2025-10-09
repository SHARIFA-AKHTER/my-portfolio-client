"use client";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden pt-12 pb-8 bg-gray-950 text-gray-300">
      {/* Content */}
      <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-20 xl:px-28">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left: Branding */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-semibold text-white">Sharifa</h2>
            <p className="text-sm text-gray-400">
              Full Stack Developer • Next.js & Prisma
            </p>
          </div>

          {/* Center: Navigation */}
          <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm">
            <Link href="/" className="hover:text-teal-400 transition-colors">
              Home
            </Link>
            <Link
              href="/about"
              className="hover:text-teal-400 transition-colors"
            >
              About
            </Link>
            <Link
              href="/projects"
              className="hover:text-teal-400 transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/contact"
              className="hover:text-teal-400 transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Right: Socials */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/"
              target="_blank"
              className="hover:text-teal-400 transition-colors"
            >
              <FaGithub size={18} />
            </a>
            <a  
              href="https://linkedin.com/"
              target="_blank"
              className="hover:text-teal-400 transition-colors"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              className="hover:text-teal-400 transition-colors"
            >
              <FaTwitter size={18} />
            </a>
          </div>
        </div>

        {/* Bottom: Copy */}
        <div className="mt-6 text-center text-xs text-gray-500">
          © {currentYear} Sharifa. Made with ❤️ using Next.js.
        </div>
      </div>
    </footer>
  );
}

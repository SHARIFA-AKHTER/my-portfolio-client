"use client";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-hidden pt-16 pb-8 bg-slate-950 text-slate-300 border-t border-slate-900">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent"></div>

      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Left: Branding & Tagline */}
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-2xl font-black tracking-tight text-white italic">
              SHARIFA<span className="text-teal-500">.</span>
            </h2>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Full Stack Developer • Building Scalable Web Apps
            </p>
          </div>

          {/* Center: Quick Links */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm font-medium">
            <Link href="/" className="hover:text-teal-400 transition-colors">Home</Link>
            <Link href="/about" className="hover:text-teal-400 transition-colors">About</Link>
            <Link href="/projects" className="hover:text-teal-400 transition-colors">Projects</Link>
            <Link href="/contact" className="hover:text-teal-400 transition-colors">Contact</Link>
          </nav>

          {/* Right: Social Links with Real URLs */}
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/SHARIFA-AKHTER"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-900 hover:bg-teal-500/10 hover:text-teal-400 transition-all border border-slate-800"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/sharifa-akhter-dev" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-900 hover:bg-teal-500/10 hover:text-teal-400 transition-all border border-slate-800"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://x.com/AkhterShar40032" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-900 hover:bg-teal-500/10 hover:text-teal-400 transition-all border border-slate-800"
            >
              <FaTwitter size={20} />
            </a>
          </div>
        </div>

        {/* Bottom Line & Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
          <p>© {currentYear} Sharifa. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <span className="text-rose-500">❤️</span> by 
            <span className="text-white ml-1">Sharifa</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

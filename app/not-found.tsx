
"use client";

import Link from "next/link";
import { MoveLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-background transition-colors duration-300 relative overflow-hidden">
      
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl" />

      <div className="z-10 flex flex-col items-center">
        {/* Animated 404 Text */}
        <h1 className="text-[120px] md:text-[180px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-purple-600 to-purple-400 dark:from-purple-400 dark:to-purple-200 animate-in fade-in zoom-in duration-700">
          404
        </h1>

        <div className="mt-4 space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Oops! Page Not Found
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-lg">
            The link you followed might be broken, or the page may have been removed. 
            Don&apos;t worry, let&apos;s get you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Button 
            asChild
            size="lg"
            className="rounded-full bg-purple-600 hover:bg-purple-700 text-white px-8 shadow-lg shadow-purple-500/20"
          >
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Go Back Home
            </Link>
          </Button>

          <Button 
            variant="outline" 
            size="lg"
            className="rounded-full px-8 border-purple-200 dark:border-purple-800"
            onClick={() => window.history.back()}
          >
            <MoveLeft className="w-4 h-4 mr-2" />
            Previous Page
          </Button>
        </div>
      </div>
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
    </section>
  );
};

export default NotFoundPage;
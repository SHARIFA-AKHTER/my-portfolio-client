
import Navbar from "@/app/components/shared/Navbar/Navbar";
import Sidebar from "@/app/components/shared/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen bg-background overflow-hidden relative">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 h-full overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 bg-slate-50/50 dark:bg-slate-950/50">
          
          
          <div className="mx-auto max-w-7xl pt-20 lg:pt-12"> 
            {children}
          </div>
          
        </main>
      </div>
    </div>
  );
}
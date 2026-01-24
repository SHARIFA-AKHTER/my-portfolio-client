// import Sidebar from "../../components/shared/Sidebar";

// export default function DashboardLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <main className="min-h-dvh flex gap-4">
//       <Sidebar />
//       {children}
//     </main>
//   );
// }


import Navbar from "@/app/components/shared/Navbar/Navbar";
import Sidebar from "../../components/shared/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
 
      <Sidebar />

   
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        
       
        <Navbar/>

       
        <main className="flex-1 p-4 md:p-6 lg:p-8 transition-all duration-300">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}
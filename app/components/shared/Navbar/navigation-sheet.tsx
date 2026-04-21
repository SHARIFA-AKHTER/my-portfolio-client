
// import { Menu } from "lucide-react";
// import { NavMenu } from "./nav-menu";
// import { Logo } from "./logo";
// import Link from "next/link";
// import { Sheet, SheetContent, SheetTrigger } from "../../../../components/ui/sheet";
// import { Button } from "../../../../components/ui/button";


// export const NavigationSheet = () => {
//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <Button variant="outline" size="icon" className="rounded-full">
//           <Menu />
//         </Button>
//       </SheetTrigger>
//       <SheetContent>
//         <div className="flex items-center gap-2 mb-6">
//           <Logo />
//           <span className="text-purple-800 font-bold text-lg">SHARIFA.</span>
//         </div>
//         <NavMenu orientation="vertical" className="mt-12" />
//         <div className="mt-8">
//           <Button className="w-full mb-2">
//             <Link href="/login">Login</Link>
//           </Button>
//           <Button className="w-full" variant="outline">
//             <Link href="/register">Register</Link>
//           </Button>
//         </div>
//       </SheetContent>
//     </Sheet>
//   );
// };
import { Menu } from "lucide-react";
import { NavMenu } from "./nav-menu";
import { Logo } from "./logo";
import { Sheet, SheetContent, SheetTrigger } from "../../../../components/ui/sheet";
import { Button } from "../../../../components/ui/button";

export const NavigationSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        {/* Logo Section */}
        <div className="flex items-center gap-2 mb-8 mt-4">
      
          <span className="text-purple-600 dark:text-purple-400 font-bold text-xl">
            SHARIFA.
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-4">
          <NavMenu orientation="vertical" className="flex flex-col gap-6 text-lg font-medium" />
        </div>

      </SheetContent>
    </Sheet>
  );
};
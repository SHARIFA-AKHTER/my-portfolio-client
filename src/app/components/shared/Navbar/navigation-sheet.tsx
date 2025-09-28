import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { NavMenu } from "./nav-menu";
import { Logo } from "./logo";
import Link from "next/link";

// export const NavigationSheet = () => {
//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <Button variant="outline" size="icon" className="rounded-full">
//           <Menu />
//         </Button>
//       </SheetTrigger>
//       <SheetContent>
//         {/* <Logo />
//          */}
//          Logo
//         <NavMenu orientation="vertical" className="mt-12" />
//       </SheetContent>
//     </Sheet>
//   );
// };

export const NavigationSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="flex items-center gap-2 mb-6">
          <Logo />
          <span className="text-purple-800 font-bold text-lg">SHARIFA.</span>
        </div>
        <NavMenu orientation="vertical" className="mt-12" />
        <div className="mt-8">
          <Button className="w-full mb-2">
            <Link href="/login">Login</Link>
          </Button>
          <Button className="w-full" variant="outline">
            <Link href="/register">Register</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

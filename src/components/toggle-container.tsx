import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { NavigationRoutes } from "./Navigation-routes";
import { useAuth } from "@clerk/clerk-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

export const ToggleContainer = () => {
  const { userId } = useAuth();

  return (
    <Sheet>
      <SheetTrigger className="block md:hidden text-white">
        <Menu className="h-6 w-6 text-white" />
      </SheetTrigger>
      <SheetContent className="bg-[#0f172a] border-none text-white">
        <SheetHeader>
          <SheetTitle className="text-white">Navigation</SheetTitle>
        </SheetHeader>
        <nav className="gap-6 flex flex-col items-start">
          <NavigationRoutes isMobile />
          {userId && (
            <NavLink
              to={"/generate"}
              className={({ isActive }) =>
                cn(
                  "text-base text-gray-300 hover:text-white transition-colors",
                  isActive && "text-white font-semibold"
                )
              }
            >
              Take An Interview
            </NavLink>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

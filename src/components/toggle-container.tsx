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
import { useState } from "react";

export const ToggleContainer = () => {
  const { userId } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="block md:hidden text-white" onClick={() => setOpen(true)}>
        <Menu className="h-6 w-6 text-white" />
      </SheetTrigger>
      <SheetContent className="bg-[#0f172a] border-none text-white">
        <SheetHeader>
          <SheetTitle className="text-white"></SheetTitle>
        </SheetHeader>
        <nav className="gap-6 flex flex-col items-start">
          <NavigationRoutes isMobile onClose={() => setOpen(false)} />
          {userId && (
            <NavLink
              to={"/generate"}
              className={({ isActive }) =>
                cn(
                  "text-base text-gray-300 hover:text-white transition-colors",
                  isActive && "text-white font-semibold"
                )
              }
              onClick={() => setOpen(false)}
            >
              Take An Interview
            </NavLink>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

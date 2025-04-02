import { MainRoutes } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

interface NavigationRoutesProps {
  isMobile?: boolean;
  onClose?: () => void; // Added prop
}

export const NavigationRoutes = ({
  isMobile = false,
  onClose, // Destructure onClose
}: NavigationRoutesProps) => {
  return (
    <ul
      className={cn(
        "flex items-center gap-6",
        isMobile && "items-start flex-col gap-8"
      )}
    >
      {MainRoutes.map((route) => (
        <NavLink
          key={route.href}
          to={route.href}
          className={({ isActive }) =>
            cn(
              "text-base text-gray-300 hover:text-white transition-colors duration-200",
              isActive && "text-blue-500 font-semibold"
            )
          }
          onClick={onClose} // Close menu on click
        >
          {route.label}
        </NavLink>
      ))}
    </ul>
  );
};

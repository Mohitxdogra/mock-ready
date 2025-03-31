import { cn } from "../lib/utils";
import { useAuth } from "@clerk/clerk-react";
import { Container } from "./container";
import { LogoContainer } from "./logo-container";
import { NavigationRoutes } from "./Navigation-routes";
import { NavLink } from "react-router-dom";
import { ProfileContainer } from "./profile-container";
import { ToggleContainer } from "./toggle-container";

const Header = () => {
  const { userId } = useAuth();

  return (
    <header className={cn("w-full bg-gray-900 border-b border-gray-800 sticky top-0 z-50")}>
      <Container>
        <div className="flex items-center gap-4 w-full py-4">
          {/* Logo section */}
          <LogoContainer />

          {/* Nav section */}
          <nav className="hidden md:flex items-center gap-3">
            <NavigationRoutes />
            {userId && (
              <NavLink
                to={"/generate"}
                className={({ isActive }) =>
                  cn(
                    "text-base text-gray-300 hover:text-white transition-colors duration-200",
                    isActive && "text-blue-500 font-semibold"
                  )
                }
              >
                Take an Interview
              </NavLink>
            )}
          </nav>

          {/* Right-side controls */}
          <div className="ml-auto flex items-center gap-6">
            {/* Profile Section */}
            <ProfileContainer />

            {/* Mobile Toggle Section */}
            <ToggleContainer />
          </div> 
        </div>
      </Container>
    </header>
  );
};

export default Header;

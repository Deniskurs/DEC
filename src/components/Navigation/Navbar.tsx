// src/components/Navigation/Navbar.tsx
import React from "react";
import { Squeeze } from "hamburger-react";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";

interface NavbarProps {
  scrolled: boolean;
  isDarkBackground: boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  hidden: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  scrolled,
  isDarkBackground,
  isMenuOpen,
  setIsMenuOpen,
  hidden,
}) => {
  // Set text and background classes based on isDarkBackground
  const navTextColorClass = isDarkBackground
    ? "text-cream-50"
    : "text-rich-blue-800";
  const navHoverColorClass = isDarkBackground
    ? "hover:text-cream-100"
    : "hover:text-rich-blue-600";
  const buttonBgClass = isDarkBackground
    ? "hover:bg-cream-50/10"
    : "hover:bg-rich-blue-100/30";

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[9999] transform transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } pointer-events-auto`}
    >
      <div className="max-w-[100vw] mx-auto pointer-events-auto">
        <div className="px-4 sm:px-8 py-4 sm:py-6 pointer-events-auto">
          <nav
            className={`navbar-gradient neumorphic mx-auto max-w-7xl rounded-[2.5rem] relative z-10 pointer-events-auto transition-all duration-500 ${
              scrolled ? "shadow-lg backdrop-blur-2xl" : ""
            } ${isDarkBackground ? "dark-mode" : "light-mode"}`}
          >
            <div className="px-4 sm:px-8 py-4 pointer-events-auto">
              <div className="flex justify-between items-center pointer-events-auto">
                <a
                  href="/"
                  className="flex items-center group relative w-32 h-10 pointer-events-auto"
                >
                  <img
                    src="/images/logolight.png"
                    alt="Delta Edge Capital"
                    className={`absolute inset-0 h-full w-full object-contain transition-all duration-500 transform group-hover:scale-105 ${
                      isDarkBackground
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-1"
                    } pointer-events-auto`}
                  />
                  <img
                    src="/images/logodark.png"
                    alt="Delta Edge Capital"
                    className={`absolute inset-0 h-full w-full object-contain transition-all duration-500 transform group-hover:scale-105 ${
                      isDarkBackground
                        ? "opacity-0 -translate-y-1"
                        : "opacity-100 translate-y-0"
                    } pointer-events-auto`}
                  />
                </a>
                <NavLinks
                  navTextColorClass={navTextColorClass}
                  navHoverColorClass={navHoverColorClass}
                  buttonBgClass={buttonBgClass}
                  isDarkBackground={isDarkBackground}
                />
                <div className="md:hidden pointer-events-auto">
                  <Squeeze
                    toggled={isMenuOpen}
                    toggle={setIsMenuOpen}
                    size={24}
                    color={isDarkBackground ? "#fcf9f0" : "#002966"}
                    duration={0.3}
                    distance="sm"
                    rounded
                    hideOutline={false}
                    label="Menu"
                    className={`relative z-50 p-2 rounded-xl ${buttonBgClass} transition-all duration-300 pointer-events-auto`}
                  />
                </div>
              </div>
            </div>
          </nav>
        </div>
        <MobileMenu
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          navTextColorClass={navTextColorClass}
          navHoverColorClass={navHoverColorClass}
          buttonBgClass={buttonBgClass}
          isDarkBackground={isDarkBackground}
        />
      </div>
    </div>
  );
};

export default Navbar;

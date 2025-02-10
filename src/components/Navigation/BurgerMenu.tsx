// src/components/Navigation/MobileMenu.tsx
import React, { useEffect } from "react";
import { LuChevronRight } from "react-icons/lu";

interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  navTextColorClass: string;
  navHoverColorClass: string;
  buttonBgClass: string;
  isDarkBackground: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isMenuOpen,
  setIsMenuOpen,
  navTextColorClass,
  navHoverColorClass,
  isDarkBackground,
}) => {
  // Prevent scrolling on body when the menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Define the mobile nav items (matching the desktop nav items)
  const menuItems = [
    { label: "About", href: "#about" },
    { label: "Problem", href: "#problem" },
    { label: "Features", href: "#features" },
    { label: "Performance", href: "#performance" },
    { label: "Liquidity", href: "#liquidity" },
    { label: "FAQ", href: "#faq" },
    { label: "Enquire", href: "/enquiry" },
  ];

  return (
    <div
      className={`
        fixed 
        left-0 
        right-0 
        top-[5.5rem] 
        bottom-0 
        z-40
        transition-all
        duration-500
        ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }
      `}
    >
      {/* Backdrop to close the menu when clicked */}
      <div
        className="absolute inset-0 bg-black/0"
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Slide-down container for the actual menu content */}
      <div
        className={`
          relative 
          w-full 
          h-full
          transform 
          transition-transform 
          duration-500
          ${isMenuOpen ? "translate-y-0" : "-translate-y-10"}
        `}
      >
        <div className="px-4 sm:px-8 mx-auto max-w-7xl mt-8">
          <div className="relative">
            {/* Gradient Border */}
            <div className="absolute -inset-px rounded-[2.5rem] overflow-hidden pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-cream-50/30 via-rich-blue-500/30 to-cream-50/30 animate-borderRotate" />
            </div>

            {/* Menu Content */}
            <div
              className={`
                rounded-[2.5rem] 
                relative 
                overflow-hidden 
                backdrop-blur-xl 
                ${
                  isDarkBackground
                    ? "bg-gradient-to-br from-rich-blue-900/80 via-rich-blue-800/80 to-rich-blue-900/80"
                    : "bg-gradient-to-br from-cream-50/90 via-white/80 to-cream-50/90"
                }
              `}
            >
              <div className="relative z-10 px-6 py-8 sm:px-8">
                {/* Navigation Links */}
                <nav className="space-y-4">
                  {menuItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className={`
                        group 
                        flex 
                        items-center 
                        text-xl 
                        font-medium 
                        ${navTextColorClass} 
                        ${navHoverColorClass} 
                        transition-all 
                        duration-300
                      `}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="relative">
                        {item.label}
                        <span
                          className={`
                            absolute 
                            -bottom-1 
                            left-0 
                            w-full 
                            h-[2px] 
                            transform 
                            origin-left 
                            scale-x-0 
                            transition-transform 
                            duration-300 
                            group-hover:scale-x-100
                            ${
                              isDarkBackground
                                ? "bg-cream-50"
                                : "bg-rich-blue-500"
                            }
                          `}
                        />
                      </span>
                      <LuChevronRight
                        className={`
                          ml-2 
                          h-5 
                          w-5 
                          opacity-0 
                          transform 
                          -translate-x-2 
                          transition-all 
                          duration-300 
                          group-hover:opacity-100 
                          group-hover:translate-x-0
                          ${
                            isDarkBackground
                              ? "text-cream-50"
                              : "text-rich-blue-500"
                          }
                        `}
                      />
                    </a>
                  ))}
                </nav>

                {/* CTA Button */}
                <div className="mt-8">
                  <a
                    href="/portal"
                    className={`
                      block 
                      w-full 
                      text-center 
                      ${
                        isDarkBackground
                          ? "bg-cream-50 text-rich-blue-800 hover:bg-cream-100"
                          : "bg-gradient-to-r from-rich-blue-600 to-rich-blue-700 text-white"
                      } 
                      px-8 
                      py-4 
                      rounded-xl 
                      font-bold 
                      shadow-lg 
                      hover:shadow-xl 
                      transform 
                      hover:-translate-y-1 
                      transition-all 
                      duration-300 
                      relative 
                      overflow-hidden 
                      group
                    `}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      Investor Portal
                      <LuChevronRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-rich-blue-500/0 via-rich-blue-500/30 to-rich-blue-500/0 skeleton-animation" />
                  </a>
                </div>

                {/* Social Links */}
                <div className="mt-8 flex justify-center space-x-6">
                  {["Twitter", "LinkedIn", "Instagram"].map((social) => (
                    <a
                      key={social}
                      href={`#${social.toLowerCase()}`}
                      className={`
                        ${navTextColorClass} 
                        ${navHoverColorClass} 
                        transition-colors 
                        duration-300 
                        text-sm 
                        font-medium
                      `}
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

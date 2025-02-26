// src/components/Navigation/MobileMenu.tsx
import React, { useEffect } from "react";
import { LuChevronRight } from "react-icons/lu";
import { Link } from "react-router-dom";

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
  buttonBgClass,
  isDarkBackground,
}) => {
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

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
        fixed left-0 right-0 top-[5.5rem] bottom-0 z-40 transition-all duration-500
        ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none" 
        }
      `}
      aria-hidden={!isMenuOpen}
    >
      {/* Original backdrop as provided */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(252,249,240,0.15),transparent_60%)]"
        onClick={() => setIsMenuOpen(false)}
      />
      <div
        className={`
          relative w-full h-full transform transition-transform duration-500
          ${isMenuOpen ? "translate-y-0" : "-translate-y-10"}
        `}
      >
        <div className="px-4 sm:px-8 mx-auto max-w-7xl mt-8">
          <div className="relative">
            {/* Original animated gradient border */}
            <div className="absolute -inset-px rounded-[2.5rem] overflow-hidden pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-cream-50/30 via-rich-blue-500/30 to-cream-50/30 animate-borderRotate" />
            </div>
            {/* Preserve original background */}
            <div
              className={`
                rounded-[2.5rem] relative overflow-hidden backdrop-blur-xl 
                ${
                  isDarkBackground
                    ? "bg-gradient-to-br from-rich-blue-900/80 via-rich-blue-800/80 to-rich-blue-900/80"
                    : "bg-gradient-to-br from-cream-50/90 via-white/80 to-cream-50/90"
                }
              `}
            >
              <div className="relative z-10 px-6 py-8 sm:px-8">
                <nav className="space-y-4">
                  {menuItems.map((item) => (
                    <div key={item.label} className="group relative">
                      {item.href.startsWith("#") ? (
                        <Link
                          to={{ pathname: "/", hash: item.href }}
                          onClick={() => setIsMenuOpen(false)}
                          className="block text-xl font-medium text-cream-50 transition-transform duration-300 transform group-hover:-translate-y-1 group-hover:scale-105 relative"
                          tabIndex={isMenuOpen ? 0 : -1}
                          aria-hidden={!isMenuOpen}
                        >
                          <span className="relative z-10">{item.label}</span>
                          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                      ) : (
                        <Link
                          to={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="block text-xl font-medium text-cream-50 transition-transform duration-300 transform group-hover:-translate-y-1 group-hover:scale-105 relative"
                          tabIndex={isMenuOpen ? 0 : -1}
                          aria-hidden={!isMenuOpen}
                        >
                          <span className="relative z-10">{item.label}</span>
                          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>
                <div className="mt-8">
                  <Link
                    to="/portal"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full py-3.5 text-center rounded-xl font-bold relative overflow-hidden group transition-all duration-300 shadow-lg"
                    style={{
                      background: "linear-gradient(135deg, #1E3A8A, #2563EB)",
                    }}
                    tabIndex={isMenuOpen ? 0 : -1}
                    aria-hidden={!isMenuOpen}
                  >
                    <span className="relative z-10 inline-flex items-center justify-center text-white transform transition-transform duration-300 group-hover:scale-105">
                      <span className="mr-2">Investor Portal</span>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                    <span
                      className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-300 bg-gradient-to-r from-blue-600/40 to-blue-400/40"
                    ></span>
                  </Link>
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

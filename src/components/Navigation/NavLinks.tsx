// src/components/Navigation/NavLinks.tsx
import React from "react";
import { Link } from "react-router-dom";

interface NavLinksProps {
  navTextColorClass: string;
  navHoverColorClass: string;
  buttonBgClass: string;
  isDarkBackground: boolean; // kept for compatibility
}

const NavLinks: React.FC<NavLinksProps> = ({
  navTextColorClass,
  buttonBgClass,
}) => {
  const navItems = [
    { label: "About", href: "#about" },
    { label: "Problem", href: "#problem" },
    { label: "Features", href: "#features" },
    { label: "Performance", href: "#performance" },
    { label: "Liquidity", href: "#liquidity" },
    { label: "FAQ", href: "#faq" },
    { label: "Enquire", href: "/enquir" },
  ];

  return (
    <ul className="hidden md:flex items-center space-x-8 pointer-events-auto">
      {navItems.map((item) => (
        <li key={item.label} className="relative group">
          {item.href.startsWith("#") ? (
            <Link
              to={{ pathname: "/", hash: item.href }}
              className={`inline-block ${navTextColorClass} transition-transform duration-300 transform group-hover:-translate-y-1 group-hover:scale-105`}
            >
              <span className="relative z-10">{item.label}</span>
              {/* Animated gradient underline */}
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-blue-300 group-hover:w-full transition-all duration-300"></span>
            </Link>
          ) : (
            <Link
              to={item.href}
              className={`inline-block ${navTextColorClass} transition-transform duration-300 transform group-hover:-translate-y-1 group-hover:scale-105`}
            >
              <span className="relative z-10">{item.label}</span>
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-blue-300 group-hover:w-full transition-all duration-300"></span>
            </Link>
          )}
        </li>
      ))}
      {/* Desktop CTA Button */}
      <li>
        <Link
          to="/portal"
          className={`relative inline-block px-6 py-2 rounded-xl font-bold overflow-hidden group transition-all duration-300 ${buttonBgClass}`}
        >
          <span className="relative z-10 transform transition-transform duration-300 group-hover:scale-105">
            Investor Portal
          </span>
          {/* Gradient overlay effect */}
          <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-70 transition-opacity duration-300"></span>
        </Link>
      </li>
    </ul>
  );
};

export default NavLinks;

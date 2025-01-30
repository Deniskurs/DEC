import React from "react";

interface NavLinksProps {
  navTextColorClass: string;
  navHoverColorClass: string;
  buttonBgClass: string;
  isDarkBackground: boolean;
}

const NavLinks: React.FC<NavLinksProps> = ({
  navTextColorClass,
  navHoverColorClass,
  buttonBgClass,
  isDarkBackground,
}) => {
  return (
    <ul className="hidden md:flex items-center space-x-8">
      {/* Example Desktop Nav Items */}
      <li>
        <a
          href="#about"
          className={`${navTextColorClass} ${navHoverColorClass} transition-colors duration-300`}
        >
          About
        </a>
      </li>
      <li>
        <a
          href="#services"
          className={`${navTextColorClass} ${navHoverColorClass} transition-colors duration-300`}
        >
          Services
        </a>
      </li>
      <li>
        <a
          href="#performance"
          className={`${navTextColorClass} ${navHoverColorClass} transition-colors duration-300`}
        >
          Performance
        </a>
      </li>
      <li>
        <a
          href="#contact"
          className={`${navTextColorClass} ${navHoverColorClass} transition-colors duration-300`}
        >
          Contact
        </a>
      </li>
      {/* Desktop CTA Button */}
      <li>
        <a
          href="/portal"
          className={`
            px-6 
            py-2 
            rounded-xl 
            font-bold 
            transition-all 
            duration-300 
            ${buttonBgClass}
          `}
        >
          Investor Portal
        </a>
      </li>
    </ul>
  );
};

export default NavLinks;

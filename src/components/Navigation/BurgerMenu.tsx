import React from "react";

interface BurgerMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  isDarkMode?: boolean;
  className?: string;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({
  isOpen,
  onToggle,
  isDarkMode = false,
  className = "",
}) => {
  return (
    <button
      type="button"
      className={`
        burger-menu 
        relative 
        flex 
        items-center 
        justify-center
        ${isOpen ? "active" : ""} 
        ${isDarkMode ? "dark-mode" : ""} 
        ${className}
      `}
      onClick={onToggle}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
    >
      <div className="burger-lines relative w-6 h-6 flex flex-col items-center justify-center">
        <span
          className={`
            burger-line 
            block w-6 h-[2px] bg-current 
            transition-all duration-300 ease-in-out
            ${isOpen ? "translate-y-[8px] rotate-45" : ""}
          `}
        />
        <span
          className={`
            burger-line 
            block w-6 h-[2px] bg-current 
            my-1 
            transition-all duration-300 ease-in-out
            ${isOpen ? "opacity-0" : ""}
          `}
        />
        <span
          className={`
            burger-line 
            block w-6 h-[2px] bg-current 
            transition-all duration-300 ease-in-out
            ${isOpen ? "-translate-y-[8px] -rotate-45" : ""}
          `}
        />
      </div>
    </button>
  );
};

export default React.memo(BurgerMenu);

import React from "react";
import { LuArrowRight, LuTimer, LuStar } from "react-icons/lu";

interface SectionCTAProps {
  title: string;
  description: string;
  buttonText: string;
  darkMode?: boolean;
}

const SectionCTA: React.FC<SectionCTAProps> = ({
  title,
  description,
  buttonText,
  darkMode = false,
}) => {
  return (
    <div
      className={`reveal py-16 sm:py-20 ${
        darkMode ? "bg-rich-blue-800" : "bg-cream-50/80"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="flex-1 text-center md:text-left">
            {/* Urgency Indicator */}
            <div className="flex items-center gap-2 mb-4 justify-center md:justify-LuStart">
              <LuTimer
                className={`h-5 w-5 ${
                  darkMode ? "text-cream-50" : "text-rich-blue-600"
                } animate-pulse`}
              />
              <span
                className={`text-sm font-medium ${
                  darkMode ? "text-cream-50/90" : "text-rich-blue-600/90"
                }`}
              >
                Limited Capacity
              </span>
            </div>

            <h3
              className={`text-3xl sm:text-4xl font-bold mb-4 leading-tight ${
                darkMode ? "text-cream-50" : "text-rich-blue-800"
              }`}
            >
              {title}
            </h3>

            <p
              className={`text-lg leading-relaxed ${
                darkMode ? "text-cream-100/90" : "text-rich-blue-600/90"
              }`}
            >
              {description}
            </p>
          </div>

          <div className="flex-shrink-0 w-full md:w-auto flex flex-col items-center">
            <button
              className={`w-full md:w-auto group relative overflow-hidden ${
                darkMode
                  ? "bg-cream-50 text-rich-blue-800 hover:bg-cream-100"
                  : "bg-rich-blue-800 text-cream-50 hover:bg-rich-blue-700"
              } px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300`}
            >
              {/* Shimmer Effect */}
              <div
                className={`absolute inset-0 z-10 bg-gradient-to-r from-transparent ${
                  darkMode ? "via-rich-blue-600/30" : "via-white/30"
                } to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000`}
              />

              <span className="relative z-10 flex items-center justify-center whitespace-nowrap">
                {buttonText}
                <LuArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            {/* Custom Trustpilot-style Rating */}
            <div className="mt-4 flex items-center justify-center gap-2">
              {/* Trustpilot-style Logo */}
              <div
                className={`flex items-center text-sm font-semibold ${
                  darkMode ? "text-cream-50" : "text-rich-blue-800"
                }`}
              >
                <span className="mr-2">Excellent</span>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <LuStar
                      key={i}
                      className={`h-4 w-4 fill-current ${
                        darkMode ? "text-green-400" : "text-green-500"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <span
                className={`text-sm ${
                  darkMode ? "text-cream-50/80" : "text-rich-blue-600/80"
                }`}
              >
                5.0 / 5.0
              </span>
            </div>

            {/* Trustpilot Text Logo */}
            <div
              className={`mt-1 font-bold tracking-tight ${
                darkMode ? "text-cream-50/90" : "text-rich-blue-600/90"
              }`}
            >
              Trustpilot
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionCTA;

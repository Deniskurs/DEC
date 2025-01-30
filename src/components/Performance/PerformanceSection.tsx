import React from "react";
import PerformanceGraph from "./PerformanceGraph";
import PerformanceMetrics from "./PerformanceMetrics";
import SectionCTA from "../CTA/SectionCTA";

const PerformanceSection: React.FC = () => {
  return (
    <>
      <div className="py-24 lg:py-32 relative overflow-hidden">
        {/* Premium background with grid and gradient */}
        <div className="absolute inset-0">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-cream-50/50 to-white/30" />

          {/* Grid with hue gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgb(0 82 204 / 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgb(0 82 204 / 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
              mask: "radial-gradient(circle at center, black, transparent)",
            }}
          />

          {/* Subtle color transitions */}
          <div className="absolute inset-0 bg-gradient-to-tr from-rich-blue-500/[0.02] via-purple-500/[0.02] to-emerald-500/[0.02]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title section */}
          <div className="text-center mb-20 relative overflow-hidden">
            <div className="section-title" data-text="PERFORMANCE">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-rich-blue-800 mb-8">
                <span className="block">Unrivaled Performance.</span>
                <span className="block mt-2 bg-gradient-to-r from-rich-blue-600 to-rich-blue-800 bg-clip-text text-transparent">
                  Verified Excellence.
                </span>
              </h2>

              <p className="text-lg sm:text-xl text-rich-blue-600/90 max-w-3xl mx-auto leading-relaxed">
                Our Delta Edge Hybrid Fund consistently outperforms the S&P 500
                and traditional investment vehicles, delivering superior
                risk-adjusted returns with sophisticated risk management.
              </p>
            </div>
          </div>

          {/* Graph container with minimal premium styling */}
          <div className="mb-20">
            <div className="relative">
              {/* Subtle container glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-rich-blue-500/5 via-purple-500/5 to-emerald-500/5 rounded-3xl blur-2xl" />

              {/* Graph component */}
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl">
                <PerformanceGraph />
              </div>
            </div>
          </div>

          <PerformanceMetrics />
        </div>
      </div>

      <SectionCTA
        title="Your Capital Is Waiting"
        description="Elite traders are leveraging our algorithms right now. Every moment of delay is quantifiable loss."
        buttonText="START GENERATING WEALTH"
      />
    </>
  );
};

export default PerformanceSection;

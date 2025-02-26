import React from "react";
import { motion } from "framer-motion";
import { LuChartNoAxesCombined, LuShield } from "react-icons/lu";
import PerformanceGraph from "./PerformanceGraph";
import PerformanceMetrics from "./PerformanceMetrics";
import SectionCTA from "../CTA/SectionCTA";

const PerformanceSection: React.FC = () => {
  return (
    <>
      <div className="pt-20 pb-24 lg:pb-32 relative overflow-hidden">
        {/* Premium Luxury Background - Cream Base */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Cream gradient backdrop matching other sections */}
          <div className="absolute inset-0 bg-gradient-to-b from-cream-50 via-cream-100 to-cream-50" />

          {/* Animated subtle premium grid pattern */}
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{
              backgroundPosition: ["0px 0px", "20px 20px", "0px 0px"]
            }}
            transition={{
              duration: 20,
              ease: "linear",
              repeat: Infinity
            }}
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0, 82, 204, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0, 82, 204, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />

          {/* Elegant radial gradients for depth with subtle motion */}
          <motion.div 
            className="absolute inset-0"
            animate={{
              background: [
                "radial-gradient(ellipse at 30% 20%, rgba(0,82,204,0.04), transparent 70%)",
                "radial-gradient(ellipse at 32% 22%, rgba(0,82,204,0.05), transparent 72%)",
                "radial-gradient(ellipse at 30% 20%, rgba(0,82,204,0.04), transparent 70%)"
              ]
            }}
            transition={{
              duration: 15,
              ease: "easeInOut",
              repeat: Infinity
            }}
          />
          <motion.div 
            className="absolute inset-0"
            animate={{
              background: [
                "radial-gradient(ellipse at 70% 80%, rgba(0,82,204,0.05), transparent 70%)",
                "radial-gradient(ellipse at 68% 78%, rgba(0,82,204,0.06), transparent 72%)",
                "radial-gradient(ellipse at 70% 80%, rgba(0,82,204,0.05), transparent 70%)"
              ]
            }}
            transition={{
              duration: 18,
              ease: "easeInOut",
              repeat: Infinity,
              delay: 2
            }}
          />

          {/* Enhanced animated glow effects */}
          <motion.div
            className="absolute -top-40 -left-40 w-96 h-96 bg-rich-blue-500/10 rounded-full blur-[100px]"
            animate={{
              opacity: [0.1, 0.2, 0.1],
              scale: [1, 1.1, 1],
              x: [0, 20, 0],
              y: [0, -20, 0]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-40 -right-40 w-96 h-96 bg-rich-blue-400/10 rounded-full blur-[100px]"
            animate={{
              opacity: [0.1, 0.2, 0.1],
              scale: [1, 1.05, 1],
              x: [0, -20, 0],
              y: [0, 15, 0]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          
          {/* New floating particles */}
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-rich-blue-500/20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0, 0.3, 0],
                scale: [0, Math.random() * 2 + 0.5, 0],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Animated sophisticated line accents - blue tinted */}
          <motion.div 
            className="absolute top-20 left-20 w-40 h-[1px] bg-gradient-to-r from-transparent via-rich-blue-400/20 to-transparent"
            animate={{
              width: ["40%", "30%", "40%"],
              opacity: [0.2, 0.3, 0.2],
              x: [0, 20, 0]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div 
            className="absolute top-40 right-20 w-60 h-[1px] bg-gradient-to-r from-transparent via-rich-blue-400/20 to-transparent"
            animate={{
              width: ["60%", "40%", "60%"],
              opacity: [0.2, 0.3, 0.2],
              x: [0, -30, 0]
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            }}
          />
          <motion.div 
            className="absolute bottom-60 left-40 w-20 h-[1px] bg-gradient-to-r from-transparent via-rich-blue-400/20 to-transparent"
            animate={{
              width: ["20%", "10%", "20%"],
              opacity: [0.2, 0.3, 0.2],
              x: [0, 15, 0]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Enhanced Section Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="section-title" data-text="PERFORMANCE">
              <div className="flex items-center justify-center gap-2 mb-4">
                <LuChartNoAxesCombined className="h-5 w-5 text-rich-blue-600" />
                <span className="text-sm font-semibold tracking-wider text-rich-blue-600 uppercase">
                  PERFORMANCE METRICS
                </span>
              </div>

              <div className="overflow-hidden">
                <motion.h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 relative"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <motion.span 
                    className="block bg-gradient-to-r from-rich-blue-800 to-rich-blue-600 bg-clip-text text-transparent relative font-bold"
                    initial={{ y: 80 }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 1.2, 
                      ease: [0.19, 1, 0.22, 1],
                      delay: 0.1 
                    }}
                  >
                    Unrivaled Performance.
                    {/* Animated highlight underline */}
                    <motion.div
                      className="absolute h-[3px] bg-gradient-to-r from-rich-blue-600/0 via-rich-blue-500/60 to-rich-blue-600/0 bottom-1 left-0"
                      initial={{ width: "0%", left: "50%" }}
                      whileInView={{ width: "60%", left: "20%" }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 1.5, 
                        ease: "easeOut",
                        delay: 1 
                      }}
                    />
                  </motion.span>
                  <motion.span 
                    className="block mt-2 text-rich-blue-900 relative font-bold"
                    initial={{ y: 80 }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 1.2, 
                      ease: [0.19, 1, 0.22, 1],
                      delay: 0.3 
                    }}
                  >
                    Verified Excellence.
                    {/* Subtle animated dot accent */}
                    <motion.div
                      className="absolute w-1.5 h-1.5 rounded-full bg-rich-blue-500 right-0 bottom-3"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.4,
                        delay: 1.4
                      }}
                      style={{ right: "-10px" }}
                    />
                  </motion.span>
                </motion.h2>
              </div>

              <motion.p
                className="text-lg sm:text-xl text-rich-blue-600/90 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Our Delta Edge Hybrid Fund consistently outperforms traditional
                investment vehicles, delivering superior risk-adjusted returns
                with sophisticated risk management.
              </motion.p>
            </div>
          </motion.div>

          {/* Ultra-Premium Graph Container */}
          <div className="mb-20">
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Subtle blue glow effect */}
              <div className="absolute -inset-10 bg-gradient-to-r from-rich-blue-500/10 via-rich-blue-400/5 to-rich-blue-500/10 rounded-3xl blur-2xl" />

              {/* Premium border effect */}
              <div className="absolute -inset-[3px] rounded-2xl">
                {/* Animated premium border - subtle blue pulse effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  animate={{ opacity: [0.4, 0.7, 0.4] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(0,82,204,0.2) 0%, rgba(59,130,246,0.3) 50%, rgba(0,82,204,0.2) 100%)",
                    boxShadow: "0 0 20px 0 rgba(0,82,204,0.1)",
                  }}
                />
              </div>

              {/* Ultra-premium container design */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                {/* Container background - dark but not too dark for contrast */}
                <div className="absolute inset-0 bg-gradient-to-br from-rich-blue-900/95 to-rich-blue-800/95" />

                {/* Professional corner accents */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-rich-blue-400/40 rounded-tl-xl" />
                <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-rich-blue-400/40 rounded-tr-xl" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-rich-blue-400/40 rounded-bl-xl" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-rich-blue-400/40 rounded-br-xl" />

                {/* Subtle grid pattern */}
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, rgba(255, 255, 255, 0.5) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(255, 255, 255, 0.5) 1px, transparent 1px)
                    `,
                    backgroundSize: "40px 40px",
                  }}
                />

                {/* Enhanced inner shadow */}
                <div className="absolute inset-0 shadow-inner shadow-black/10 pointer-events-none" />

                {/* Graph component with premium styling */}
                <div className="relative z-10">
                  <PerformanceGraph />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Redesigned Performance Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-10"
          >
            <PerformanceMetrics />
          </motion.div>

          {/* Premium Performance Disclosure */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative px-8 py-6 rounded-xl bg-white/80 backdrop-blur-md border border-rich-blue-200 shadow-md">
              {/* Subtle blue top highlight */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-1/3 bg-gradient-to-r from-transparent via-rich-blue-500/50 to-transparent" />

              {/* Subtle background pattern */}
              <div className="absolute inset-0 rounded-xl overflow-hidden opacity-5">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `
                      linear-gradient(45deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                      linear-gradient(135deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: "24px 24px",
                  }}
                />
              </div>

              <div className="relative flex items-start gap-5">
                {/* Enhanced icon container with pulse effect */}
                <div className="relative flex-shrink-0">
                  <div className="p-3 bg-rich-blue-50 rounded-lg shadow-sm border border-rich-blue-100 mt-0.5">
                    <LuShield className="h-5 w-5 text-rich-blue-600" />
                  </div>
                  {/* Subtle pulse effect */}
                  <motion.div
                    className="absolute inset-0 rounded-lg border border-rich-blue-200"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [1, 0, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>

                <div>
                  <h4 className="text-rich-blue-900 font-semibold text-base mb-2">
                    Performance Disclosure
                  </h4>
                  <p className="text-sm leading-relaxed text-rich-blue-700 mt-1">
                    Past performance is not indicative of future results. All
                    investments involve risk and may lose value. Investment
                    objectives, risks, charges, and expenses should be carefully
                    considered before investing.
                  </p>
                </div>
              </div>

              {/* Subtle bottom accent */}
              <div className="absolute bottom-0 right-8 h-[1px] w-24 bg-gradient-to-r from-transparent via-rich-blue-300/30 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>

      <SectionCTA
        title="Your Capital Is Waiting"
        description="Elite traders are leveraging our algorithms right now. Every moment of delay is quantifiable loss."
        buttonText="START GENERATING WEALTH"
        darkMode={true}
      />
    </>
  );
};

export default PerformanceSection;

import React from "react";
import { motion } from "framer-motion";
import {
  LuTrendingUp,
  LuDollarSign,
  LuShield,
  LuUsers,
  LuClock,
  LuInfo,
  LuCheck,
  LuBadgePercent,
  LuZap,
  LuArrowDown,
  LuArrowUp,
} from "react-icons/lu";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const ChooseYourPathCTA: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px) and (min-width: 769px)");
  const isSmallScreen = useMediaQuery("(max-width: 1280px)");
  const isExtraSmallScreen = useMediaQuery("(max-width: 640px)");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Title underline animation variants
  const underlineVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: {
      width: "100%",
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative overflow-hidden">
      {/* Fixed background gradient to match with BlogSection */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream-50 to-rich-blue-900"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <LuInfo className="h-5 w-5 text-rich-blue-600" />
            <h3 className="text-sm sm:text-base font-semibold tracking-wider text-rich-blue-600 uppercase">
              YOUR FINANCIAL FUTURE AT A CROSSROADS
            </h3>
          </div>

          <h2
            className={`relative ${
              isExtraSmallScreen
                ? "text-2xl"
                : "text-3xl sm:text-4xl lg:text-5xl"
            } font-bold text-rich-blue-800 mb-6 inline-block`}
          >
            <span className="relative z-10 px-1">
              The Decision That Shapes Your Wealth
            </span>

            {/* Elegant animated underline */}
            <motion.div
              className="absolute bottom-0 left-0 h-[0.15em] bg-gradient-to-r from-rich-blue-400/70 via-rich-blue-500/90 to-rich-blue-400/70 rounded-full z-0"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={underlineVariants}
              style={{
                filter: "drop-shadow(0 1px 2px rgba(0, 82, 204, 0.3))",
                transformOrigin: "left",
              }}
            />
          </h2>

          <p className="text-base sm:text-lg text-rich-blue-600/90 max-w-3xl mx-auto">
            Most investors face a critical choice: remain with conventional
            vehicles that historically underperform, or embrace innovative
            strategies designed to outpace market averages
          </p>
        </motion.div>

        {/* Cards container with VS element */}
        <div className="relative">
          {/* VS Element - Responsive for all screen sizes */}
          <div
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 ${
              isMobile ? "hidden" : "block"
            }`}
          >
            <motion.div
              className={`relative rounded-full bg-gradient-to-br from-rich-blue-600 to-rich-blue-800 flex items-center justify-center shadow-lg border-2 border-cream-50/30 ${
                isTablet
                  ? "w-14 h-14"
                  : isSmallScreen
                  ? "w-16 h-16"
                  : "w-20 h-20"
              }`}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <span
                className={`text-cream-50 font-bold ${
                  isTablet ? "text-lg" : isSmallScreen ? "text-xl" : "text-2xl"
                }`}
              >
                VS
              </span>
            </motion.div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className={`grid ${
              isMobile ? "grid-cols-1 gap-8" : "grid-cols-12 gap-6 lg:gap-10"
            } items-stretch`}
          >
            {/* Traditional Path - Soul-draining effect */}
            <motion.div
              variants={itemVariants}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-300 shadow-lg border border-gray-300 ${
                isMobile ? "" : "col-span-6"
              }`}
              whileHover={{
                y: -3,
                boxShadow:
                  "0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.4, ease: "easeOut" },
              }}
            >
              {/* Soul-draining visual effects */}
              <div className="absolute inset-0 overflow-hidden">
                {/* Desaturated overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-400/5 to-gray-600/20"></div>

                {/* Dark shadow at the bottom - energy being pulled down */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gray-700/30 to-transparent"></div>

                {/* Downward flowing particles animation */}
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={`drain-${i}`}
                    className="absolute w-1 h-1 bg-gray-400/30 rounded-full"
                    style={{
                      left: `${10 + i * 8}%`,
                      top: "20%",
                    }}
                    animate={{
                      y: [0, 100, 200],
                      opacity: [0, 0.7, 0],
                      scale: [1, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 3 + (i % 3),
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeIn",
                    }}
                  />
                ))}
              </div>

              {/* "Most Common Choice" indicator */}
              <div className="absolute top-0 left-0 right-0 bg-gray-400 py-1 px-4 text-xs font-medium text-gray-800 flex items-center justify-center">
                <LuUsers className="mr-1 h-3 w-3" />
                <span>CONVENTIONAL APPROACH</span>
              </div>

              {/* Content */}
              <div className="relative p-6 sm:p-8 mt-6">
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    {/* Drained icon */}
                    <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-400 mb-4 border border-gray-500/30">
                      <motion.div
                        animate={{
                          y: [0, 1, 0],
                          opacity: [0.8, 0.7, 0.8],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <LuDollarSign className="h-6 w-6 text-gray-700" />
                      </motion.div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-gray-700 mb-2">
                      TRADITIONAL INVESTMENT FUNDS
                    </h3>

                    <div className="text-3xl sm:text-4xl font-bold text-gray-700 mb-4 flex items-baseline">
                      <span className="text-red-600/90">3-5%</span>
                      <span className="text-sm font-normal text-gray-500 ml-1">
                        historical annual returns
                      </span>
                    </div>

                    <div className="space-y-3 text-gray-600 mb-6">
                      <div className="flex items-start">
                        <LuClock className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                        <p>
                          <span className="font-medium">Years of waiting</span>{" "}
                          for modest growth that barely keeps pace with
                          inflation
                        </p>
                      </div>
                      <div className="flex items-start">
                        <LuInfo className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                        <p>
                          <span className="font-medium">Hidden fees</span> that
                          silently erode your investment's true value
                        </p>
                      </div>
                      <div className="flex items-start">
                        <LuShield className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                        <p>
                          <span className="font-medium">False security</span>{" "}
                          while market makers profit from your capital
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <div className="flex items-center gap-2 mb-4 bg-gray-300 p-2 rounded-lg">
                      <LuArrowDown className="h-5 w-5 text-red-500/70" />
                      <span className="text-sm text-gray-600">
                        <span className="font-medium">Opportunity cost:</span>{" "}
                        Potential growth lost with each passing year
                      </span>
                    </div>

                    {/* Button with consistent height for alignment */}
                    <div className="h-[56px]">
                      <button
                        className="w-full h-full py-3 px-6 rounded-lg bg-gray-600 text-gray-200 font-medium hover:bg-gray-500 transition-all duration-300 flex items-center justify-center opacity-80 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        onClick={() => {}}
                      >
                        <span>Continue with Conventional Approach</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* DEC Path - Rejuvenation and prosperity effect */}
            <motion.div
              variants={itemVariants}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-rich-blue-800 to-rich-blue-900 shadow-xl border border-rich-blue-600 ${
                isMobile ? "" : "col-span-6"
              }`}
              whileHover={{
                y: -3,
                boxShadow:
                  "0 10px 25px -3px rgba(0, 82, 204, 0.3), 0 8px 10px -6px rgba(0, 82, 204, 0.2)",
                transition: { duration: 0.4, ease: "easeOut" },
              }}
            >
              {/* Enhanced background effects for rejuvenation */}
              <div className="absolute inset-0 overflow-hidden">
                {/* Radial glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-rich-blue-600/0 via-rich-blue-400/30 to-rich-blue-600/0 opacity-70"></div>

                {/* Animated gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-rich-blue-600/0 via-rich-blue-400/30 to-rich-blue-600/0"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 8,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                />

                {/* Upward flowing energy particles */}
                {[...Array(10)].map((_, i) => {
                  const colors = [
                    "bg-green-400/60",
                    "bg-green-300/60",
                    "bg-blue-300/60",
                    "bg-cream-50/60",
                  ];
                  const color = colors[i % colors.length];

                  return (
                    <motion.div
                      key={`rejuv-${i}`}
                      className={`absolute rounded-full ${color}`}
                      style={{
                        left: `${10 + i * 8}%`,
                        bottom: "20%",
                        width: 2 + (i % 3),
                        height: 2 + (i % 3),
                      }}
                      animate={{
                        y: [0, -100, -200],
                        opacity: [0, 0.9, 0],
                        scale: [0.5, 1, 1.5],
                      }}
                      transition={{
                        duration: 3 + (i % 3),
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeOut",
                      }}
                    />
                  );
                })}

                {/* Money symbols floating upward */}
                {["$", "€", "£", "%"].map((symbol, i) => (
                  <motion.div
                    key={`money-${i}`}
                    className="absolute text-green-300/40 font-bold"
                    style={{
                      left: `${20 + i * 15}%`,
                      bottom: "30%",
                      fontSize: `${12 + i * 2}px`,
                    }}
                    animate={{
                      y: [0, -100, -200],
                      opacity: [0, 0.7, 0],
                      rotate: [0, i * 5 - 10],
                    }}
                    transition={{
                      duration: 4 + i,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeOut",
                    }}
                  >
                    {symbol}
                  </motion.div>
                ))}

                {/* Energetic glow at the top - energy rising */}
                <div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-green-400/20 to-transparent"></div>
              </div>

              {/* "Recommended" indicator */}
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-green-600 via-green-500 to-green-600 py-1.5 px-4 text-xs font-medium text-white flex items-center justify-center shadow-md">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <LuCheck className="mr-1.5 h-3.5 w-3.5" />
                </motion.div>
                <span className="tracking-wide">
                  RECOMMENDED BY FINANCIAL EXPERTS
                </span>
              </div>

              {/* Content */}
              <div className="relative p-6 sm:p-8 mt-6">
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    {/* Enhanced icon with rejuvenation animation */}
                    <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-cream-50/40 to-cream-50/10 mb-4 border border-cream-50/30">
                      <motion.div
                        animate={{
                          rotate: [0, 5, 0, -5, 0],
                          scale: [1, 1.05, 1],
                        }}
                        transition={{ duration: 5, repeat: Infinity }}
                      >
                        <LuTrendingUp className="h-8 w-8 text-cream-50" />
                      </motion.div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-cream-50 mb-3 tracking-wide">
                      DEC ALGORITHMIC STRATEGY
                    </h3>

                    {/* Enhanced performance metric with energetic styling */}
                    <div className="relative text-3xl sm:text-5xl font-bold text-cream-50 mb-5 flex items-baseline">
                      <div className="flex items-center">
                        <LuBadgePercent className="h-7 w-7 text-green-400 mr-2" />
                        <span className="text-green-400 relative">
                          20%+
                          {/* Enhanced glow */}
                          <div
                            className="absolute -inset-1 rounded bg-green-400/20"
                            style={{
                              filter:
                                "drop-shadow(0 0 5px rgba(74, 222, 128, 0.5))",
                            }}
                          />
                        </span>
                        <span className="text-sm font-normal text-cream-100/90 ml-2">
                          historical annual returns
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4 text-cream-100/90 mb-6">
                      <div className="flex items-start">
                        <LuZap className="h-5 w-5 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                        <p>
                          <span className="font-medium text-green-300">
                            Accelerated growth
                          </span>{" "}
                          through proprietary algorithmic trading strategies
                        </p>
                      </div>
                      <div className="flex items-start">
                        <LuCheck className="h-5 w-5 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                        <p>
                          <span className="font-medium text-green-300">
                            Transparent fee structure
                          </span>{" "}
                          aligned with your investment success
                        </p>
                      </div>
                      <div className="flex items-start">
                        <LuShield className="h-5 w-5 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                        <p>
                          <span className="font-medium text-green-300">
                            Risk management
                          </span>{" "}
                          built into every aspect of our investment approach
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <div className="relative flex items-center gap-2 mb-4 bg-rich-blue-700/50 p-3 rounded-lg border border-rich-blue-600/30">
                      <LuArrowUp className="h-5 w-5 text-green-400" />
                      <span className="text-sm text-cream-50 relative z-10">
                        <span className="font-medium">
                          Join 1,000+ investors
                        </span>{" "}
                        who have already made the switch
                      </span>
                    </div>

                    {/* Button container with fixed height for alignment */}
                    <div className="h-[56px]">
                      {/* Refined button with more elegant hover effect */}
                      <motion.button
                        onClick={() =>
                          window.open(
                            "https://2znr0q4ymmj.typeform.com/to/CA5GAbp9",
                            "_blank"
                          )
                        }
                        className="relative w-full h-full py-3.5 px-6 rounded-lg bg-gradient-to-r from-cream-50 via-cream-100 to-cream-50 text-rich-blue-800 font-bold hover:bg-cream-100 transition-all duration-300 flex items-center justify-center shadow-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-cream-200 focus:ring-offset-1"
                        whileHover={{
                          y: -2,
                          scale: 1.02,
                          boxShadow:
                            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                          transition: {
                            duration: 0.3,
                            ease: [0.25, 0.1, 0.25, 1],
                          },
                        }}
                        whileTap={{
                          scale: 0.98,
                          boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
                          transition: { duration: 0.1 },
                        }}
                      >
                        {/* Enhanced shimmer effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -skew-x-20"
                          animate={{
                            x: ["-100%", "100%"],
                          }}
                          transition={{
                            duration: 2.5,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatDelay: 3,
                          }}
                        />

                        {/* Button text with creative treatment */}
                        <span className="relative z-10 font-bold text-lg tracking-wide">
                          Discover Your Potential
                        </span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Disclaimer */}
        <div className="text-center mt-10 max-w-3xl mx-auto">
          <div className="relative py-3 px-4 rounded-lg bg-rich-blue-900/70 backdrop-blur-sm border border-rich-blue-800/50">
            <div className="flex items-center justify-center gap-2 mb-2">
              <LuShield className="h-4 w-4 text-cream-50/80" />
              <p className="text-xs text-cream-50/90 font-medium tracking-wide">
                IMPORTANT INFORMATION
              </p>
            </div>
            <p className="text-xs text-cream-50/80 leading-relaxed">
              Past performance is not indicative of future results. Historical
              returns shown are based on actual performance data. All
              investments involve risk and may result in both profits and
              losses. Please read all offering documents carefully before
              investing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseYourPathCTA;

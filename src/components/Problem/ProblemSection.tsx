import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { LuTarget } from "react-icons/lu";

const ProblemSection: React.FC = () => {
  const { ref: sectionRef, controls: sectionControls } = useScrollAnimation({
    threshold: 0.2,
  });

  const [activeCard, setActiveCard] = useState<"left" | "right" | null>(null);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-rich-blue-900 to-rich-blue-800">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(252,249,240,0.1),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(252,249,240,0.1),transparent_70%)]" />
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute h-2 w-2 bg-cream-50/20 rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <motion.div
        ref={sectionRef}
        initial="hidden"
        animate={sectionControls}
        className="relative py-24 lg:py-32"
      >
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          {/* Title Section with Background Text */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="section-title relative" data-text="THE PROBLEM">
              <div
                className="absolute left-1/2 top-0 -translate-x-1/2 text-[clamp(3.5rem,8vw,5rem)] font-extrabold uppercase tracking-[0.1em] text-cream-50/10 whitespace-nowrap leading-none"
                aria-hidden="true"
              >
                THE PROBLEM
              </div>

              <motion.h2
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-cream-50 mb-8 relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                Your Capital Deserves <br className="hidden sm:block" />
                <span className="text-rich-blue-400">
                  Elite-Level Algorithms
                </span>
              </motion.h2>

              <motion.p
                className="text-lg sm:text-xl font-medium text-cream-50/90 mb-6 relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                You're already ahead of 80% of the market - but you know deep
                down that being 'almost there' isn't enough.
              </motion.p>
            </div>
          </motion.div>

          {/* Enhanced Card Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              onMouseEnter={() => setActiveCard("left")}
              onMouseLeave={() => setActiveCard(null)}
              className="relative group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-rich-blue-400/20 to-rich-blue-500/20 rounded-2xl blur-xl transition-opacity duration-300"
                animate={{ opacity: activeCard === "left" ? 1 : 0 }}
              />

              <div className="relative bg-gradient-to-br from-cream-50/10 to-cream-50/5 rounded-2xl backdrop-blur-sm border border-cream-50/10 h-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cream-50/0 via-cream-50/10 to-cream-50/0 animate-shimmer" />

                <div className="relative p-8 lg:p-10 space-y-8">
                  <LuTarget className="h-12 w-12 text-rich-blue-400 transform group-hover:scale-110 transition-transform duration-300" />

                  <h3 className="text-2xl sm:text-3xl font-bold text-cream-50">
                    We See Your Potential
                  </h3>

                  <div className="space-y-6">
                    <p className="text-lg text-cream-100/90">
                      You've built something remarkable. Your success isn't just
                      luck - it's the result of:
                    </p>
                    <div className="relative space-y-6">
                      {[
                        "Strategic thinking and calculated risks",
                        "Dedication to continuous growth",
                        "Understanding the value of smart investments",
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          onMouseEnter={() => setHoveredItem(index)}
                          onMouseLeave={() => setHoveredItem(null)}
                          className="relative"
                        >
                          <AnimatePresence>
                            {hoveredItem === index && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="absolute inset-0 bg-rich-blue-400/10 rounded-xl"
                              />
                            )}
                          </AnimatePresence>
                          <div className="relative flex items-center gap-3 p-4 rounded-xl border border-cream-50/10 transition-colors duration-300">
                            {/* <Sparkles className="h-5 w-5 text-rich-blue-400" /> */}
                            <span className="text-cream-50">{item}</span>
                          </div>
                          {index < 2 && (
                            <motion.div
                              className="absolute -bottom-6 left-7 h-6 w-px bg-gradient-to-b from-cream-50/30 to-transparent"
                              animate={{
                                height:
                                  hoveredItem === index ||
                                  hoveredItem === index + 1
                                    ? 32
                                    : 24,
                                opacity:
                                  hoveredItem === index ||
                                  hoveredItem === index + 1
                                    ? 1
                                    : 0.3,
                              }}
                            />
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              onMouseEnter={() => setActiveCard("right")}
              onMouseLeave={() => setActiveCard(null)}
              className="relative group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-rich-blue-400/20 to-rich-blue-500/20 rounded-2xl blur-xl transition-opacity duration-300"
                animate={{ opacity: activeCard === "right" ? 1 : 0 }}
              />

              <div className="relative bg-gradient-to-br from-rich-blue-800/50 to-rich-blue-900/50 rounded-2xl backdrop-blur-sm border border-cream-50/10 h-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-rich-blue-500/0 via-rich-blue-400/10 to-rich-blue-500/0 animate-shimmer" />

                <div className="relative p-8 lg:p-10 space-y-8">
                  {/* <Rocket className="h-12 w-12 text-rich-blue-400 transform group-hover:scale-110 transition-transform duration-300" /> */}

                  <h3 className="text-2xl sm:text-3xl font-bold text-cream-50">
                    Let's Take It Further
                  </h3>

                  <div className="space-y-6">
                    <p className="text-lg text-cream-100/90">
                      Your next level of success requires next-level tools. Our
                      algorithmic trading system is designed for leaders like
                      you who are ready to:
                    </p>

                    <div className="grid gap-6">
                      {[
                        {
                          label: "Monthly Returns",
                          value: "+1.76%",
                          desc: "Consistent Growth",
                          // Icon: TrendingUp,
                        },
                        {
                          label: "Success Rate",
                          value: "88%",
                          desc: "Proven Track Record",
                          // Icon: Zap,
                        },
                      ].map((stat, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.5,
                            delay: 0.7 + index * 0.1,
                          }}
                          onMouseEnter={() => setHoveredItem(index + 10)} // Offset to avoid conflict with left card
                          onMouseLeave={() => setHoveredItem(null)}
                          className="relative overflow-hidden"
                        >
                          <AnimatePresence>
                            {hoveredItem === index + 10 && (
                              <motion.div
                                initial={{ opacity: 0, x: "-100%" }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: "100%" }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0 bg-rich-blue-400/10"
                              />
                            )}
                          </AnimatePresence>
                          <div className="relative flex items-center gap-4 bg-cream-50/5 rounded-xl p-4 border border-cream-50/10">
                            {/* <stat.Icon className="h-6 w-6 text-rich-blue-400" /> */}
                            <div className="flex-1">
                              <div className="text-sm text-cream-100/80">
                                {stat.label}
                              </div>
                              <div className="text-xs text-cream-100/60 mt-1">
                                {stat.desc}
                              </div>
                            </div>
                            <div className="text-2xl font-bold text-cream-50">
                              {stat.value}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Enhanced CTA */}
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-16 text-center"
          >
            <button className="group relative inline-flex items-center gap-2 bg-cream-50 text-rich-blue-900 px-8 py-4 rounded-xl font-semibold overflow-hidden hover:bg-cream-100 transition-all duration-300">
              <span className="relative z-10">Unlock Your Elite Advantage</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-cream-50/0 via-cream-50/50 to-cream-50/0 animate-shimmer" />
            </button>
          </motion.div> */}
        </div>
      </motion.div>
    </div>
  );
};

export default ProblemSection;

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  LuShield,
  LuTriangleAlert,
  LuArrowDown,
  LuDollarSign,
  LuInfo,
  LuClock,
  LuArrowUpRight,
  LuChevronRight,
} from "react-icons/lu";
import { css } from "@emotion/react";
import { termsManager } from "../../utils/termsManager";

export interface LoadingAndTermsProps {
  onAccept: () => void;
  minReadTime?: number;
}

// Optimized scrollbar styles with reduced paint
const scrollbarStyles = css`
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(252, 249, 240, 0.3) rgba(252, 249, 240, 0.1);
    will-change: transform;
  }

  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(252, 249, 240, 0.1);
    border-radius: 3px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(252, 249, 240, 0.3);
    border-radius: 3px;
    transform: translate3d(0, 0, 0);
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(252, 249, 240, 0.5);
  }
`;
// Animation variants
const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const shimmerVariants = {
  animate: {
    x: ["0%", "200%"],
    transition: {
      duration: 1.5,
      ease: "linear",
      repeat: Infinity,
      repeatDelay: 1,
    },
  },
};

const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.98 },
};

const LoadingAndTerms: React.FC<LoadingAndTermsProps> = ({
  onAccept,
  minReadTime = 5,
}) => {
  const [loading, setLoading] = useState(true);
  const [showTerms, setShowTerms] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [readTime, setReadTime] = useState(0);
  const [hasReachedBottom, setHasReachedBottom] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();
  const prefersReducedMotion = useReducedMotion();
  // Optimize resize listener with debounce
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 100);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setShowTerms(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showTerms) {
      timerRef.current = setInterval(() => {
        setTimeSpent((prev) => prev + 1);
      }, 1000);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [showTerms]);
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const scrollPosition = element.scrollTop + element.clientHeight;
    const totalHeight = element.scrollHeight;
    const scrollPercentage = (scrollPosition / totalHeight) * 100;

    setReadTime(Math.max(readTime, scrollPercentage));
    setHasReachedBottom(Math.ceil(scrollPosition) >= totalHeight - 1);
  };

  const isAcceptanceValid = () => {
    return (
      accepted && hasReachedBottom && readTime >= 80 && timeSpent >= minReadTime
    );
  };

  const getRemainingRequirements = useMemo(() => {
    return () => {
      const requirements = [];
      if (!hasReachedBottom || readTime < 80) {
        requirements.push("Please read through the entire document");
      }
      if (timeSpent < minReadTime) {
        const remaining = minReadTime - timeSpent;
        requirements.push(
          `Please continue reading for ${remaining} more seconds`
        );
      }
      if (!accepted) {
        requirements.push("Please check the acceptance box");
      }
      return requirements;
    };
  }, [hasReachedBottom, readTime, timeSpent, minReadTime, accepted]);

  const handleAccept = () => {
    if (isAcceptanceValid()) {
      termsManager.acceptTerms();
      onAccept();
    }
  };

  const animationConfig = useMemo(
    () => ({
      duration: prefersReducedMotion ? 0 : isMobile ? 0.3 : 0.5,
      ease: [0.25, 0.1, 0, 1],
    }),
    [prefersReducedMotion, isMobile]
  );
  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-gradient-to-br from-rich-blue-900 via-rich-blue-800 to-rich-blue-900 flex items-center justify-center overflow-hidden"
          style={{
            willChange: "transform, opacity",
            transform: "translate3d(0, 0, 0)",
          }}
        >
          {/* Loading background animation */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute w-[200%] h-[200%] -left-1/2 -top-1/2"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(252, 249, 240, 0.15) 0%, transparent 50%)",
                willChange: "transform",
              }}
              animate={{
                x: ["-25%", "25%", "-25%"],
                y: ["-25%", "25%", "-25%"],
              }}
              transition={{
                duration: prefersReducedMotion ? 0 : 20,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
              }}
            />

            <motion.div
              className="absolute w-[200%] h-[200%] -left-1/2 -top-1/2"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(252, 249, 240, 0.1) 0%, transparent 40%)",
                willChange: "transform",
              }}
              animate={{
                x: ["25%", "-25%", "25%"],
                y: ["25%", "-25%", "25%"],
              }}
              transition={{
                duration: prefersReducedMotion ? 0 : 15,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
          </div>

          {/* Optimized particles */}
          {[...Array(isMobile ? 10 : 20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 bg-cream-50/20 rounded-full"
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                willChange: "transform, opacity",
                transform: "translate3d(0, 0, 0)",
              }}
            />
          ))}
          <div className="relative flex flex-col items-center justify-center text-center">
            {/* Loading Icon */}
            <div className="relative mb-8">
              <motion.div
                className="absolute -inset-8 rounded-full bg-cream-50/10 blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ willChange: "transform, opacity" }}
              />

              <motion.div
                className="relative w-24 h-24"
                animate={{ rotate: 360 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  willChange: "transform",
                  transform: "translate3d(0, 0, 0)",
                }}
              >
                <div className="absolute inset-0 rounded-full border-4 border-cream-50/20" />
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-cream-50 border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ willChange: "transform" }}
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <LuDollarSign className="text-cream-50 w-8 h-8" />
                </div>
              </motion.div>
            </div>

            <motion.h2
              className="text-xl font-bold text-cream-50"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: prefersReducedMotion ? 0 : 2,
                repeat: Infinity,
              }}
              style={{ willChange: "opacity" }}
            >
              Preparing Secure Environment
            </motion.h2>
            <motion.p
              className="text-sm text-cream-50/60 mt-2"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{
                duration: prefersReducedMotion ? 0 : 2,
                repeat: Infinity,
                delay: 0.3,
              }}
              style={{ willChange: "opacity" }}
            >
              Initializing protected domain...
            </motion.p>
          </div>
        </motion.div>
      ) : showTerms ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-rich-blue-900/95 backdrop-blur-sm flex items-center justify-center p-4"
          style={{ willChange: "opacity" }}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={animationConfig}
            className="relative w-full max-w-2xl bg-gradient-to-br from-rich-blue-800 via-rich-blue-900 to-rich-blue-800 rounded-2xl overflow-hidden border border-cream-50/10"
            style={{
              willChange: "transform",
              transform: "translate3d(0, 0, 0)",
            }}
          >
            {/* Terms background effects */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  className="absolute w-[200%] h-[200%] -left-1/2 -top-1/2"
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(252, 249, 240, 0.15) 0%, transparent 50%)",
                    willChange: "transform",
                  }}
                  animate={{
                    x: ["-25%", "25%", "-25%"],
                    y: ["-25%", "25%", "-25%"],
                  }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 20,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                />

                <motion.div
                  className="absolute w-[200%] h-[200%] -left-1/2 -top-1/2"
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(252, 249, 240, 0.1) 0%, transparent 40%)",
                    willChange: "transform",
                  }}
                  animate={{
                    x: ["25%", "-25%", "25%"],
                    y: ["25%", "-25%", "25%"],
                  }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 15,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                />
              </div>

              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgb(252, 249, 240) 1px, transparent 1px),
                    linear-gradient(to bottom, rgb(252, 249, 240) 1px, transparent 1px)
                  `,
                  backgroundSize: "24px 24px",
                }}
              />
            </div>

            <div className="relative p-4 md:p-6 space-y-4 md:space-y-6">
              {/* Header with Timer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <LuShield className="w-6 h-6 text-cream-50" />
                  <h2 className="text-lg md:text-xl font-bold text-cream-50">
                    Investment Disclaimer
                  </h2>
                </div>
                <div className="flex items-center gap-2 text-cream-50/60">
                  <LuClock className="w-4 h-4" />
                  <span className="text-sm">{timeSpent}s</span>
                </div>
              </div>
              {/* Scroll Indicator */}
              <motion.div
                className="flex justify-center"
                animate={{ y: [0, 4, 0] }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 2,
                  repeat: Infinity,
                }}
                style={{ willChange: "transform" }}
              >
                <div className="bg-cream-50/5 text-cream-50/90 text-sm py-2 px-4 rounded-full flex items-center gap-2 border border-cream-50/10">
                  <span>Scroll to continue</span>
                  <LuArrowDown className="w-4 h-4" />
                </div>
              </motion.div>

              {/* Scrollable Content */}
              <div
                ref={scrollRef}
                className="bg-rich-blue-900/30 rounded-xl p-4 md:p-6 custom-scrollbar space-y-4 md:space-y-6 overflow-y-auto backdrop-blur-sm border border-cream-50/10"
                css={scrollbarStyles}
                style={{
                  maxHeight: isMobile ? "45vh" : "40vh",
                  willChange: "scroll-position",
                  transform: "translate3d(0, 0, 0)",
                }}
                onScroll={handleScroll}
              >
                {/* Warning Banner */}
                <motion.div
                  className="flex items-start gap-3 p-4 bg-cream-50/5 rounded-xl border border-cream-50/10"
                  variants={fadeInVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.3 }}
                >
                  <LuTriangleAlert className="w-5 h-5 text-cream-50 flex-shrink-0 mt-1" />
                  <p className="text-cream-50/90 text-sm md:text-base">
                    Please read this disclaimer carefully before accessing our
                    investment platform. Your access to this site is contingent
                    upon your understanding and acceptance of these terms.
                  </p>
                </motion.div>

                {/* Disclaimer Sections */}
                {[
                  {
                    title: "Risk Warning",
                    content:
                      "The value of investments can go down as well as up and you may receive back less than your original investment. Past performance is not a reliable indicator of future results.",
                  },
                  {
                    title: "Qualified Investor Statement",
                    content:
                      "By accessing this platform, you represent and warrant that you are a qualified, sophisticated, or accredited investor as defined by applicable securities laws in your jurisdiction.",
                  },
                  {
                    title: "Investment Risks",
                    content:
                      "All investments carry risk. You should carefully consider your investment objectives, risk tolerance, and financial situation before making any investment decisions.",
                  },
                  {
                    title: "No Investment Advice",
                    content:
                      "The information provided on this platform is for informational purposes only and does not constitute investment advice. We recommend seeking professional financial advice before making investment decisions.",
                  },
                ].map((section, index) => (
                  <motion.div
                    key={index}
                    className="space-y-3"
                    variants={fadeInVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{
                      duration: animationConfig.duration,
                      delay: index * 0.1,
                    }}
                    style={{ willChange: "transform, opacity" }}
                  >
                    <h3 className="text-lg font-semibold text-cream-50">
                      {section.title}
                    </h3>
                    <p className="text-cream-50/70 leading-relaxed text-sm md:text-base">
                      {section.content}
                    </p>
                  </motion.div>
                ))}

                {/* Final Notice */}
                <motion.div
                  className="flex items-start gap-3 p-4 bg-cream-50/5 rounded-xl border border-cream-50/10 mt-6"
                  variants={fadeInVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{
                    duration: animationConfig.duration,
                    delay: 0.3,
                  }}
                >
                  <LuInfo className="w-5 h-5 text-cream-50 flex-shrink-0 mt-1" />
                  <p className="text-cream-50/90 text-sm">
                    This disclaimer is not exhaustive and may be updated from
                    time to time. Continued use of this platform constitutes
                    acceptance of any changes to these terms.
                  </p>
                </motion.div>
              </div>
              {/* Acceptance Section */}
              <div className="space-y-4">
                <motion.div
                  className="p-4 bg-cream-50/5 rounded-xl border border-cream-50/10 cursor-pointer"
                  whileHover={!isMobile ? { scale: 1.01 } : undefined}
                  whileTap={!isMobile ? { scale: 0.99 } : undefined}
                  transition={{ duration: 0.2 }}
                  style={{ willChange: "transform" }}
                >
                  <label className="flex items-start gap-3 cursor-pointer">
                    <Checkbox
                      checked={accepted}
                      onCheckedChange={(checked) => setAccepted(!!checked)}
                      className="mt-1 w-5 h-5 border-2 border-cream-50/20 data-[state=checked]:border-cream-50 data-[state=checked]:bg-cream-50/20"
                    />
                    <span className="text-sm text-cream-50/90">
                      I confirm that I have read, understood, and agree to the
                      investment disclaimers, risks, and terms of service.
                    </span>
                  </label>
                </motion.div>

                <motion.button
                  onClick={handleAccept}
                  disabled={!isAcceptanceValid()}
                  initial="initial"
                  whileHover={isAcceptanceValid() ? "hover" : undefined}
                  whileTap={isAcceptanceValid() ? "tap" : undefined}
                  variants={buttonVariants}
                  className={`
                    group relative overflow-hidden w-full py-4 rounded-xl font-semibold
                    transition-all duration-500 soft-ui-card
                    ${
                      !isAcceptanceValid()
                        ? "bg-cream-50/10 cursor-not-allowed ring-1 ring-cream-50/10"
                        : "bg-cream-50/90 text-rich-blue-800 hover:bg-cream-100 shadow-[0_0_15px_rgba(252,249,240,0.1)] hover:shadow-[0_0_25px_rgba(252,249,240,0.2)] ring-2 ring-cream-50"
                    }
                  `}
                  style={{ willChange: "transform" }}
                >
                  {isAcceptanceValid() && (
                    <>
                      <motion.div
                        className="absolute -inset-1 rounded-xl bg-cream-50/20 blur-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0.5] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      />
                      <motion.div
                        className="absolute inset-0 overflow-hidden rounded-xl"
                        style={{ willChange: "transform" }}
                      >
                        <motion.div
                          className="absolute inset-0 w-full bg-gradient-to-r from-cream-50/0 via-cream-50/50 to-cream-50/0"
                          animate={{
                            x: ["0%", "200%"],
                          }}
                          transition={{
                            duration: 1.5,
                            ease: "linear",
                            repeat: Infinity,
                            repeatDelay: 1,
                          }}
                        />
                      </motion.div>
                    </>
                  )}
                  <span
                    className={`
                    relative z-10 flex items-center justify-center gap-2
                    transition-all duration-500
                    ${isAcceptanceValid() ? "scale-105" : "scale-95 opacity-50"}
                  `}
                  >
                    <LuShield
                      className={`
                      w-5 h-5 transition-transform duration-500 
                      ${isAcceptanceValid() ? "scale-110" : "scale-90"}
                    `}
                    />
                    ACCEPT & ENTER
                    <LuChevronRight
                      className={`
                      w-5 h-5 transition-all duration-500
                      ${
                        isAcceptanceValid()
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-2"
                      }
                      group-hover:translate-x-1
                    `}
                    />
                  </span>
                </motion.button>

                {!isAcceptanceValid() && (
                  <motion.div
                    className="space-y-2 mt-4"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ willChange: "transform, opacity" }}
                  >
                    {getRemainingRequirements().map((req, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-center gap-2 text-sm text-cream-50/60"
                      >
                        <LuInfo className="w-4 h-4" />
                        <p>{req}</p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default LoadingAndTerms;

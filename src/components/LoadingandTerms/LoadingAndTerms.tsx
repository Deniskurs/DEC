import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { termsManager } from "../../utils/termsManager";
import LoadingScreen from "./LoadingScreen";
import TermsContent from "./TermsContent";
import TermsStatus from "./TermsStatus";
import AcceptanceSection from "./AcceptanceSection";

export interface LoadingAndTermsProps {
  onAccept: () => void;
  minReadTime?: number;
}

const LoadingAndTerms: React.FC<LoadingAndTermsProps> = ({
  onAccept,
  minReadTime = 5,
}) => {
  // Core states
  const [loading, setLoading] = useState(true);
  const [showTerms, setShowTerms] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [readTime, setReadTime] = useState(0);
  const [hasReachedBottom, setHasReachedBottom] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [termsStatus, setTermsStatus] = useState(
    termsManager.checkAcceptance()
  );

  // Refs for scroll and timer management
  const scrollRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();
  const resizeTimeoutRef = useRef<NodeJS.Timeout>();

  // Hooks
  const prefersReducedMotion = useReducedMotion();

  // Check existing terms acceptance on mount
  useEffect(() => {
    const status = termsManager.checkAcceptance();
    setTermsStatus(status);
    if (status.hasAccepted && !status.needsReaccept) {
      onAccept();
      return;
    }
    const timer = setTimeout(() => {
      setLoading(false);
      setShowTerms(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, [onAccept]);

  // Mobile detection with debounce
  useEffect(() => {
    const handleResize = () => {
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(() => {
        const isMobileView = window.innerWidth < 768;
        setIsMobile(isMobileView);
        if (isMobileView) {
          const vh = window.innerHeight * 0.01;
          document.documentElement.style.setProperty("--vh", `${vh}px`);
        }
      }, 100);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
    };
  }, []);

  // Timer for terms reading
  useEffect(() => {
    if (showTerms) {
      timerRef.current = setInterval(() => {
        setTimeSpent((prev) => prev + 1);
      }, 1000);
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [showTerms]);

  // Handle scroll events
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const scrollPosition = element.scrollTop + element.clientHeight;
    const totalHeight = element.scrollHeight;
    const scrollPercentage = (scrollPosition / totalHeight) * 100;
    setReadTime(Math.max(readTime, scrollPercentage));
    setHasReachedBottom(Math.ceil(scrollPosition) >= totalHeight - 1);
  };

  // Acceptance validation
  const isAcceptanceValid = useMemo(() => {
    return (
      accepted && hasReachedBottom && readTime >= 80 && timeSpent >= minReadTime
    );
  }, [accepted, hasReachedBottom, readTime, timeSpent, minReadTime]);

  // Get remaining requirements
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

  // Handle terms acceptance
  const handleAccept = () => {
    if (isAcceptanceValid) {
      termsManager.acceptTerms();
      onAccept();
    }
  };

  // Animation configuration
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
        <LoadingScreen
          prefersReducedMotion={prefersReducedMotion}
          isMobile={isMobile}
        />
      ) : showTerms ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-rich-blue-900/95 backdrop-blur-sm flex items-center justify-center p-4"
          style={{
            willChange: "opacity",
            minHeight: isMobile ? "calc(var(--vh, 1vh) * 100)" : "100vh",
          }}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={animationConfig}
            className={`
              relative w-full bg-gradient-to-br from-rich-blue-800 via-rich-blue-900 to-rich-blue-800 
              rounded-2xl overflow-hidden border border-cream-50/10
              ${
                isMobile
                  ? "max-w-lg h-[calc(var(--vh,1vh)*90)]"
                  : "max-w-2xl h-auto max-h-[85vh]"
              }
            `}
            style={{
              willChange: "transform",
              transform: "translate3d(0, 0, 0)",
            }}
          >
            {/* Background Effects */}
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
            {/* Use a flex-col layout to separate the scrollable TermsContent and the fixed AcceptanceSection */}
            <div className="flex flex-col h-full p-4 md:p-6">
              <div className="flex-grow overflow-y-auto">
                <TermsContent
                  onScroll={handleScroll}
                  scrollRef={scrollRef}
                  isMobile={isMobile}
                  animationConfig={animationConfig}
                  prefersReducedMotion={prefersReducedMotion}
                  timeSpent={timeSpent}
                />
              </div>
              <div className="mt-4">
                <AcceptanceSection
                  accepted={accepted}
                  setAccepted={setAccepted}
                  isAcceptanceValid={isAcceptanceValid}
                  handleAccept={handleAccept}
                  getRemainingRequirements={getRemainingRequirements}
                  isMobile={isMobile}
                  termsStatus={termsStatus}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default LoadingAndTerms;

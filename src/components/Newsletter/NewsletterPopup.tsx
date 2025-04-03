import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  LuShield,
  LuBrain,
  LuLightbulb,
  LuArrowRight,
  LuCheck,
  LuTrendingUp,
  LuInfo,
} from "react-icons/lu";

interface NewsletterPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewsletterPopup: React.FC<NewsletterPopupProps> = ({
  isOpen,
  onClose,
}) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // For progressive disclosure
  const [hasInteracted, setHasInteracted] = useState(false);

  // Handle body scroll locking
  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  // Auto-progress to step 2 after delay
  useEffect(() => {
    if (!isOpen || hasInteracted) return;

    const timer = setTimeout(() => {
      setStep(2);
    }, 3500);

    return () => clearTimeout(timer);
  }, [isOpen, hasInteracted]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsLoading(false);
    onClose();
  };

  // Handle interaction tracking
  const handleInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      setStep(2);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => {
          // Close only if clicking directly on the backdrop
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        {/* Enhanced backdrop with vignette */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Intense blur and darkening */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />

          {/* Radial vignette */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/60" />

          {/* Animated scan lines */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={`scan-line-${i}`}
                className="absolute h-[1px] w-full bg-amber-300/5"
                style={{ top: `${i * 20}px` }}
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  left: ["-100%", "100%"],
                }}
                transition={{
                  opacity: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  },
                  left: {
                    duration: 20 + (i % 10),
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.1,
                  },
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Main popup container */}
        <motion.div
          className="relative w-full max-w-lg mx-auto overflow-hidden"
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Premium outer container with multiple border effect */}
          <div className="relative rounded-2xl p-[1px] shadow-[0_0_40px_rgba(251,191,36,0.1)]">
            {/* Animated border gradient */}
            <motion.div
              className="absolute inset-0 rounded-2xl opacity-70"
              style={{
                background: `
                  linear-gradient(
                    90deg, 
                    rgba(251,191,36,0.1) 0%, 
                    rgba(251,191,36,0.4) 50%, 
                    rgba(251,191,36,0.1) 100%
                  )
                `,
                backgroundSize: "200% 100%",
              }}
              animate={{
                backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
              }}
              transition={{
                duration: 8,
                ease: "linear",
                repeat: Infinity,
              }}
            />

            {/* Multiple layered borders for depth */}
            <div className="absolute inset-0 rounded-2xl bg-rich-blue-950/90 border border-amber-400/20" />
            <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-br from-rich-blue-950 via-rich-blue-900/90 to-rich-blue-950" />
            <div className="absolute inset-[2px] rounded-xl backdrop-blur-sm bg-rich-blue-950/50" />

            {/* Inner content area */}
            <div className="relative rounded-2xl p-5 sm:p-7 md:p-8 overflow-hidden">
              {/* Premium background effects */}
              <div className="absolute inset-0 overflow-hidden">
                {/* Dark base with noise texture */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(30,41,59,0.8) 0%, rgba(15,23,42,0.95) 100%)",
                    backgroundBlendMode: "multiply",
                  }}
                />

                {/* Subtle noise texture */}
                <div
                  className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  }}
                />

                {/* Directional gradient overlay - static position */}
                <div
                  className="absolute inset-0 opacity-[0.07]"
                  style={{
                    background:
                      "linear-gradient(45deg, transparent 30%, rgba(251,191,36,0.3) 100%)",
                    filter: "blur(30px)",
                    transform: "translateZ(0)",
                  }}
                />

                {/* Enhanced geometric grid pattern */}
                <div className="absolute inset-0 overflow-hidden opacity-[0.04]">
                  {/* Horizontal lines */}
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={`h-line-${i}`}
                      className="absolute h-[1px] w-full bg-amber-300/30"
                      style={{ top: `${i * 30}px` }}
                    />
                  ))}
                  {/* Vertical lines */}
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={`v-line-${i}`}
                      className="absolute w-[1px] h-full bg-amber-300/30"
                      style={{ left: `${i * 30}px` }}
                    />
                  ))}
                </div>

                {/* Premium floating particles */}
                {Array.from({ length: 15 }).map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute rounded-full"
                    style={{
                      width: 2 + (i % 3),
                      height: 2 + (i % 3),
                      left: `${10 + i * 6}%`,
                      top: `${Math.floor(Math.random() * 100)}%`,
                      backgroundColor:
                        i % 3 === 0
                          ? "rgba(251,191,36,0.5)"
                          : i % 3 === 1
                          ? "rgba(255,255,255,0.3)"
                          : "rgba(20,184,166,0.4)",
                    }}
                    animate={{
                      y: [0, -30, 0],
                      opacity: [0, 0.6, 0],
                      scale: [0.4, 1, 0.4],
                    }}
                    transition={{
                      duration: 4 + (i % 5),
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>

              {/* NEW: Top disclaimer banner - fixed position instead of rotated ribbon */}
              <motion.div
                className="absolute top-0 left-0 right-0 bg-gradient-to-r from-amber-600/90 via-amber-500/90 to-amber-600/90 shadow-md z-10"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              >
                <div className="flex items-center justify-center py-2 px-3">
                  <LuInfo className="w-4 h-4 text-rich-blue-950 mr-2 flex-shrink-0" />
                  <span className="text-xs font-bold text-rich-blue-950 text-center">
                    NOT INVESTMENT ADVICE
                  </span>
                </div>
              </motion.div>

              {/* Main content area - added top padding to account for the banner */}
              <div className="relative z-10 flex flex-col space-y-7 pt-12">
                {/* Header section */}
                <div className="space-y-4">
                  {/* Eyebrow text with enhanced styling */}
                  <motion.div
                    className="flex items-center justify-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="relative flex items-center gap-2 px-4 py-1.5">
                      {/* Background with glass effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-300/5 via-amber-300/10 to-amber-300/5 rounded-full border border-amber-300/20 backdrop-blur-md" />
                      <LuBrain className="relative z-10 text-amber-300 w-4 h-4" />
                      <span className="relative z-10 text-amber-100 text-xs font-semibold uppercase tracking-widest">
                        Premium Insights
                      </span>
                    </div>
                  </motion.div>

                  {/* Main heading with enhanced animation */}
                  <motion.div
                    className="relative text-center mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="relative inline-block"
                      initial={{ perspective: 1000 }}
                    >
                      <motion.h2
                        className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-100"
                        initial={{ opacity: 0, y: 20, rotateX: -20 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                      >
                        The Knowledge Vault
                      </motion.h2>

                      {/* Enhanced underline effect */}
                      <motion.div
                        className="absolute left-0 right-0 h-[2px] bottom-0"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.7 }}
                      >
                        <div className="h-full bg-gradient-to-r from-transparent via-amber-300/70 to-transparent" />
                        <div className="absolute top-[2px] left-[5%] right-[5%] h-[1px] bg-gradient-to-r from-transparent via-amber-300/30 to-transparent blur-[1px]" />
                      </motion.div>
                    </motion.div>
                  </motion.div>

                  {/* Two-step messaging with enhanced transition */}
                  <AnimatePresence mode="wait">
                    {step === 1 ? (
                      <motion.p
                        key="step1"
                        className="text-center text-amber-100/80 font-light mx-auto max-w-md"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{
                          opacity: 0,
                          y: -10,
                          transition: { duration: 0.3 },
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        Exclusive market insights curated by our analytical
                        team, delivered directly to you.
                      </motion.p>
                    ) : (
                      <motion.div
                        key="step2"
                        className="space-y-5"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <p className="text-center text-amber-100/80 leading-relaxed font-light mx-auto max-w-md">
                          Receive our premium analysis of emerging market trends
                          and potential opportunities to inform your investment
                          strategy.
                        </p>

                        {/* Enhanced feature cards with glass morphism */}
                        <div className="grid grid-cols-2 gap-4 mt-5">
                          <motion.div
                            className="relative rounded-xl overflow-hidden"
                            whileHover={{
                              y: -4,
                              transition: { duration: 0.2 },
                            }}
                          >
                            {/* Glass background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-rich-blue-800/40 to-rich-blue-900/40 backdrop-blur-md border border-amber-300/10" />

                            {/* Corner accent */}
                            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-amber-300/20 to-transparent rounded-bl-[40px]" />

                            <div className="relative p-4">
                              <div className="flex items-center gap-2 mb-3">
                                <div className="p-1.5 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-600/20 backdrop-blur-sm">
                                  <LuTrendingUp className="w-4 h-4 text-amber-300" />
                                </div>
                                <h3 className="text-sm font-medium text-amber-100">
                                  Market Analysis
                                </h3>
                              </div>
                              <p className="text-xs leading-relaxed text-amber-100/70">
                                Advanced perspectives on developing market
                                trends and conditions
                              </p>
                            </div>
                          </motion.div>

                          <motion.div
                            className="relative rounded-xl overflow-hidden"
                            whileHover={{
                              y: -4,
                              transition: { duration: 0.2 },
                            }}
                          >
                            {/* Glass background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-rich-blue-800/40 to-rich-blue-900/40 backdrop-blur-md border border-amber-300/10" />

                            {/* Corner accent */}
                            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-amber-300/20 to-transparent rounded-bl-[40px]" />

                            <div className="relative p-4">
                              <div className="flex items-center gap-2 mb-3">
                                <div className="p-1.5 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-600/20 backdrop-blur-sm">
                                  <LuLightbulb className="w-4 h-4 text-amber-300" />
                                </div>
                                <h3 className="text-sm font-medium text-amber-100">
                                  Strategy Insights
                                </h3>
                              </div>
                              <p className="text-xs leading-relaxed text-amber-100/70">
                                Discover rigorous investment concepts and
                                analytical frameworks
                              </p>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Form section with enhanced styling */}
                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  onClick={handleInteraction}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {/* Enhanced input field with glow effect */}
                  <div className="relative group">
                    {/* Animated glow on focus */}
                    <motion.div
                      className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-amber-300/0 via-amber-300/30 to-amber-300/0 opacity-0 group-focus-within:opacity-100 blur-md transition-opacity duration-500"
                      animate={{
                        backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
                      }}
                      transition={{
                        duration: 3,
                        ease: "linear",
                        repeat: Infinity,
                      }}
                    />

                    <div className="relative">
                      <Input
                        type="email"
                        placeholder="Your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-rich-blue-900/30 border border-amber-300/30 focus:border-amber-300/60 focus:ring focus:ring-amber-300/20 px-4 py-3.5 text-base text-amber-50 placeholder-amber-100/40 rounded-lg backdrop-blur-sm shadow-inner"
                      />
                    </div>
                  </div>

                  {/* Trust indicators */}
                  <div className="flex items-center justify-between text-xs text-amber-100/50 px-1">
                    <div className="flex items-center gap-1.5">
                      <LuCheck className="w-3 h-3 text-amber-300/70" />
                      <span>No spam, ever</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <LuShield className="w-3 h-3 text-amber-300/70" />
                      <span>Unsubscribe anytime</span>
                    </div>
                  </div>

                  {/* Enhanced submit button */}
                  <div className="pt-1">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative group"
                    >
                      {/* Premium button glow effect */}
                      <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-amber-400/60 to-amber-500/60 group-hover:from-amber-400/80 group-hover:to-amber-500/80 group-active:from-amber-400/60 group-active:to-amber-500/60 blur opacity-75 group-hover:opacity-100 transition duration-200" />

                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="relative w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-rich-blue-950 py-3.5 px-4 rounded-lg transition-all duration-300 font-medium text-base shadow-xl disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
                      >
                        {/* Shimmer effect */}
                        <motion.div
                          className="absolute inset-0 w-[200%] bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                          animate={{ translateX: ["100%", "-100%"] }}
                          transition={{
                            duration: 1.5,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatDelay: 2,
                          }}
                        />

                        <span className="relative flex items-center justify-center gap-2 text-base">
                          {isLoading ? (
                            <span className="flex items-center gap-2">
                              <motion.div
                                className="w-4 h-4 border-2 border-rich-blue-950/30 border-t-rich-blue-950 rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                              />
                              <span>Securing Access...</span>
                            </span>
                          ) : (
                            <>
                              <span className="font-semibold tracking-wide">
                                Unlock Premium Insights
                              </span>
                              <motion.div
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              >
                                <LuArrowRight className="w-5 h-5" />
                              </motion.div>
                            </>
                          )}
                        </span>
                      </Button>
                    </motion.div>
                  </div>
                </motion.form>

                {/* Enhanced disclaimer text */}
                <motion.div
                  className="text-center pt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <p className="text-xs text-amber-100/30 max-w-md mx-auto leading-relaxed">
                    By subscribing, you acknowledge this is for educational and
                    analytical purposes only and does not constitute investment
                    advice. Past performance is not indicative of future
                    results.
                  </p>

                  {/* Enhanced dismiss button */}
                  <motion.button
                    onClick={() => setTimeout(onClose, 100)}
                    className="mt-5 text-xs text-amber-100/50 hover:text-amber-100/70 transition-colors duration-200 py-2 px-4 rounded-full hover:bg-rich-blue-800/30"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    I'll explore these insights later
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NewsletterPopup;

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LuUsers, LuCircleCheck, LuArrowRight } from "react-icons/lu";

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
  const [recentSignups, setRecentSignups] = useState(134);

  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    // Simulate real-time signups
    const signupInterval = setInterval(() => {
      setRecentSignups((prev) => prev + 1);
    }, 12000);

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
      clearInterval(signupInterval);
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center px-2 sm:px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        <motion.div
          className="relative w-full max-w-lg rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-1 shadow-2xl mx-2"
          initial={{ scale: 0.9, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 30, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-gradient opacity-50" />

          {/* Live Counter Banner - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute left-1/2 transform -translate-x-1/2 bg-blue-600/90 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm shadow-lg flex items-center gap-1.5 sm:gap-2 max-w-[calc(100%-2rem)] sm:max-w-[90vw] mx-auto"
            style={{
              top: "calc(100% + 0.5rem)",
              width: "max-content",
            }}
          >
            <LuUsers className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="truncate">
              <span className="sm:hidden">
                {recentSignups}+ exploring opportunities
              </span>
              <span className="hidden sm:inline">
                {recentSignups} people exploring market opportunities
              </span>
            </span>
          </motion.div>

          <div className="relative rounded-xl sm:rounded-2xl bg-gray-900/95 p-4 sm:p-6 md:p-8">
            {/* Premium Hero Section */}
            <div className="relative h-36 sm:h-44 md:h-56 mb-6 sm:mb-8 overflow-hidden rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-900 to-gray-900">
              <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-8" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-blue-900/20" />

              <div className="absolute inset-2 sm:inset-3 rounded-lg overflow-hidden ring-1 ring-white/10 shadow-2xl">
                <img
                  src="/images/popup.jpeg"
                  alt="Newsletter Hero"
                  className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/40 to-gray-900/80" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 animate-gradient-x" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 bg-gradient-to-t from-gray-900/95 to-transparent">
                <motion.h2
                  className="text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-blue-400 text-xl sm:text-2xl md:text-3xl leading-tight drop-shadow-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  The Wealthy Don't Wait—Neither Should You
                </motion.h2>
              </div>

              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse delay-1000" />
            </div>

            <div className="space-y-5 sm:space-y-6">
              <p className="text-center text-gray-300 text-sm sm:text-base">
                Every second you hesitate is an opportunity someone else seizes.
                <motion.strong
                  className="block text-base sm:text-lg text-white mt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Stay ahead, build faster, and secure your financial edge.
                </motion.strong>
              </p>

              <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Enter your email for instant access"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-gray-800/50 border-gray-700 focus:border-blue-500 focus:ring-blue-500/20 px-3 sm:px-4 py-4 sm:py-5 text-sm sm:text-base text-white placeholder-gray-400"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] sm:text-xs text-gray-400 px-0.5 sm:px-1">
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="rounded-full bg-green-500/10 p-0.5 sm:p-1"
                    >
                      <LuCircleCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-500" />
                    </motion.div>
                    <span>Enterprise-grade security</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="rounded-full bg-green-500/10 p-0.5 sm:p-1"
                    >
                      <LuCircleCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-500" />
                    </motion.div>
                    <span>Privacy guaranteed</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white py-4 sm:py-5 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base touch-manipulation mt-1"
                >
                  <span className="flex items-center justify-center gap-2">
                    {isLoading ? (
                      "Securing Your Spot..."
                    ) : (
                      <>
                        Get Exclusive Access Now
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <LuArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </motion.div>
                      </>
                    )}
                  </span>
                </Button>
              </form>

              <motion.div
                className="text-center pt-2 opacity-80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <button
                  onClick={() => {
                    setTimeout(onClose, 150);
                  }}
                  className="text-xs sm:text-sm text-gray-500 hover:text-gray-400 transition-colors duration-200 py-2 px-3 touch-manipulation opacity-75 tracking-tight"
                  aria-label="Dismiss popup"
                >
                  I understand I may miss out on exclusive insights
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NewsletterPopup;

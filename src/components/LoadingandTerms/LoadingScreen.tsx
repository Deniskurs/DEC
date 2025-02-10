import React from "react";
import { motion } from "framer-motion";
import { LuDollarSign } from "react-icons/lu";

interface LoadingScreenProps {
  prefersReducedMotion: boolean;
  isMobile: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  prefersReducedMotion,
  isMobile,
}) => {
  // Optimized particle count based on device
  const particleCount = isMobile ? 10 : 20;

  return (
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
      {[...Array(particleCount)].map((_, i) => (
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
  );
};

export default LoadingScreen;

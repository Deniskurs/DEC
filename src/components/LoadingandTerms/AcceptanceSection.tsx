import React from "react";
import { motion } from "framer-motion";
import { Checkbox } from "../../components/ui/checkbox";
import { LuShield, LuChevronRight, LuInfo } from "react-icons/lu";

interface AcceptanceSectionProps {
  accepted: boolean;
  setAccepted: (value: boolean) => void;
  isAcceptanceValid: boolean;
  handleAccept: () => void;
  getRemainingRequirements: () => string[];
  isMobile: boolean;
  termsStatus?: {
    daysRemaining?: number;
    expiryDate?: string;
  };
}

const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.98 },
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

/* Enhanced Button Component */
const ButtonEnhancement = ({
  isAcceptanceValid,
  children,
}: {
  isAcceptanceValid: boolean;
  children: React.ReactNode;
}) => {
  // Particles for the success state
  const particleCount = 20;

  return (
    <div className="relative">
      {/* Dynamic Background Effect */}
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rich-blue-900/20 via-cream-50/5 to-rich-blue-900/20 animate-gradient" />
        {isAcceptanceValid && (
          <>
            {/* Animated particles */}
            {[...Array(particleCount)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cream-50/30 rounded-full"
                initial={{
                  x: "50%",
                  y: "50%",
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  scale: Math.random() * 1.5,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear",
                }}
              />
            ))}

            {/* Pulse effect */}
            <motion.div
              className="absolute inset-0 rounded-xl bg-cream-50/5"
              animate={{
                scale: [1, 1.02, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </>
        )}
      </div>

      {/* Button Content Wrapper */}
      <motion.div
        className={`
          relative rounded-xl overflow-hidden
          ${isAcceptanceValid ? "hover:shadow-xl" : ""}
          transition-all duration-500
        `}
        whileHover={isAcceptanceValid ? { scale: 1.02 } : undefined}
        whileTap={isAcceptanceValid ? { scale: 0.98 } : undefined}
      >
        {/* Shine effect overlay */}
        {isAcceptanceValid && (
          <motion.div
            className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-cream-50/10 to-transparent"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
            }}
            style={{ willChange: "transform" }}
          />
        )}

        {/* Interactive border effect */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 rounded-xl border border-cream-50/10 backdrop-blur-sm" />
          {isAcceptanceValid && (
            <motion.div
              className="absolute inset-0 rounded-xl border-2 border-cream-50/30"
              animate={{
                scale: [1, 1.02, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </div>

        {children}
      </motion.div>
    </div>
  );
};

export const AcceptanceSection: React.FC<AcceptanceSectionProps> = ({
  accepted,
  setAccepted,
  isAcceptanceValid,
  handleAccept,
  getRemainingRequirements,
  isMobile,
  termsStatus,
}) => {
  return (
    <div className="space-y-4">
      {/* Terms Status Display */}
      {termsStatus &&
        termsStatus.daysRemaining &&
        termsStatus.daysRemaining > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-cream-50/70 text-sm"
          >
            Previous acceptance expires in {termsStatus.daysRemaining} days
            {termsStatus.expiryDate &&
              ` (${new Date(termsStatus.expiryDate).toLocaleDateString()})`}
          </motion.div>
        )}

      {/* Acceptance Checkbox */}
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
            I confirm that I have read, understood, and agree to the investment
            disclaimers, risks, and terms of service. I understand these terms
            are valid for 30 days and will need to be reaccepted after
            expiration.
          </span>
        </label>
      </motion.div>

      {/* Accept Button with Enhanced Effects */}
      <ButtonEnhancement isAcceptanceValid={isAcceptanceValid}>
        <motion.button
          onClick={handleAccept}
          disabled={!isAcceptanceValid}
          className={`
            group relative w-full py-4 rounded-xl font-semibold
            transition-all duration-500
            ${
              !isAcceptanceValid
                ? "bg-cream-50/10 cursor-not-allowed"
                : "bg-gradient-to-r from-cream-50/90 via-cream-50/95 to-cream-50/90 text-rich-blue-800 hover:from-cream-50/95 hover:via-cream-100 hover:to-cream-50/95"
            }
          `}
        >
          <span
            className={`
              relative z-10 flex items-center justify-center gap-2
              transition-all duration-500
              ${isAcceptanceValid ? "scale-105" : "scale-95 opacity-50"}
            `}
          >
            <LuShield
              className={`
                w-5 h-5 transition-transform duration-500 
                ${isAcceptanceValid ? "scale-110" : "scale-90"}
              `}
            />
            ACCEPT & ENTER
            <LuChevronRight
              className={`
                w-5 h-5 transition-all duration-500
                ${
                  isAcceptanceValid
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-2"
                }
                group-hover:translate-x-1
              `}
            />
          </span>
        </motion.button>
      </ButtonEnhancement>

      {/* Requirements List */}
      {!isAcceptanceValid && (
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
  );
};

export default AcceptanceSection;

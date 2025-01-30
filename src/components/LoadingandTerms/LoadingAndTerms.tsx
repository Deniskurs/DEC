import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  LuShield,
  LuTriangleAlert,
  LuArrowDown,
  LuDollarSign,
  LuInfo,
  LuClock,
} from "react-icons/lu";
import { css } from "@emotion/react";
import { termsManager } from "../../utils/termsManager";

export interface LoadingAndTermsProps {
  onAccept: () => void;
  minReadTime?: number; // in seconds, default will be 5
}

const scrollbarStyles = css`
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(59, 130, 246, 0.5);
    border-radius: 3px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(59, 130, 246, 0.7);
  }
`;

const LoadingAndTerms: React.FC<LoadingAndTermsProps> = ({
  onAccept,
  minReadTime = 5, // default 5 seconds
}) => {
  const [loading, setLoading] = useState(true);
  const [showTerms, setShowTerms] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [readTime, setReadTime] = useState(0);
  const [hasReachedBottom, setHasReachedBottom] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();

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

    if (scrollPercentage > readTime) {
      setReadTime(scrollPercentage);
    }

    setHasReachedBottom(Math.ceil(scrollPosition) >= totalHeight - 1);
  };

  const isAcceptanceValid = () => {
    return (
      accepted && hasReachedBottom && readTime >= 80 && timeSpent >= minReadTime
    );
  };

  const getRemainingRequirements = () => {
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

  const handleAccept = () => {
    if (isAcceptanceValid()) {
      termsManager.acceptTerms();
      onAccept();
    }
  };

  return (
    <AnimatePresence>
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center overflow-hidden"
        >
          <div className="flex flex-col items-center justify-center text-center">
            {/* Loading animation container */}
            <div className="relative mb-8">
              {/* Background gradients */}
              <motion.div
                className="absolute -inset-4 rounded-full bg-blue-500/20 blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Rotating outer ring */}
              <motion.div
                className="relative w-24 h-24"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div className="absolute inset-0 rounded-full border-4 border-blue-500/30" />
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Centered icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <LuDollarSign className="text-blue-400 w-8 h-8" />
                </div>
              </motion.div>
            </div>

            {/* Loading text */}
            <motion.h2
              className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Preparing Secure Environment
            </motion.h2>
            <motion.p
              className="text-sm text-gray-400 mt-2"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            >
              Initializing protected domain...
            </motion.p>
          </div>
        </motion.div>
      ) : showTerms ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl overflow-hidden"
          >
            {/* Background gradients */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50" />
              <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
            </div>

            <div className="relative p-4 space-y-4">
              {/* Header with timer */}
              <div className="flex items-center justify-between mb-2 px-2">
                <div className="flex items-center gap-3">
                  <LuShield className="w-6 h-6 text-blue-500" />
                  <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    Investment Disclaimer
                  </h2>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <LuClock className="w-4 h-4" />
                  <span className="text-sm">{timeSpent}s</span>
                </div>
              </div>

              {/* Scroll indicator */}
              <div className="relative flex justify-center">
                <motion.div
                  className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-200 text-sm py-2 px-4 rounded-full flex items-center gap-2 backdrop-blur-sm"
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span>Scroll to continue</span>
                  <motion.div
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <LuArrowDown className="w-4 h-4" />
                  </motion.div>
                </motion.div>
              </div>

              {/* Scrollable content */}
              <div
                ref={scrollRef}
                className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 custom-scrollbar space-y-4 overflow-y-auto"
                css={scrollbarStyles}
                style={{ maxHeight: "40vh" }}
                onScroll={handleScroll}
              >
                {/* Initial warning banner */}
                <div className="flex items-start gap-3 p-4 bg-yellow-500/10 rounded-lg">
                  <LuTriangleAlert className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" />
                  <p className="text-yellow-200 font-medium">
                    Please read this disclaimer carefully before accessing our
                    investment platform. Your access to this site is contingent
                    upon your understanding and acceptance of these terms.
                  </p>
                </div>

                {/* Disclaimer Sections */}
                <section className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                      Risk Warning
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      The value of investments can go down as well as up and you
                      may receive back less than your original investment. Past
                      performance is not a reliable indicator of future results.
                      Historical returns, expected returns, or probability
                      projections are provided for informational and
                      illustrative purposes only and may not reflect actual
                      future performance.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                      Qualified Investor Statement
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      By accessing this platform, you represent and warrant that
                      you are a qualified, sophisticated, or accredited investor
                      as defined by applicable securities laws in your
                      jurisdiction. You confirm that you have sufficient
                      knowledge, market sophistication, professional advice, and
                      experience to make your own evaluation of the merits and
                      risks of any investment.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                      Investment Risks
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      All trading in financial products carries significant
                      risks to your capital. Investment products shown on this
                      site may be highly speculative and you could lose your
                      entire investment. You should not invest money that you
                      cannot afford to lose. Trading derivative financial
                      products on margin carries additional risks and may not be
                      suitable for all investors.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                      Financial Advice Disclaimer
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      The information contained on this website is provided for
                      informational purposes only and does not constitute
                      financial, investment, legal, or tax advice. Nothing
                      contained on this platform should be construed as a
                      solicitation or offer, or recommendation, to acquire or
                      dispose of any investment or to engage in any other
                      transaction. You should seek independent professional
                      financial, legal, and tax advice before making any
                      investment decisions.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                      Regulatory Compliance
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      Our investment services are regulated by relevant
                      financial authorities. We maintain compliance with
                      applicable securities laws, anti-money laundering
                      regulations, and know-your-customer requirements.
                      Regulatory protection may vary depending on your location
                      and the specific investment product.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                      Market Data & Information
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      While we strive to ensure the accuracy of all information
                      presented, we cannot guarantee the accuracy, completeness,
                      timeliness, or reliability of any information or data
                      displayed. Market data may be delayed. No representation
                      is made that any account will or is likely to achieve
                      profits or losses similar to those shown.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                      Electronic Trading Risks
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      Electronic trading poses unique risks including, but not
                      limited to, system failures, market volatility, and delays
                      in execution. You should maintain alternative trading
                      arrangements in the event that electronic trading becomes
                      unavailable.
                    </p>
                  </div>

                  {/* Final notice */}
                  <div className="flex items-start gap-3 p-4 bg-blue-500/10 rounded-lg mt-8">
                    <LuInfo className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                    <p className="text-blue-200 text-sm">
                      This disclaimer is not exhaustive and may be updated from
                      time to time. Continued use of this platform constitutes
                      acceptance of any changes to these terms.
                    </p>
                  </div>
                </section>
              </div>
              {/* Acceptance Section */}
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-3 space-y-3">
                <div className="flex items-start gap-3 p-3 bg-black/20 rounded-lg cursor-pointer">
                  <div className="relative mt-1">
                    <Checkbox
                      checked={accepted}
                      onCheckedChange={(checked) => setAccepted(!!checked)}
                      className="w-5 h-5 border-2 border-gray-600 data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500 rounded-md transition-all duration-300 hover:border-blue-400 focus:ring-2 focus:ring-blue-500/50 relative z-10"
                    />
                  </div>
                  <label
                    htmlFor="terms"
                    className="text-sm text-gray-300 cursor-pointer"
                    onClick={() => setAccepted(!accepted)}
                  >
                    I confirm that I have read, understood, and agree to the
                    investment disclaimers, risks, and terms of service.
                  </label>
                </div>
                <Button
                  onClick={handleAccept}
                  disabled={!isAcceptanceValid()}
                  className={`
                    relative w-full py-4 rounded-lg
                    transition-all duration-500 ease-in-out
                    ${
                      !isAcceptanceValid()
                        ? "bg-gray-600 cursor-not-allowed opacity-50"
                        : `
                        bg-gradient-to-r from-blue-600 to-blue-700
                        hover:from-blue-500 hover:to-blue-600
                        hover:scale-105
                        hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]
                        active:scale-95
                        motion-safe:transform
                      `
                    }
                  `}
                >
                  <span className="flex items-center justify-center gap-2">
                    <LuShield className="w-5 h-5" />
                    Accept & Enter
                  </span>
                </Button>
                {!isAcceptanceValid() && (
                  <div className="text-xs text-gray-500 space-y-1">
                    {getRemainingRequirements().map((req, index) => (
                      <p key={index} className="text-center">
                        {req}
                      </p>
                    ))}
                  </div>
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

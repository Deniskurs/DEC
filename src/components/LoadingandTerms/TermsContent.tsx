import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LuTriangleAlert,
  LuInfo,
  LuArrowDown,
  LuShield,
  LuClock,
} from "react-icons/lu";
import { css } from "@emotion/react";

interface TermsContentProps {
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
  scrollRef: React.RefObject<HTMLDivElement>;
  isMobile: boolean;
  animationConfig: { duration: number; ease: number[] };
  prefersReducedMotion: boolean;
  timeSpent: number;
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

// Expanded disclaimer sections with comprehensive legal language (without performance numbers)
const disclaimerSections = [
  {
    title: "Risk Warning & Performance Disclaimer",
    content:
      "Investing in the advanced algorithmic trading strategies offered by Delta Edge Capital involves significant risks, including the potential loss of your entire investment. The historical performance metrics presented on this platform are derived solely from past performance and do not guarantee future results. Market volatility, economic fluctuations, and unforeseen technological or geopolitical events may adversely affect the value of your investment. By accessing this platform, you acknowledge that investing is inherently speculative and that no assurances are provided regarding future returns.",
  },
  {
    title: "Qualified Investor Statement",
    content:
      "By accessing and using this platform, you represent and warrant that you are a qualified, sophisticated, or accredited investor as defined by applicable securities laws. You affirm that you possess the necessary financial expertise, experience, and risk tolerance to understand and accept the complexities and potential downsides of our algorithm-driven investment strategies. The services provided are strictly limited to investors who meet these rigorous criteria.",
  },
  {
    title: "Investment Risks and Volatility",
    content:
      "Investments in algorithmic trading strategies are subject to a range of risks, including market, liquidity, credit, operational, regulatory, and technology risks. Adverse market conditions, regulatory changes, and rapid technological advancements may result in significant fluctuations in investment value. Investors must be prepared for periods of volatility and the potential for loss of principal. It is imperative that you conduct independent due diligence and consult with qualified financial advisors before making any investment decisions.",
  },
  {
    title: "No Investment Advice & No Guarantee",
    content:
      "All information provided on this platform is for general informational purposes only and does not constitute personalized investment, legal, or tax advice. Nothing contained herein should be construed as an offer, solicitation, or recommendation to buy or sell any securities or financial instruments. Delta Edge Capital makes no warranties or representations regarding the accuracy, completeness, or reliability of the information provided. All forward-looking statements are subject to risks and uncertainties, and no assurances are given that future performance will mirror past performance.",
  },
  {
    title: "Forward-Looking Statements & Uncertainty",
    content:
      "This platform may include forward-looking statements reflecting our current expectations and assumptions regarding future events and financial performance. Such statements are inherently uncertain and subject to a wide range of risks, including market conditions, regulatory changes, and economic factors. Actual outcomes may differ materially from those anticipated. Investors are advised not to rely solely on these forward-looking statements and to verify all information independently before making any investment decisions.",
  },
  {
    title: "Limitation of Liability & Indemnification",
    content:
      "Under no circumstances shall Delta Edge Capital, its affiliates, directors, officers, employees, or agents be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of this platform or reliance on any information provided herein. By accessing this platform, you agree to indemnify, defend, and hold harmless Delta Edge Capital and its associated parties from any claims, losses, or damages arising out of your use of the platform or any breach of these terms.",
  },
  {
    title: "Terms, Duration & Amendments",
    content:
      "These terms and conditions are effective from the date of acceptance. Continued access and use of the platform indicates your ongoing acceptance of these terms. Delta Edge Capital reserves the right to modify, amend, or update these terms at any time without prior notice. It is your responsibility to periodically review these terms to remain informed of any changes.",
  },
];

export const TermsContent: React.FC<TermsContentProps> = ({
  onScroll,
  scrollRef,
  isMobile,
  animationConfig,
  prefersReducedMotion,
  timeSpent,
}) => {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleFirstScroll = (e: React.UIEvent<HTMLDivElement>) => {
      if (!hasScrolled) {
        setHasScrolled(true);
      }
      onScroll(e);
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleFirstScroll as any);
      return () => {
        scrollElement.removeEventListener("scroll", handleFirstScroll as any);
      };
    }
  }, [hasScrolled, onScroll, scrollRef]);

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col">
      {/* Header and Timer */}
      <div className="flex items-center justify-between pb-4 md:pb-6">
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
        className="flex justify-center pb-4 md:pb-6"
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
        className="bg-rich-blue-900/30 rounded-xl p-6 custom-scrollbar overflow-y-auto backdrop-blur-sm border border-cream-50/10"
        css={scrollbarStyles}
        style={{
          maxHeight: isMobile ? "calc(var(--vh, 1vh) * 45)" : "40vh",
          willChange: "scroll-position",
          transform: "translate3d(0, 0, 0)",
          overscrollBehavior: isMobile ? "contain" : "auto",
          WebkitOverflowScrolling: "touch",
          // Added extra bottom padding that accounts for the safe area inset on iOS devices.
          paddingBottom: "calc(4rem + env(safe-area-inset-bottom, 20px))",
        }}
        onScroll={onScroll}
      >
        <div className="space-y-6">
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
              investment platform. Your access to this site is contingent upon
              your full understanding and acceptance of these terms.
            </p>
          </motion.div>

          {/* Disclaimer Sections */}
          {disclaimerSections.map((section, index) => (
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
            className="flex items-start gap-3 p-4 bg-cream-50/5 rounded-xl border border-cream-50/10"
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
              This disclaimer is not exhaustive and may be updated periodically.
              Your continued use of this platform constitutes acceptance of any
              changes. Please review these terms regularly to remain informed of
              all updates.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TermsContent;

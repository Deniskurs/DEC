import React from "react";
import { motion } from "framer-motion";
import {
  LuBrain,
  LuEye,
  LuClock,
  LuLock,
  LuShield,
  LuZap,
  LuStar,
} from "react-icons/lu";
import FeatureCard from "./FeatureCard";
import SectionCTA from "../CTA/SectionCTA";

// Your existing features array
const features = [
  {
    Icon: LuBrain,
    title: "Performance-Driven Intelligence",
    description:
      "Our AI isn't just advanced, it's evolving constantly. Leveraging cutting-edge algorithms and machine learning to target consistent growth through sophisticated algorithmic trading strategies. Each decision is data-driven, each strategy refined through extensive testing",
    stats: {
      value: "24%",
      label: "Annual Target",
    },
    iconLabel: "AI-Powered",
  },
  {
    Icon: LuEye,
    title: "Fully Audited Excellence",
    description:
      "Complete transparency through comprehensive third-party audits. Our performance metrics and operational processes undergo rigorous independent verification. Every aspect of our operation adheres to the highest standards of financial integrity and regulatory compliance",
    stats: {
      value: "100%",
      label: "Audit Verified",
    },
    iconLabel: "Verified",
  },
  {
    Icon: LuClock,
    title: "24/7 Expert Support",
    description:
      "Speak to a real expert within minutes. No scripts, no waiting. Our team is as committed to your success as you are. Elite service for elite investors",
    stats: {
      value: "<2min",
      label: "Response Time",
    },
    iconLabel: "Always On",
  },
];

// New TrustRating component to be passed to SectionCTA
const TrustRating = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="flex flex-col items-center space-y-2 mt-4"
  >
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <LuStar key={i} className="w-4 h-4 fill-current text-yellow-400" />
      ))}
    </div>
    <a
      href="#"
      className="text-cream-50/90 text-sm hover:text-cream-50 transition-colors duration-200"
      target="_blank"
      rel="noopener noreferrer"
    >
      4.8/5 on Trustpilot
    </a>
  </motion.div>
);

const FeaturesSection: React.FC = () => {
  return (
    <>
      <div className="relative overflow-hidden">
        {/* Enhanced Background with Grid Parallax Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 via-white to-gray-50/50">
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "radial-gradient(circle at 20% 20%, rgba(0, 102, 255, 0.05) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 80%, rgba(0, 102, 255, 0.08) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 20%, rgba(0, 102, 255, 0.05) 0%, transparent 50%)",
              ],
            }}
            transition={{
              duration: 15,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />

          {/* Grid Parallax Effect */}
          <div className="absolute inset-0 -z-0 bg-[linear-gradient(rgba(0,82,204,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,82,204,0.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]" />
        </div>

        {/* Additional Glow Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-8 lg:px-12">
            {/* Enhanced Header Section with Section Title */}
            <div className="text-center mb-20">
              <div className="section-title" data-text="FEATURES">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="flex items-center justify-center gap-2 mb-6"
                >
                  <LuShield className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-semibold tracking-wider text-blue-600 uppercase">
                    FEATURES
                  </span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
                >
                  Your Wealth, 24/7
                  <span className="block mt-2 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                    Without Compromise
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                >
                  At Delta Edge Capital, we've built a system that embodies what
                  the top 1% value most:{" "}
                  <span className="font-semibold">
                    PRECISION, SPEED, TRANSPARENCY
                  </span>
                  . Our AI isn't just advanced, it's evolving constantly.
                </motion.p>
              </div>
            </div>

            {/* Enhanced Feature Cards Grid */}
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                >
                  <FeatureCard {...feature} />
                </motion.div>
              ))}
            </div>

            {/* Elite Status Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-20 text-center"
            >
              <div className="inline-flex items-center gap-8 px-8 py-4 bg-blue-50/50 rounded-full">
                <div className="flex items-center gap-2">
                  <LuLock className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-600">
                    Institutional Grade Security
                  </span>
                </div>
                <div className="w-px h-6 bg-blue-200" />
                <div className="flex items-center gap-2">
                  <LuZap className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-600">
                    24/7 Algorithmic Trading
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced CTA Section with Dark Mode */}
      <div className="bg-blue-800 relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-rich-blue-800 to-rich-blue-900" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
                 linear-gradient(to right, rgb(255, 255, 255) 1px, transparent 1px),
                 linear-gradient(to bottom, rgb(255, 255, 255) 1px, transparent 1px)
               `,
            backgroundSize: "24px 24px",
          }}
        />

        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-[128px]" />

        {/* Actual CTA Component */}
        <div className="relative">
          <SectionCTA
            title="Time To Scale Your Empire"
            description="Every second of hesitation is a missed opportunity. Your wealth demands elite-level algorithms."
            buttonText="ACTIVATE ALGORITHMIC EDGE"
            darkMode={true}
          />
        </div>
      </div>
    </>
  );
};

export default FeaturesSection;

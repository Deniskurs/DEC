import React from "react";
import { motion } from "framer-motion";
import {
  LuTrendingDown,
  LuArrowRight,
  LuChartNoAxesCombined,
} from "react-icons/lu";
import { formatCurrency } from "../../../utils/formatters";

interface OpportunityCostCardProps {
  dailyOpportunityCost: number;
  totalOpportunityCost: number;
  months: number;
  typeformUrl?: string;
}

const OpportunityCostCard = ({
  dailyOpportunityCost,
  totalOpportunityCost,
  months,
  typeformUrl = "https://2znr0q4ymmj.typeform.com/to/CA5GAbp9",
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        staggerChildren: 0.15,
      },
    },
  };

  const elementVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.25, 0.1, 0, 1] },
    },
  };

  return (
    <motion.section
      className="relative mx-auto max-w-[90rem]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="absolute -inset-px rounded-2xl sm:rounded-3xl"
        animate={{
          background: [
            "radial-gradient(circle at top right, rgba(0,82,204,0.08), transparent 70%), radial-gradient(circle at bottom left, rgba(59,130,246,0.08), transparent 70%)",
            "radial-gradient(circle at top right, rgba(59,130,246,0.08), transparent 70%), radial-gradient(circle at bottom left, rgba(0,82,204,0.08), transparent 70%)",
          ],
        }}
        transition={{ duration: 14, repeat: Infinity, repeatType: "reverse" }}
      />

      <div className="relative overflow-hidden">
        <div className="bg-gradient-to-b from-[#0A1428] to-[#0C1425] rounded-2xl sm:rounded-3xl">
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-white/[0.08]" />
          <div className="absolute inset-px rounded-2xl sm:rounded-3xl border border-white/[0.04]" />

          <motion.div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,82,204,0.15),transparent_70%)]"
            animate={{ opacity: [0.4, 0.6, 0.4] }}
            transition={{
              duration: 7,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.15),transparent_70%)]"
            animate={{ opacity: [0.6, 0.4, 0.6] }}
            transition={{
              duration: 7,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 3.5,
            }}
          />

          <div className="relative p-6 sm:p-8 md:p-10 lg:p-12">
            <div className="space-y-8 sm:space-y-10 lg:space-y-12">
              <motion.div
                className="space-y-4 sm:space-y-6"
                variants={elementVariants}
              >
                <div className="flex items-center gap-3 sm:gap-5">
                  <motion.div
                    className="relative p-2 sm:p-3 md:p-4 bg-gradient-to-br from-red-500/10 to-red-500/5 rounded-xl sm:rounded-2xl"
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(239, 68, 68, 0.2)",
                        "0 0 0 12px rgba(239, 68, 68, 0)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <LuTrendingDown className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-red-400" />
                  </motion.div>
                  <div className="space-y-0.5 sm:space-y-1">
                    <h3 className="font-light tracking-wider text-white/70 uppercase text-xs sm:text-sm">
                      Quantified Opportunity Cost
                    </h3>
                    <div className="text-white/50 text-xs sm:text-sm font-light">
                      Real-time Capital Efficiency Analysis
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <motion.div
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight text-white tracking-tight"
                    animate={{ opacity: [0.95, 1, 0.95] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <span className="mr-2 sm:mr-3 font-light">
                      {formatCurrency(dailyOpportunityCost)}
                    </span>
                    <span className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/40 tracking-normal">
                      daily capital inefficiency
                    </span>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                className="h-px w-full"
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)",
                }}
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              <motion.div
                className="space-y-6 sm:space-y-8"
                variants={elementVariants}
              >
                <div className="space-y-4 sm:space-y-6">
                  <div className="space-y-2 sm:space-y-3">
                    <p className="text-xl sm:text-2xl md:text-3xl text-white/90 font-light leading-relaxed">
                      Your current position indicates{" "}
                      <motion.span
                        className="relative inline-block text-blue-300 font-normal"
                        animate={{ opacity: [0.9, 1, 0.9] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        {formatCurrency(totalOpportunityCost)}
                      </motion.span>{" "}
                      in untapped potential over {months} months.
                    </p>
                    <p className="text-sm sm:text-base md:text-lg text-white/50 font-light">
                      Institutional-grade algorithmic strategies traditionally
                      reserved for sovereign wealth funds.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-white/5">
                      <LuChartNoAxesCombined className="h-4 w-4 sm:h-5 sm:w-5 text-white/60" />
                    </div>
                    <span className="text-xs sm:text-sm font-light text-white/60">
                      Institutional-Grade Infrastructure
                    </span>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="flex justify-center sm:justify-end w-full sm:w-auto"
                >
                  <a
                    href={typeformUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center gap-3 sm:gap-4 px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 bg-gradient-to-r from-blue-500/20 to-blue-600/20 hover:from-blue-500/30 hover:to-blue-600/30 rounded-xl sm:rounded-2xl border border-blue-400/20 transition-all duration-500"
                  >
                    <span className="text-base sm:text-lg md:text-xl text-white font-light tracking-wide">
                      Initiate Private Placement
                    </span>
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    >
                      <LuArrowRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-blue-400" />
                    </motion.div>
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default OpportunityCostCard;

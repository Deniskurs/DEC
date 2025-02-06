// index.tsx
import { motion } from "framer-motion";
import { LuTrendingDown, LuChartNoAxesCombined } from "react-icons/lu";
import { formatCurrency } from "../../../../utils/formatters";

// Background Effects Component
const BackgroundEffects = () => {
  return (
    <>
      {/* Luxury Particle Effect Background */}
      <motion.div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, rgba(252, 249, 240, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 80%, rgba(252, 249, 240, 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 20%, rgba(252, 249, 240, 0.15) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 8,
            ease: "linear",
            repeat: Infinity,
          }}
        />

        {/* Dynamic Light Trails */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "linear-gradient(45deg, transparent 0%, rgba(252, 249, 240, 0.03) 50%, transparent 100%)",
              "linear-gradient(180deg, transparent 0%, rgba(252, 249, 240, 0.03) 50%, transparent 100%)",
              "linear-gradient(45deg, transparent 0%, rgba(252, 249, 240, 0.03) 50%, transparent 100%)",
            ],
          }}
          transition={{
            duration: 5,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      </motion.div>

      {/* Luxury Ambient Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 0.6, 0.4] }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-cream-50/10 to-transparent opacity-40" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-rich-blue-500/10 to-transparent opacity-30" />
        </motion.div>
      </div>

      {/* Border Glow */}
      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-white/[0.08]" />
      <div className="absolute inset-px rounded-2xl sm:rounded-3xl border border-white/[0.04]" />

      {/* Premium Bottom Fade */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-rich-blue-900 to-transparent"
        animate={{ opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </>
  );
};

// Content Component
interface OpportunityCostContentProps {
  dailyOpportunityCost: number;
  totalOpportunityCost: number;
  months: number;
  typeformUrl: string;
}

const OpportunityCostContent = ({
  dailyOpportunityCost,
  totalOpportunityCost,
  months,
  typeformUrl,
}: OpportunityCostContentProps) => {
  const elementVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.25, 0.1, 0, 1] },
    },
  };

  const buttonContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0, 1],
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.25, 0.1, 0, 1],
      },
    },
  };

  return (
    <div className="relative p-6 sm:p-8 md:p-10 lg:p-12">
      <div className="space-y-8 sm:space-y-10 lg:space-y-12">
        <motion.div
          className="space-y-4 sm:space-y-6"
          variants={elementVariants}
        >
          <div className="flex items-center gap-3 sm:gap-5">
            <motion.div
              className="relative p-2 sm:p-3 md:p-4 bg-cream-50/10 rounded-xl sm:rounded-2xl"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(252, 249, 240, 0.2)",
                  "0 0 0 12px rgba(252, 249, 240, 0)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <LuTrendingDown className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-cream-50/90" />
            </motion.div>
            <div className="space-y-0.5 sm:space-y-1">
              <h3 className="font-semibold tracking-[0.2em] text-cream-50/90 uppercase text-xs sm:text-sm">
                Quantified Opportunity Cost
              </h3>
              <div className="text-cream-50/60 text-xs sm:text-sm font-light">
                Real-time Capital Efficiency Analysis
              </div>
            </div>
          </div>

          <div className="relative">
            <motion.div
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-cream-50 tracking-tight"
              animate={{ opacity: [0.95, 1, 0.95] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="mr-2 sm:mr-3">
                {formatCurrency(dailyOpportunityCost)}
              </span>
              <span className="text-base sm:text-lg md:text-xl lg:text-2xl text-cream-50/40 tracking-normal">
                daily capital inefficiency
              </span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="h-px w-full"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(252, 249, 240, 0.08), transparent)",
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
              <p className="text-xl sm:text-2xl md:text-3xl text-cream-50/90 font-light leading-relaxed">
                Your current position indicates{" "}
                <motion.span
                  className="relative inline-block text-cream-50 font-normal"
                  animate={{ opacity: [0.9, 1, 0.9] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {formatCurrency(totalOpportunityCost)}
                </motion.span>{" "}
                in untapped potential over {months} months.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-cream-50/60 font-light">
                Institutional-grade algorithmic strategies traditionally
                reserved for sovereign wealth funds.
              </p>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-1.5 sm:p-2 rounded-lg bg-cream-50/5">
                <LuChartNoAxesCombined className="h-4 w-4 sm:h-5 sm:w-5 text-cream-50/60" />
              </div>
              <span className="text-xs sm:text-sm font-light text-cream-50/60">
                Institutional-Grade Infrastructure
              </span>
            </div>
          </div>

          <motion.div
            className="flex justify-center sm:justify-end"
            variants={buttonContainerVariants}
          >
            <motion.button
              onClick={() => window.open(typeformUrl, "_blank")}
              className="group relative overflow-hidden soft-ui-card bg-cream-50/90 text-rich-blue-800 px-8 py-4 rounded-xl font-semibold flex items-center justify-center hover:bg-cream-100 transition-all duration-500"
              variants={buttonVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-cream-50/0 via-cream-50/50 to-cream-50/0"
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
              <span className="relative z-10 flex items-center">
                Initiate Private Placement
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// Main Card Component
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
}: OpportunityCostCardProps) => {
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

  return (
    <motion.section
      className="relative mx-auto max-w-[90rem]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-rich-blue-900 via-rich-blue-800 to-rich-blue-700">
        <BackgroundEffects />
        <OpportunityCostContent
          dailyOpportunityCost={dailyOpportunityCost}
          totalOpportunityCost={totalOpportunityCost}
          months={months}
          typeformUrl={typeformUrl}
        />
      </div>
    </motion.section>
  );
};

export default OpportunityCostCard;

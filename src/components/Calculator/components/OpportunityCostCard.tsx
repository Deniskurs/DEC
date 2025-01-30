import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LuTrendingDown,
  LuShield,
  LuChevronRight,
  LuCheck,
  LuLock,
  LuDollarSign,
  LuArrowRight,
  LuSparkles,
  LuWallet,
} from "react-icons/lu";
import { formatCurrency } from "../../../utils/formatters";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

interface OpportunityCostCardProps {
  dailyOpportunityCost: number;
  totalOpportunityCost: number;
  months: number;
  currentInvestment: number;
  onInitialize?: () => void;
}

const OpportunityCostCard: React.FC<OpportunityCostCardProps> = ({
  dailyOpportunityCost,
  totalOpportunityCost,
  months,
  currentInvestment,
  onInitialize,
}) => {
  // State management
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState(currentInvestment);
  const [isEditing, setIsEditing] = useState(false);

  // Effect to sync investment amount with prop
  useEffect(() => {
    setInvestmentAmount(currentInvestment);
  }, [currentInvestment]);

  // Animation variants
  const gradientVariants = {
    animate: {
      background: [
        "linear-gradient(45deg, rgba(0,82,204,0.05) 0%, rgba(59,130,246,0.05) 50%, rgba(0,82,204,0.05) 100%)",
        "linear-gradient(45deg, rgba(59,130,246,0.05) 0%, rgba(0,82,204,0.05) 50%, rgba(59,130,246,0.05) 100%)",
      ],
      transition: {
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  // Mobile optimized animation
  const mobileFloatingAnimation = {
    y: [-1, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  };

  const shimmerVariants = {
    animate: {
      x: ["0%", "200%"],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  // Event Handlers
  const handleInitialize = () => {
    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    try {
      setIsProcessing(true);
      // Shorter processing time on mobile
      const processingTime = window.innerWidth < 640 ? 1000 : 1500;
      await new Promise((resolve) => setTimeout(resolve, processingTime));
      setIsConfirmed(true);
      if (onInitialize) onInitialize();

      const wiseUrl = new URL(
        "https://wise.com/pay/business/deltaedgecapitallimited"
      );
      wiseUrl.searchParams.append("amount", investmentAmount.toString());

      window.open(wiseUrl.toString(), "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Error during initialization:", error);
    } finally {
      setIsProcessing(false);
      setShowConfirmation(false);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setInvestmentAmount(Number(value));
  };

  // Hook to handle window resize (placeholder for any future logic)
  useEffect(() => {
    const handleResize = () => {
      // Additional responsive logic can go here if needed
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.section
      className="relative mx-auto max-w-5xl px-4 sm:px-6 py-4 sm:py-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.25, 0.1, 0, 1] }}
    >
      {/* Enhanced animated backdrop */}
      <motion.div
        className="absolute -inset-px rounded-xl sm:rounded-2xl blur-2xl"
        variants={gradientVariants}
        animate="animate"
        aria-hidden="true"
      />

      <div className="relative overflow-hidden">
        <div className="bg-[#0C1425] bg-opacity-98 rounded-xl sm:rounded-2xl backdrop-blur-xl">
          {/* Enhanced decorative elements */}
          <div className="absolute inset-0 rounded-xl sm:rounded-2xl border border-white/5" />
          <div className="absolute inset-px rounded-xl sm:rounded-2xl border border-white/5" />
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.1),transparent_70%)]"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,82,204,0.1),transparent_70%)]"
            animate={{ opacity: [0.8, 0.5, 0.8] }}
            transition={{ duration: 4, repeat: Infinity, delay: 2 }}
          />

          <div className="relative p-4 sm:p-8 lg:p-12">
            {/* Enhanced Elite Status Indicator */}
            <motion.div
              className="absolute top-3 right-3 sm:top-6 sm:right-6 flex items-center gap-2 sm:gap-3"
              animate={mobileFloatingAnimation}
            >
              <div className="flex items-center gap-1.5 sm:gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <LuSparkles className="h-3 w-3 sm:h-4 sm:w-4 text-rich-blue-400" />
                </motion.div>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-rich-blue-400 animate-pulse" />
              </div>
              <span className="text-xs sm:text-sm tracking-widest text-rich-blue-400 uppercase font-light">
                Elite Access
              </span>
            </motion.div>

            {/* Main Content */}
            <div className="mt-8 sm:mt-0 space-y-6 sm:space-y-8">
              {/* Enhanced Daily Loss Counter */}
              <motion.div
                className="space-y-3 sm:space-y-4"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center gap-2 sm:gap-4">
                  <div className="relative">
                    <LuTrendingDown className="h-4 w-4 sm:h-6 sm:w-6 text-red-400" />
                    <motion.div
                      className="absolute inset-0 bg-red-400/20 rounded-full blur-md"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <h3 className="font-light tracking-wider text-white/60 uppercase text-xs sm:text-sm">
                    Your Daily Loss Without Us
                  </h3>
                </div>
                <motion.div
                  className="text-3xl sm:text-5xl lg:text-7xl font-extralight text-white tracking-tight"
                  animate={mobileFloatingAnimation}
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative z-10 mr-2"
                  >
                    {formatCurrency(dailyOpportunityCost)}
                  </motion.span>
                  <span className="text-white/40 text-sm sm:text-base lg:text-xl">
                    per day
                  </span>
                </motion.div>
              </motion.div>

              <motion.div
                className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* Enhanced Impact Statement */}
              <motion.div
                className="space-y-4 sm:space-y-6"
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="text-base sm:text-xl lg:text-2xl text-white/80 font-light leading-relaxed">
                  Current trajectory indicates a{" "}
                  <span className="relative inline-block">
                    {/* This `motion.span` remains valid because <span> is inline */}
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="relative z-10 text-blue-100"
                    >
                      {formatCurrency(totalOpportunityCost)}
                    </motion.span>
                    {/* Changed this from motion.div to motion.span to prevent invalid nesting */}
                    <motion.span
                      className="absolute inset-0 bg-blue-500/10 rounded-lg -z-10"
                      animate={{ opacity: [0.2, 0.4, 0.2] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </span>{" "}
                  capital inefficiency over {months} months.
                </p>

                <motion.div
                  className="flex items-center gap-3 sm:gap-4 text-white/60"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <LuShield className="h-4 w-4 sm:h-5 sm:w-5" />
                  </motion.div>
                  <p className="text-sm sm:text-base lg:text-lg font-light">
                    Systematic Algorithmic Generation Strategy
                  </p>
                </motion.div>
              </motion.div>

              {/* Enhanced CTA */}
              <motion.div
                className="pt-2 sm:pt-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <AnimatePresence mode="wait">
                  {!isConfirmed ? (
                    <Button
                      onClick={handleInitialize}
                      className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-4 sm:py-6 bg-gradient-to-r from-rich-blue-500/20 to-rich-blue-400/10 hover:from-rich-blue-500/30 hover:to-rich-blue-400/20 border border-rich-blue-400/20 rounded-lg sm:rounded-xl transition-all duration-500 overflow-hidden"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0"
                        variants={shimmerVariants}
                        animate="animate"
                      />
                      <span className="text-sm sm:text-base lg:text-lg text-white font-light tracking-wide relative z-10">
                        Secure Investment Allocation
                      </span>
                      <LuChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-rich-blue-400 transition-transform duration-500 group-hover:translate-x-1" />
                    </Button>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-3 text-rich-blue-400"
                    >
                      <LuCheck className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="text-sm sm:text-lg font-light">
                        Investment Confirmed
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-Optimized Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="max-w-2xl mx-4 sm:mx-auto bg-gradient-to-b from-[#0A1020] to-[#0C1425] border-none shadow-2xl shadow-blue-500/10 rounded-xl sm:rounded-2xl">
          <div className="relative p-4 sm:p-8">
            {/* Dialog Decorative Elements */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-purple-500/5 rounded-lg"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:16px_16px] sm:bg-[size:20px_20px]" />

            <div className="relative space-y-6 sm:space-y-8">
              {/* Enhanced Mobile Header */}
              <div className="space-y-4 sm:space-y-6 text-center">
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="mx-auto w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-blue-500/10 to-purple-500/10 flex items-center justify-center"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <LuLock className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400" />
                  </motion.div>
                </motion.div>

                <div className="space-y-2">
                  <DialogTitle className="text-xl sm:text-2xl font-light text-white">
                    Secure Your Investment Position
                  </DialogTitle>
                  <DialogDescription className="text-xs sm:text-sm text-white/60 max-w-md mx-auto">
                    Confirm your allocation to begin generating income on your
                    investment
                  </DialogDescription>
                </div>
              </div>

              {/* Mobile-Optimized Investment Amount Section */}
              <div className="space-y-3 sm:space-y-4">
                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-lg"
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <div className="relative bg-white/5 rounded-lg p-4 sm:p-6 border border-white/10">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div className="flex items-center gap-2">
                        <LuWallet className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white/40" />
                        <span className="text-xs sm:text-sm text-white/60">
                          Investment Amount
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsEditing(!isEditing)}
                        className="text-xs sm:text-sm text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 h-8 px-3"
                      >
                        {isEditing ? "Done" : "Edit"}
                      </Button>
                    </div>

                    {isEditing ? (
                      <div className="relative">
                        <LuDollarSign className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-white/40" />
                        <Input
                          type="number"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={investmentAmount}
                          onChange={handleAmountChange}
                          className="pl-8 sm:pl-12 h-12 sm:h-16 text-xl sm:text-2xl font-light bg-white/5 border-white/10 text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/40 rounded-lg"
                          autoFocus
                        />
                      </div>
                    ) : (
                      <motion.div
                        className="text-2xl sm:text-3xl font-light text-white"
                        animate={mobileFloatingAnimation}
                      >
                        {formatCurrency(investmentAmount)}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Mobile-Optimized Terms and Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
                <motion.div
                  className="bg-white/5 rounded-lg p-3 sm:p-4 border border-white/10"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-white/60 mb-1 sm:mb-2">
                    Daily Potential
                  </div>
                  <div className="text-white font-medium">
                    {formatCurrency(dailyOpportunityCost)}
                  </div>
                </motion.div>
                <motion.div
                  className="bg-white/5 rounded-lg p-3 sm:p-4 border border-white/10"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-white/60 mb-1 sm:mb-2">
                    Lock-in Period
                  </div>
                  <div className="text-white font-medium">{months} Months</div>
                </motion.div>
              </div>

              {/* Mobile-Optimized Action Buttons */}
              <div className="space-y-3 sm:space-y-4 pt-2 sm:pt-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={handleConfirm}
                    disabled={isProcessing}
                    className="w-full h-12 sm:h-14 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-none shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 rounded-lg text-sm sm:text-base"
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center gap-2 sm:gap-3">
                        <motion.div
                          className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                        <span>Processing Investment</span>
                      </div>
                    ) : (
                      <motion.div
                        className="flex items-center justify-center gap-2"
                        animate={mobileFloatingAnimation}
                      >
                        <span>Confirm Investment</span>
                        <LuArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                      </motion.div>
                    )}
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={() => setShowConfirmation(false)}
                    variant="ghost"
                    className="w-full h-10 sm:h-12 text-white/60 hover:text-white hover:bg-white/5 text-sm sm:text-base rounded-lg"
                  >
                    Cancel
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.section>
  );
};

export default OpportunityCostCard;

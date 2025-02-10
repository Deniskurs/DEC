import React from "react";
import { motion } from "framer-motion";
import { LuClock } from "react-icons/lu";

interface TermsStatusProps {
  timeSpent: number;
  daysRemaining?: number;
  expiryDate?: string;
  showValidity?: boolean;
}

export const TermsStatus: React.FC<TermsStatusProps> = ({
  timeSpent,
  daysRemaining,
  expiryDate,
  showValidity = false,
}) => {
  const formatExpiryDate = (date: string) => {
    return new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2 text-cream-50/60">
        <LuClock className="w-4 h-4" />
        <span className="text-sm">{timeSpent}s</span>
      </div>

      {showValidity && daysRemaining !== undefined && expiryDate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-cream-50/60"
        >
          <span className="text-sm">
            {daysRemaining > 0
              ? `Valid for ${daysRemaining} more days`
              : "Terms acceptance expired"}
          </span>
          <span className="text-xs opacity-75">
            (Expires: {formatExpiryDate(expiryDate)})
          </span>
        </motion.div>
      )}
    </div>
  );
};

export default TermsStatus;

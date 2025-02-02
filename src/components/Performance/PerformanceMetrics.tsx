// src/components/PerformanceMetrics.tsx
import React from "react";
import { motion } from "framer-motion";
import {
  LuChartNoAxesCombined,
  LuShield,
  LuTrendingUp,
  LuRefreshCw,
} from "react-icons/lu";
import { useAccountData } from "../../hooks/useAccountData";

interface MetricCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  description: string;
  additionalInfo: string;
  index: number;
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  value,
  label,
  description,
  additionalInfo,
  index,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="relative isolate group"
  >
    <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-rich-blue-100/20 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-br from-rich-blue-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="text-rich-blue-600/80">{icon}</div>
          <div className="text-3xl font-bold text-rich-blue-900">{value}</div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-rich-blue-800">{label}</h3>
          <p className="text-sm text-rich-blue-600">{description}</p>
          <p className="text-xs text-rich-blue-500/80 pt-2 border-t border-rich-blue-100/20">
            {additionalInfo}
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

const fallbackMetrics = [
  {
    icon: <LuChartNoAxesCombined className="w-6 h-6" />,
    value: "27.5%",
    label: "Total Return",
    description: "Historical Performance",
    additionalInfo: "Based on last reported period",
  },
  {
    icon: <LuTrendingUp className="w-6 h-6" />,
    value: "78.3%",
    label: "Strategic Success Rate",
    description: "Position Execution Efficiency",
    additionalInfo: "Historical average",
  },
  {
    icon: <LuShield className="w-6 h-6" />,
    value: "1.95",
    label: "Risk-Adjusted Return",
    description: "Sharpe Ratio",
    additionalInfo: "Based on historical volatility",
  },
];

const PerformanceMetrics: React.FC = () => {
  // Note: This is a public variable. You can safely use it here to know which account to query.
  // const accountId = import.meta.env.VITE_MYFXBOOK_ACCOUNT_ID;
  const { accountQuery } = useAccountData();
  const {
    isLoading,
    data: accountData,
    isError,
    refetch,
    error,
  } = accountQuery;

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="animate-pulse bg-rich-blue-50/50 rounded-2xl h-48"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 bg-red-50 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-red-800">
              Error Loading Performance Data
            </h3>
            <p className="text-sm text-red-600 mt-2">{error.message}</p>
          </div>
          <button
            onClick={() => refetch()}
            className="flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-lg text-red-700 transition-colors"
          >
            <LuRefreshCw className="w-4 h-4" />
            Retry
          </button>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-white/50 rounded-lg">
            <p className="text-xs font-mono text-red-600 whitespace-pre-wrap">
              {JSON.stringify(error, null, 2)}
            </p>
          </div>
        )}

        <div className="mt-4 text-sm text-red-600">
          <p>Debug Information:</p>
          <ul className="list-disc pl-5 mt-2">
            {/* <li>Account ID: {accountId || "Not set"}</li> */}
            <li>API Status: Check console for detailed logs</li>
          </ul>
        </div>
      </div>
    );
  }

  const metrics = accountData
    ? [
        {
          icon: <LuChartNoAxesCombined className="w-6 h-6" />,
          value: accountData.gain ? `${accountData.gain.toFixed(2)}%` : "0%",
          label: "Total Return",
          description: "Absolute Performance",
          additionalInfo: "Net of all fees and costs",
        },
        {
          icon: <LuTrendingUp className="w-6 h-6" />,
          value: accountData.successRate
            ? `${accountData.successRate.toFixed(1)}%`
            : "0%",
          label: "Strategic Success Rate",
          description: "Position Execution Efficiency",
          additionalInfo: "Calculated across all market conditions",
        },
        // {
        //   icon: <LuShield className="w-6 h-6" />,
        //   value: accountData.sharpeRatio
        //     ? accountData.sharpeRatio.toFixed(2)
        //     : "0",
        //   label: "Risk-Adjusted Return",
        //   description: "Sharpe Ratio",
        //   additionalInfo: "Based on historical volatility",
        // },
      ]
    : fallbackMetrics;

  return (
    <div className="relative isolate">
      <div className="grid md:grid-cols-3 gap-8">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} index={index} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-rich-blue-500/80">
          Past performance is not indicative of future results. All investments
          involve risk and may lose value. Investment objectives, risks,
          charges, and expenses should be carefully considered before investing.
        </p>
      </div>
    </div>
  );
};

export default PerformanceMetrics;

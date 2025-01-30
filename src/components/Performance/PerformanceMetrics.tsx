import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LuTrendingUp, LuTrendingDown, LuMinus } from "react-icons/lu";
import { PerformanceMetric } from "./types";

const PerformanceMetrics: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        const response = await fetch(
          "https://query1.finance.yahoo.com/v8/finance/chart/SPY?range=1mo&interval=1d"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        if (!data.chart?.result?.[0]?.indicators?.quote?.[0]?.close) {
          throw new Error("Invalid data format received");
        }

        const closePrices = data.chart.result[0].indicators.quote[0].close;
        const firstPrice = closePrices[0];
        const lastPrice = closePrices[closePrices.length - 1];
        const sp500Change = ((lastPrice - firstPrice) / firstPrice) * 100;

        const deltaEdgeMonthly = 1.76; // Our monthly return
        const winRate = 88;
        const maxDrawdown = 0.66;

        setMetrics([
          {
            label: "Monthly Return",
            value: `${deltaEdgeMonthly.toFixed(2)}%`,
            description: "vs S&P 500",
            change: `+${(deltaEdgeMonthly - sp500Change).toFixed(2)}%`,
            trend: "up",
          },
          {
            label: "Win Rate",
            value: `${winRate}%`,
            description: "Trade Success Rate",
            trend: "neutral",
          },
          {
            label: "Max Drawdown",
            value: `${maxDrawdown}%`,
            description: "Capital Protection",
            change: `${sp500Change > 0 ? "+" : ""}${sp500Change.toFixed(2)}%`,
            trend: sp500Change > 0 ? "up" : "down",
          },
        ]);
        setError(null);
      } catch (error) {
        console.error("Error fetching market data:", error);
        setError("Unable to fetch live market data. Using default metrics.");
        setMetrics([
          {
            label: "Monthly Return",
            value: "1.76%",
            description: "Consistent Growth",
            trend: "up",
          },
          {
            label: "Win Rate",
            value: "88%",
            description: "Trade Success Rate",
            trend: "neutral",
          },
          {
            label: "Max Drawdown",
            value: "0.66%",
            description: "Capital Protection",
            trend: "down",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPerformanceData();
  }, []);

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="animate-pulse bg-rich-blue-50 rounded-2xl h-40"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {error && (
        <div className="absolute top-4 right-4 z-10 bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}
      {metrics.map((metric, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="soft-ui-card p-8 rounded-2xl text-center transition-all duration-300 hover:translate-y-[-4px]"
        >
          <div className="text-3xl font-bold text-rich-blue-800 mb-2">
            {metric.value}
            {metric.trend && (
              <span className="ml-2">
                {metric.trend === "up" && (
                  <LuTrendingUp className="inline h-6 w-6 text-green-500" />
                )}
                {metric.trend === "down" && (
                  <LuTrendingDown className="inline h-6 w-6 text-red-500" />
                )}
                {metric.trend === "neutral" && (
                  <LuMinus className="inline h-6 w-6 text-rich-blue-400" />
                )}
              </span>
            )}
          </div>
          <div className="text-lg font-semibold text-rich-blue-700 mb-1">
            {metric.label}
          </div>
          <div className="text-sm text-rich-blue-600">
            {metric.description}
            {metric.change && (
              <span
                className={`ml-2 font-medium ${
                  metric.trend === "up" ? "text-green-500" : "text-red-500"
                }`}
              >
                {metric.change}
              </span>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PerformanceMetrics;

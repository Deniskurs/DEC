import React, { useEffect, useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { motion } from "framer-motion";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useAccountData } from "../../hooks/useAccountData";
import { getChartOptions, DATASET_STYLES } from "./chartConfig";
import { LuMessageCircleReply } from "react-icons/lu";
import { useDeadStrats } from "../../hooks/useDeadStrats";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Define component interfaces
interface ChartDataPoint {
  date: string;
  deltaEdge: number;
  sp500: number | null;
  gold: number | null;
  msciWorld: number | null;
}

interface ProcessedDataset {
  labels: string[];
  datasets: {
    label: string;
    data: (number | null)[];
    borderColor: string;
    backgroundColor: string;
    borderDash?: number[];
    order: number;
    borderWidth: number;
  }[];
}

const PerformanceGraph: React.FC = () => {
  // Component state
  const isMobile = useMediaQuery("(max-width: 768px)");
  const chartRef = useRef<any>(null);
  const [chartData, setChartData] = useState<ProcessedDataset | null>(null);
  const [options, setOptions] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  // Fetch account data
  const { equityQuery } = useAccountData();
  const {
    data: equityData,
    isLoading: equityDataLoading,
    isError: isErrorProcessing,
  } = equityQuery;

  const { useDeadMarketDataQuery } = useDeadStrats();
  const {
    data: deadStrats,
    isLoading: loadingDeadStrats,
    isError: isErrorDeadStrats,
  } = useDeadMarketDataQuery(
    ["SPY", "GLD", "URTH"],
    equityData?.[0]?.date ?? "",
    equityData?.[equityData.length - 1]?.date ?? ""
  );

  // Process and update chart data
  useEffect(() => {
    if (equityData && deadStrats) {
      const [sp500Data, goldData, msciWorldData] = deadStrats;
      try {
        // Map and process the data points
        const processedData: ChartDataPoint[] = equityData.map((point) => ({
          date: point.date,
          deltaEdge: Number(point.percentageGain.toFixed(2)),
          sp500: sp500Data?.find((d) => d.date === point.date)?.value ?? null,
          gold: goldData?.find((d) => d.date === point.date)?.value ?? null,
          msciWorld:
            msciWorldData?.find((d) => d.date === point.date)?.value ?? null,
        }));
        // Prepare chart data structure
        const data: ProcessedDataset = {
          labels: processedData.map((d) => d.date),
          datasets: [
            {
              ...DATASET_STYLES.deltaEdge,
              data: processedData.map((d) => d.deltaEdge),
            },
            {
              ...DATASET_STYLES.msciWorld,
              data: processedData.map((d) => d.msciWorld),
            },
            {
              ...DATASET_STYLES.sp500,
              data: processedData.map((d) => d.sp500),
            },
            {
              ...DATASET_STYLES.gold,
              data: processedData.map((d) => d.gold),
            },
          ],
        };

        // Calculate min and max values across all datasets
        const allValues = processedData.flatMap((d) =>
          [d.deltaEdge, d.sp500, d.gold, d.msciWorld].filter(
            (v): v is number => v !== null
          )
        );

        const maxValue = Math.max(...allValues);
        const minValue = Math.min(...allValues);

        // Update chart data and options
        setChartData(data);
        setOptions(getChartOptions(isMobile, maxValue, minValue));
        setError(null);
      } catch (err) {
        console.error("Error processing chart data:", err);
        setError("Failed to process chart data");
      }
    }
  }, [equityData, isMobile, deadStrats]);
  // Combined loading state
  const isLoading = equityDataLoading || loadingDeadStrats;

  // Render loading state
  if (isLoading) {
    return (
      <div className="relative h-[450px] w-full">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <svg className="w-16 h-16" viewBox="0 0 100 100">
              <circle
                className="text-rich-blue-100"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                cx="50"
                cy="50"
                r="40"
              />
              <motion.circle
                className="text-rich-blue-600"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                cx="50"
                cy="50"
                r="40"
                strokeDasharray="0, 251.2"
                animate={{
                  strokeDasharray: ["251.2 0", "0 251.2"],
                  rotate: 360,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // Error handling component
  const ErrorDisplay: React.FC<{ error: string }> = ({ error }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute inset-0 flex items-center justify-center z-20"
    >
      <div className="max-w-md p-6 rounded-2xl bg-white/95 backdrop-blur-xl shadow-2xl border border-rich-blue-100/30">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 mb-4 rounded-full bg-rich-blue-50 flex items-center justify-center">
            <LuMessageCircleReply className="w-6 h-6 text-rich-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Performance Data Unavailable
          </h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    </motion.div>
  );
  // Main render
  return (
    <div className="relative w-full">
      <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/80 to-[#F8F7F3] backdrop-blur-xl shadow-2xl border border-rich-blue-100/20">
        {/* Background effects */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(27,54,93,0.03),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(148,107,56,0.03),transparent_70%)]" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(27,54,93,0.03)] to-transparent"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        {/* Legend */}
        <div className="relative z-10 flex flex-wrap items-center gap-6 mb-8">
          {chartData &&
            chartData.datasets.map((dataset, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="relative">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: dataset.borderColor }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      backgroundColor: dataset.borderColor,
                      filter: "blur(6px)",
                      opacity: 0.3,
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-800">
                  {dataset.label}
                </span>
              </motion.div>
            ))}
        </div>

        {/* Chart */}
        <div className="relative h-[450px]">
          {chartData && options && (
            <Line ref={chartRef} options={options} data={chartData} />
          )}
        </div>

        {/* Error overlay */}
        {(error || isErrorProcessing || isErrorDeadStrats) && (
          <ErrorDisplay error={error || "Unknown error"} />
        )}
      </div>
    </div>
  );
};

export default PerformanceGraph;

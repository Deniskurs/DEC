import React, { useEffect, useState, useRef, useCallback } from "react";
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
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useAccountData } from "../../hooks/useAccountData";
import { getChartOptions, DATASET_STYLES } from "./chartConfig";
import {
  LuMessageCircleReply,
  LuZoomIn,
  LuArrowUpRight,
  LuArrowDownRight,
  LuMaximize,
} from "react-icons/lu";
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

interface DatasetInfo {
  label: string;
  data: (number | null)[];
  borderColor: string;
  backgroundColor: string | Function;
  borderDash?: number[];
  order: number;
  borderWidth: number;
  [key: string]: any;
}

interface ProcessedDataset {
  labels: string[];
  datasets: DatasetInfo[];
}

// Date range options
type DateRangeOption = "1M" | "3M" | "6M" | "1Y" | "ALL";

// Helper function to modify color opacity
const modifyColor = (color: string, opacity: number): string => {
  // Handle hex colors
  if (color.startsWith("#")) {
    // Convert hex to rgb
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  // Handle rgb or rgba colors
  if (color.startsWith("rgb")) {
    // If it's already rgba, replace the opacity value
    if (color.startsWith("rgba")) {
      return color.replace(/[\d.]+\)$/, `${opacity})`);
    }
    // Convert rgb to rgba
    return color.replace("rgb", "rgba").replace(")", `, ${opacity})`);
  }

  // Return the original color if format is not recognized
  return color;
};

const PerformanceGraph: React.FC = () => {
  // Media queries for responsive design
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
  const isSmallMobile = useMediaQuery("(max-width: 380px)");

  // Component state
  const chartRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [chartData, setChartData] = useState<ProcessedDataset | null>(null);
  const [fullChartData, setFullChartData] = useState<ProcessedDataset | null>(
    null
  );
  const [options, setOptions] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeDatasetIndex, setActiveDatasetIndex] = useState<number | null>(
    0
  ); // Default to Delta Edge
  const [dateRange, setDateRange] = useState<DateRangeOption>("ALL");
  const [showInsights, setShowInsights] = useState<boolean>(false);
  const [insights, setInsights] = useState<{
    deltaEdge: { value: number; trend: string };
    vsMarket: { value: number; trend: string };
    volatility: { value: number; status: string };
  } | null>(null);

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

  // Generate insights from chart data
  const generateInsights = useCallback((processedData: ChartDataPoint[]) => {
    // Return if no data
    if (!processedData.length) return null;

    // Calculate latest delta edge performance
    const latestPoint = processedData[processedData.length - 1];
    const previousPoint =
      processedData[processedData.length - 2] || processedData[0];

    // Calculate Delta Edge performance
    const deltaEdgeValue = Number(latestPoint.deltaEdge.toFixed(2));
    const deltaEdgeTrend =
      latestPoint.deltaEdge > previousPoint.deltaEdge ? "up" : "down";

    // Calculate performance vs S&P 500
    const vsMarketValue =
      latestPoint.sp500 !== null
        ? Number((latestPoint.deltaEdge - latestPoint.sp500).toFixed(2))
        : 0;
    const vsMarketTrend = vsMarketValue > 0 ? "up" : "down";

    // Calculate volatility score (simple standard deviation of last 20 points)
    const recentPoints = processedData.slice(-20).map((p) => p.deltaEdge);
    const avg =
      recentPoints.reduce((sum, val) => sum + val, 0) / recentPoints.length;
    const squaredDiffs = recentPoints.map((val) => Math.pow(val - avg, 2));
    const avgSquaredDiff =
      squaredDiffs.reduce((sum, val) => sum + val, 0) / squaredDiffs.length;
    const volatilityValue = Number(Math.sqrt(avgSquaredDiff).toFixed(2));
    const volatilityStatus =
      volatilityValue < 2 ? "low" : volatilityValue < 5 ? "moderate" : "high";

    return {
      deltaEdge: { value: deltaEdgeValue, trend: deltaEdgeTrend },
      vsMarket: { value: vsMarketValue, trend: vsMarketTrend },
      volatility: { value: volatilityValue, status: volatilityStatus },
    };
  }, []);

  // Filter data based on date range
  const filterDataByDateRange = useCallback(
    (fullData: ProcessedDataset, range: DateRangeOption): ProcessedDataset => {
      if (range === "ALL") return fullData;

      const labels = fullData.labels;
      const lastDate = new Date(labels[labels.length - 1]);

      let cutoffDate: Date;
      switch (range) {
        case "1M":
          cutoffDate = new Date(lastDate);
          cutoffDate.setMonth(lastDate.getMonth() - 1);
          break;
        case "3M":
          cutoffDate = new Date(lastDate);
          cutoffDate.setMonth(lastDate.getMonth() - 3);
          break;
        case "6M":
          cutoffDate = new Date(lastDate);
          cutoffDate.setMonth(lastDate.getMonth() - 6);
          break;
        case "1Y":
          cutoffDate = new Date(lastDate);
          cutoffDate.setFullYear(lastDate.getFullYear() - 1);
          break;
        default:
          return fullData;
      }

      const cutoffDateStr = cutoffDate.toISOString().split("T")[0];
      const startIndex = Math.max(
        0,
        labels.findIndex((date) => new Date(date) >= cutoffDate)
      );

      if (startIndex === 0) return fullData;

      const filteredLabels = labels.slice(startIndex);
      const filteredDatasets = fullData.datasets.map((dataset) => ({
        ...dataset,
        data: dataset.data.slice(startIndex),
      }));

      return {
        labels: filteredLabels,
        datasets: filteredDatasets,
      };
    },
    []
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

        // Generate insights
        const newInsights = generateInsights(processedData);
        setInsights(newInsights);

        // Prepare chart data structure
        const data: ProcessedDataset = {
          labels: processedData.map((d) => d.date),
          datasets: [
            {
              ...DATASET_STYLES.deltaEdge,
              data: processedData.map((d) => d.deltaEdge),
              // Add transition property for smoother highlighting
              transition: "all 0.3s ease",
            },
            {
              ...DATASET_STYLES.msciWorld,
              data: processedData.map((d) => d.msciWorld),
              transition: "all 0.3s ease",
            },
            {
              ...DATASET_STYLES.sp500,
              data: processedData.map((d) => d.sp500),
              transition: "all 0.3s ease",
            },
            {
              ...DATASET_STYLES.gold,
              data: processedData.map((d) => d.gold),
              transition: "all 0.3s ease",
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

        // Store full data for date range filtering
        setFullChartData(data);

        // Apply date range filter
        const filteredData = filterDataByDateRange(data, dateRange);

        // Update chart data and options
        setChartData(filteredData);
        setOptions(
          getChartOptions(
            isMobile,
            maxValue,
            minValue,
            activeDatasetIndex,
            isTablet
          )
        );
        setError(null);
      } catch (err) {
        console.error("Error processing chart data:", err);
        setError("Failed to process chart data");
      }
    }
  }, [
    equityData,
    isMobile,
    isTablet,
    deadStrats,
    activeDatasetIndex,
    dateRange,
    filterDataByDateRange,
    generateInsights,
  ]);

  // Simplified toggle for dataset visibility
  const toggleDatasetVisibility = (index: number) => {
    // Simple toggle - just highlight the selected dataset
    setActiveDatasetIndex((prev) => (prev === index ? null : index));
  };

  // Handle date range change
  const handleDateRangeChange = (range: DateRangeOption) => {
    setDateRange(range);
    if (fullChartData) {
      const filteredData = filterDataByDateRange(fullChartData, range);
      setChartData(filteredData);
    }
  };

  // Combined loading state
  const isLoading = equityDataLoading || loadingDeadStrats;

  // Enhanced loading state
  if (isLoading) {
    return (
      <div className="relative h-[450px] w-full">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/90 to-[#F8F7F3]/90 backdrop-blur-sm rounded-3xl">
          <div className="relative flex flex-col items-center">
            <svg className="w-16 h-16 mb-4" viewBox="0 0 100 100">
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
            <motion.p
              className="text-rich-blue-600 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Loading performance data...
            </motion.p>
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
    <div className="relative w-full" ref={containerRef}>
      <div className="relative p-6 sm:p-8 rounded-3xl bg-cream-50 shadow-lg border border-rich-blue-100/10">
        {/* Subtle background accent */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          {/* Top gloss effect */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-rich-blue-400/10 to-transparent" />
        </div>

        {/* Premium Date range selector with animation cues */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="relative flex items-center flex-wrap gap-1.5 bg-gradient-to-r from-white/80 to-white/60 p-1 rounded-lg shadow-sm border border-rich-blue-100/20 overflow-hidden group">
            {/* Initial attention-getting animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-rich-blue-100/0 via-rich-blue-100/20 to-rich-blue-100/0"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: "100%", opacity: 1 }}
              transition={{
                duration: 1.5,
                delay: 1,
                ease: "easeInOut",
                repeatDelay: 8,
                repeat: 2,
              }}
            />

            {/* Subtle hover effect for the entire container */}
            <motion.div className="absolute inset-0 bg-rich-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {["1M", "3M", "6M", "1Y", "ALL"].map((range, i) => (
              <motion.button
                key={range}
                onClick={() => handleDateRangeChange(range as DateRangeOption)}
                className={`relative px-3 py-1.5 text-xs sm:text-sm rounded-md font-medium transition-all ${
                  dateRange === range
                    ? "bg-gradient-to-br from-rich-blue-600 to-rich-blue-700 text-white shadow-sm"
                    : "text-rich-blue-700 hover:bg-white hover:shadow-sm"
                }`}
                whileHover={{
                  y: -1,
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                  transition: { duration: 0.2 },
                }}
                whileTap={{ y: 1, boxShadow: "0 0px 0px rgba(0, 0, 0, 0)" }}
              >
                {/* Subtle "pulse" animation on the initial load */}
                {!isMobile && dateRange === range && (
                  <motion.div
                    className="absolute -inset-0.5 rounded-md bg-rich-blue-400/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: [0, 0.5, 0],
                      scale: [0.8, 1.1, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      delay: 0.6 + i * 0.1,
                      repeat: 1,
                      repeatDelay: 7,
                    }}
                  />
                )}
                {range}
              </motion.button>
            ))}
          </div>

          {/* Premium Insights Button - Optimized for all devices */}
          <div className={`${isMobile ? "flex-shrink-0 ml-auto" : ""}`}>
            <button
              onClick={() => setShowInsights(!showInsights)}
              aria-label={showInsights ? "Hide Insights" : "Show Insights"}
              className={`
                relative overflow-hidden whitespace-nowrap
                ${
                  isMobile
                    ? "py-2 px-2.5 rounded-lg min-w-[40px] shadow-sm"
                    : "py-2.5 px-4 rounded-lg min-w-[140px] shadow-md"
                }
                ${
                  showInsights
                    ? "bg-rich-blue-600 text-white border border-rich-blue-500 ring-2 ring-rich-blue-200/20"
                    : "bg-white text-rich-blue-600 border border-rich-blue-100 ring-1 ring-rich-blue-100/10 hover:ring-2 hover:ring-rich-blue-100/20"
                }
                transition-all duration-200 ease-in-out
                transform hover:-translate-y-0.5 active:translate-y-0 active:scale-98
                flex items-center justify-center gap-2
              `}
            >
              {/* Attention-grabbing subtle animation */}
              {!showInsights && (
                <div className="absolute inset-0 overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-rich-blue-100/30 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                      duration: 1.8,
                      repeat: 2,
                      repeatDelay: 3,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                  />
                </div>
              )}

              {/* Icon with state transition */}
              <div className="relative flex-shrink-0">
                {/* Main icon - Analytics or Close */}
                <motion.div
                  animate={{
                    rotate: showInsights ? 90 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  {showInsights ? (
                    /* Close icon when insights are showing */
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 18L18 6M6 6L18 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    /* Insights icon when insights are hidden */
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M8 13L11 10L14 13L17 10"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 17H16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </motion.div>

                {/* Attention-grabbing pulse */}
                {!showInsights && (
                  <motion.div
                    className="absolute inset-0 rounded-full ring-4 ring-rich-blue-500/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: [0, 0.7, 0],
                      scale: [0.8, 1.4, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      repeat: 3,
                      repeatDelay: 3,
                    }}
                  />
                )}
              </div>

              {/* Label - Hidden on mobile */}
              {(!isMobile || (isMobile && showInsights)) && (
                <span
                  className={`
                  font-medium text-sm whitespace-nowrap
                  ${isMobile ? "text-xs" : "text-sm"}
                `}
                >
                  {showInsights ? "Hide Insights" : "Show Insights"}
                </span>
              )}

              {/* Indicator dot for new content */}
              {!showInsights && !isMobile && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rich-blue-500"></span>
              )}
            </button>
          </div>
        </div>

        {/* Enhanced Premium Insights Panel */}
        <AnimatePresence>
          {showInsights && insights && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative z-10 mb-8 overflow-hidden"
            >
              <div className="bg-gradient-to-br from-rich-blue-900/95 to-rich-blue-800/95 backdrop-blur-md p-5 rounded-xl border border-rich-blue-700/30 shadow-lg">
                {/* Premium glass effect overlays */}
                <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                  {/* Top highlight */}
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />

                  {/* Glass shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />

                  {/* Subtle grid pattern */}
                  <div
                    className="absolute inset-0 opacity-5"
                    style={{
                      backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
                      backgroundSize: "20px 20px",
                    }}
                  />
                </div>

                {/* Insights Header */}
                <div className="flex items-center justify-between mb-4 relative">
                  <h3 className="text-white/90 font-medium text-sm flex items-center">
                    <span className="w-1 h-4 bg-blue-500 rounded-full mr-2 inline-block"></span>
                    Performance Analysis
                  </h3>
                  <div className="text-white/60 text-xs">
                    {new Date().toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>

                {/* Main Metrics in Elegant Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Delta Edge Performance - Premium Card */}
                  <div className="relative group">
                    {/* Card Background with Glass Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-blue-700/10 rounded-lg" />
                    <div className="absolute inset-0 border border-blue-500/20 rounded-lg" />

                    {/* Card Content */}
                    <div className="relative p-3 rounded-lg">
                      {/* Top indicator */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          <span className="text-blue-300 text-xs font-medium uppercase tracking-wider">
                            Delta Edge
                          </span>
                        </div>
                        <motion.div
                          className={`flex items-center justify-center h-6 w-6 rounded-full ${
                            insights.deltaEdge.trend === "up"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                          whileHover={{ scale: 1.1 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 10,
                          }}
                        >
                          {insights.deltaEdge.trend === "up" ? (
                            <LuArrowUpRight className="w-3.5 h-3.5" />
                          ) : (
                            <LuArrowDownRight className="w-3.5 h-3.5" />
                          )}
                        </motion.div>
                      </div>

                      {/* Value with premium styling */}
                      <div className="flex items-baseline">
                        <span className="text-white text-2xl font-bold">
                          {insights.deltaEdge.value}
                        </span>
                        <span className="text-white/70 ml-1 text-lg">%</span>
                      </div>

                      {/* Premium label */}
                      <div className="text-blue-300/80 text-xs mt-1">
                        Current Return
                      </div>

                      {/* Bottom accent line */}
                      <div
                        className={`absolute bottom-0 left-0 h-1 rounded-b-lg ${
                          insights.deltaEdge.trend === "up"
                            ? "bg-blue-500/50"
                            : "bg-red-500/50"
                        }`}
                        style={{ width: "30%" }}
                      ></div>
                    </div>
                  </div>

                  {/* Performance vs Market - Premium Card */}
                  <div className="relative group">
                    {/* Card Background with Glass Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-emerald-700/10 rounded-lg" />
                    <div className="absolute inset-0 border border-emerald-500/20 rounded-lg" />

                    {/* Card Content */}
                    <div className="relative p-3 rounded-lg">
                      {/* Top indicator */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                          <span className="text-emerald-300 text-xs font-medium uppercase tracking-wider">
                            vs S&P 500
                          </span>
                        </div>
                        <motion.div
                          className={`flex items-center justify-center h-6 w-6 rounded-full ${
                            insights.vsMarket.trend === "up"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                          whileHover={{ scale: 1.1 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 10,
                          }}
                        >
                          {insights.vsMarket.trend === "up" ? (
                            <LuMaximize className="w-3.5 h-3.5" />
                          ) : (
                            <LuMaximize className="w-3.5 h-3.5 rotate-180" />
                          )}
                        </motion.div>
                      </div>

                      {/* Value with premium styling */}
                      <div className="flex items-baseline">
                        <span className="text-white text-2xl font-bold">
                          {insights.vsMarket.value > 0 ? "+" : ""}
                          {insights.vsMarket.value}
                        </span>
                        <span className="text-white/70 ml-1 text-lg">%</span>
                      </div>

                      {/* Premium label */}
                      <div className="text-emerald-300/80 text-xs mt-1">
                        Market Outperformance
                      </div>

                      {/* Bottom accent line */}
                      <div
                        className={`absolute bottom-0 left-0 h-1 rounded-b-lg ${
                          insights.vsMarket.trend === "up"
                            ? "bg-emerald-500/50"
                            : "bg-red-500/50"
                        }`}
                        style={{ width: "30%" }}
                      ></div>
                    </div>
                  </div>

                  {/* Volatility - Premium Card */}
                  <div className="relative group">
                    {/* Card Background with Glass Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 to-amber-700/10 rounded-lg" />
                    <div className="absolute inset-0 border border-amber-500/20 rounded-lg" />

                    {/* Card Content */}
                    <div className="relative p-3 rounded-lg">
                      {/* Top indicator */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                          <span className="text-amber-300 text-xs font-medium uppercase tracking-wider">
                            Volatility
                          </span>
                        </div>
                        <motion.div
                          className={`flex items-center justify-center h-6 w-6 rounded-full ${
                            insights.volatility.status === "low"
                              ? "bg-green-500/20 text-green-400"
                              : insights.volatility.status === "moderate"
                              ? "bg-amber-500/20 text-amber-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                          whileHover={{ scale: 1.1 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 10,
                          }}
                        >
                          <LuZoomIn className="w-3.5 h-3.5" />
                        </motion.div>
                      </div>

                      {/* Value with premium styling - showing status and value */}
                      <div className="flex items-baseline">
                        <span className="text-white text-2xl font-bold capitalize">
                          {insights.volatility.status}
                        </span>
                        <span className="text-white/70 ml-2 text-sm">
                          ({insights.volatility.value})
                        </span>
                      </div>

                      {/* Premium description */}
                      <div className="text-amber-300/80 text-xs mt-1">
                        Risk Assessment
                      </div>

                      {/* Bottom accent line */}
                      <div
                        className={`absolute bottom-0 left-0 h-1 rounded-b-lg ${
                          insights.volatility.status === "low"
                            ? "bg-green-500/50"
                            : insights.volatility.status === "moderate"
                            ? "bg-amber-500/50"
                            : "bg-red-500/50"
                        }`}
                        style={{ width: "30%" }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Premium decorative elements */}
                <div className="absolute top-3 right-3 w-12 h-12 border-t border-r border-blue-400/20 rounded-tr-lg"></div>
                <div className="absolute bottom-3 left-3 w-12 h-12 border-b border-l border-blue-400/20 rounded-bl-lg"></div>
                <motion.div
                  className="absolute top-1/2 right-8 w-1 h-8 bg-blue-400/10"
                  animate={{ height: [8, 16, 8] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
                <motion.div
                  className="absolute top-1/3 left-12 w-1 h-4 bg-blue-400/10"
                  animate={{ height: [4, 8, 4] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* World-class Interactive Legend with premium interactivity */}
        <div className="relative z-10 mb-8">
          {/* Elegant container with neomorphic effect */}
          <div
            className={`relative z-10 flex flex-wrap items-center justify-center ${
              isMobile
                ? "gap-1.5 overflow-x-auto py-3 px-2"
                : "gap-3 sm:gap-4 py-4 px-4"
            } bg-gradient-to-br from-white to-cream-50 rounded-xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-rich-blue-50/20 overflow-hidden`}
          >
            {/* Interactive spotlight effect that follows mouse movement - desktop only */}
            {!isMobile && (
              <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                <motion.div
                  className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-blue-400/5 blur-2xl"
                  animate={{
                    left: ["-5%", "105%", "-5%"],
                    top: ["10%", "50%", "80%", "20%", "10%"],
                  }}
                  transition={{
                    duration: 18,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                />
              </div>
            )}

            {/* Floating cursor guide - simplified to prevent issues */}
            {!isMobile && (
              <motion.div
                className="absolute top-1/4 right-1/4 pointer-events-none z-20"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.9, 0],
                }}
                transition={{
                  duration: 2.5,
                  delay: 1.5,
                  times: [0, 0.3, 1],
                }}
              >
                <div className="relative">
                  {/* "Try clicking" text with fade effect - simpler approach */}
                  <motion.div
                    className="px-3 py-1.5 rounded-lg bg-white shadow-md border border-rich-blue-100/30"
                    animate={{ y: [0, -5, 0], x: [0, 5, 0] }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                      repeat: 1,
                      repeatType: "reverse",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      {/* Hand icon */}
                      <svg
                        className="w-3.5 h-3.5 text-rich-blue-600"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M16.5 12V6.5C16.5 5.94772 16.0523 5.5 15.5 5.5C14.9477 5.5 14.5 5.94772 14.5 6.5V12"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M14.5 10.5H11.5V6.5C11.5 5.94772 11.9477 5.5 12.5 5.5C13.0523 5.5 13.5 5.94772 13.5 6.5V7.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M7.5 12V8C7.5 7.44772 7.94772 7 8.5 7C9.05228 7 9.5 7.44772 9.5 8V14.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M9.5 14.5V11C9.5 10.4477 9.94772 10 10.5 10C11.0523 10 11.5 10.4477 11.5 11V14.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M7.5 14.5V14.5C7.5 16.7091 9.29086 18.5 11.5 18.5H12.7576C13.533 18.5 14.2889 18.3297 14.9847 18"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>

                      <span className="text-xs font-medium text-rich-blue-600">
                        Click datasets to focus
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Dataset buttons with world-class interactions */}
            {chartData &&
              chartData.datasets.map((dataset, index) => {
                // Check if this dataset is currently active
                const isActive = activeDatasetIndex === index;

                // Reference to specific dataset color
                const bgColor =
                  typeof dataset.borderColor === "string"
                    ? dataset.borderColor
                    : "#000";

                return (
                  <motion.button
                    key={index}
                    whileHover={{
                      y: -2,
                      scale: 1.03,
                    }}
                    whileTap={{
                      y: 0,
                      scale: 0.98,
                    }}
                    onClick={() => toggleDatasetVisibility(index)}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 400,
                      damping: 15,
                    }}
                    className={`relative flex items-center transition-all duration-300 rounded-xl ${
                      isMobile ? `py-1.5 px-2.5 text-xs` : `py-2.5 px-4 sm:px-5`
                    } ${
                      isActive
                        ? `bg-white shadow-md border border-rich-blue-200 z-10`
                        : "bg-white/40 backdrop-blur-sm hover:bg-white/80 border border-transparent hover:border-rich-blue-100/30 hover:shadow-sm"
                    }`}
                  >
                    {/* Focus attention animation - plays on the button most relevant based on data */}
                    {index === 0 && !isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-xl pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{
                          boxShadow: [
                            "0 0 0 0px rgba(0, 102, 204, 0)",
                            "0 0 0 3px rgba(0, 102, 204, 0.15)",
                            "0 0 0 0px rgba(0, 102, 204, 0)",
                          ],
                        }}
                        transition={{
                          duration: 1.8,
                          delay: 1.5,
                          repeat: 2,
                          repeatDelay: 5,
                        }}
                      />
                    )}

                    {/* Advanced color indicator with elegant effects */}
                    <div className="relative flex items-center justify-center">
                      {/* Main indicator - changing shape based on state */}
                      <motion.div
                        className={`rounded-full ${
                          isMobile ? "w-3 h-3 mr-2" : "w-3.5 h-3.5 mr-2.5"
                        }`}
                        style={{ backgroundColor: bgColor }}
                        animate={{
                          borderRadius: isActive ? "30%" : "50%",
                        }}
                        transition={{ duration: 0.3 }}
                      />

                      {/* Multi-layered effect for active state */}
                      {isActive && (
                        <>
                          {/* Inner glow */}
                          <motion.div
                            className="absolute inset-0 rounded-full z-0"
                            style={{ backgroundColor: bgColor }}
                            animate={{
                              borderRadius: "30%",
                              boxShadow: `0 0 10px 2px ${bgColor}25`,
                            }}
                            transition={{ duration: 0.4 }}
                          />

                          {/* Outer shimmer effect */}
                          <motion.div
                            className="absolute inset-[-4px] rounded-full z-[-1]"
                            style={{
                              border: `1.5px solid ${bgColor}20`,
                              backgroundColor: "transparent",
                            }}
                            animate={{
                              rotate: [0, 180],
                              borderWidth: ["1.5px", "1px", "1.5px"],
                              opacity: [0.7, 0.3, 0.7],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                        </>
                      )}
                    </div>

                    {/* Label with enhanced microinteractions */}
                    <motion.span
                      className={`font-medium ${
                        isMobile ? "text-xs truncate max-w-[85px]" : "text-sm"
                      }`}
                      animate={{
                        color: isActive ? "#111827" : "#4B5563",
                        fontWeight: isActive ? 600 : 500,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {isMobile
                        ? dataset.label
                            .replace(" Returns", "")
                            .replace(" ETF", "")
                            .replace(" Index", "")
                        : dataset.label}
                    </motion.span>

                    {/* Status pill for active state */}
                    <AnimatePresence>
                      {isActive && !isMobile && (
                        <motion.div
                          className="ml-2 px-1.5 py-0.5 text-[10px] rounded-full text-white/90 font-medium tracking-tight"
                          style={{ backgroundColor: bgColor }}
                          initial={{ opacity: 0, scale: 0.5, x: -10 }}
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.5, x: -10 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 25,
                          }}
                        >
                          Active
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
          </div>
        </div>

        {/* Chart with dynamic height based on screen size */}
        <div
          className={`relative ${
            isMobile ? "h-[350px]" : isTablet ? "h-[400px]" : "h-[450px]"
          }`}
        >
          {chartData && options && (
            <Line
              ref={chartRef}
              options={options}
              data={{
                labels: chartData.labels,
                datasets: chartData.datasets.map((dataset, index) => {
                  // Determine if this dataset is active
                  const isActive =
                    activeDatasetIndex === null || activeDatasetIndex === index;

                  // Apply different styling based on device type
                  if (isMobile) {
                    // Mobile-specific styling - more subtle
                    return {
                      ...dataset,
                      // Apply visual emphasis to active dataset and dim others
                      borderColor:
                        typeof dataset.borderColor === "string"
                          ? isActive
                            ? dataset.borderColor // Keep full color for active dataset
                            : modifyColor(dataset.borderColor as string, 0.15) // Nearly hide inactive datasets
                          : dataset.borderColor,
                      // Adjust line width for active dataset (more subtle on mobile)
                      borderWidth: isActive
                        ? (dataset.borderWidth as number) *
                          (activeDatasetIndex === index ? 1.2 : 1) // Less emphasis
                        : (dataset.borderWidth as number) * 0.4, // Very thin lines for inactive datasets
                      // Add hover behavior to inactive datasets
                      hoverBorderWidth: isActive
                        ? (dataset.borderWidth as number) * 1.3
                        : (dataset.borderWidth as number),
                      // No visible points on mobile to reduce clutter
                      pointRadius: 0,
                      pointHoverRadius: isActive ? 3 : 2,
                    };
                  } else {
                    // Desktop styling - more pronounced
                    return {
                      ...dataset,
                      // Apply visual emphasis to active dataset and dim others
                      borderColor:
                        typeof dataset.borderColor === "string"
                          ? isActive
                            ? dataset.borderColor // Keep full color for active dataset
                            : modifyColor(dataset.borderColor as string, 0.25) // Heavily dim inactive datasets
                          : dataset.borderColor,
                      // Adjust line width for active dataset
                      borderWidth: isActive
                        ? (dataset.borderWidth as number) *
                          (activeDatasetIndex === index ? 1.5 : 1) // Emphasize selected dataset
                        : (dataset.borderWidth as number) * 0.6, // Thinner lines for inactive datasets
                      // Add hover behavior to inactive datasets
                      hoverBorderWidth: isActive
                        ? (dataset.borderWidth as number) * 1.8
                        : (dataset.borderWidth as number),
                      // Make points smaller on inactive datasets
                      pointRadius: isActive
                        ? index === activeDatasetIndex
                          ? 3
                          : 0
                        : 0,
                      pointHoverRadius: isActive ? 5 : 3,
                    };
                  }
                }),
              }}
            />
          )}
        </div>

        {/* Error overlay */}
        {(error || isErrorProcessing || isErrorDeadStrats) && (
          <ErrorDisplay error={error || "Unable to load performance data"} />
        )}
      </div>
    </div>
  );
};

export default PerformanceGraph;

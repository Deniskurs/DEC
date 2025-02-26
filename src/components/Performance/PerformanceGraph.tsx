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
  const [activeDataset, setActiveDataset] = useState<number | null>(null);
  const [hiddenDatasets, setHiddenDatasets] = useState<Set<number>>(new Set());
  const [isHovering, setIsHovering] = useState<boolean>(false);
  
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
        
        // Prepare chart data structure with hidden datasets logic
        const data: ProcessedDataset = {
          labels: processedData.map((d) => d.date),
          datasets: [
            {
              ...DATASET_STYLES.deltaEdge,
              data: processedData.map((d) => d.deltaEdge),
              hidden: hiddenDatasets.has(0),
            },
            {
              ...DATASET_STYLES.msciWorld,
              data: processedData.map((d) => d.msciWorld),
              hidden: hiddenDatasets.has(1),
            },
            {
              ...DATASET_STYLES.sp500,
              data: processedData.map((d) => d.sp500),
              hidden: hiddenDatasets.has(2),
            },
            {
              ...DATASET_STYLES.gold,
              data: processedData.map((d) => d.gold),
              hidden: hiddenDatasets.has(3),
            },
          ],
        };

        // Apply highlight effects when a dataset is active
        if (activeDataset !== null && !hiddenDatasets.has(activeDataset)) {
          // Highlight the active dataset
          data.datasets = data.datasets.map((dataset, idx) => {
            if (idx === activeDataset) {
              return {
                ...dataset,
                borderWidth: dataset.borderWidth + 1,
                backgroundColor: dataset.hoverBackgroundColor || dataset.backgroundColor,
                z: 10, // Bring active dataset to front
              };
            } else if (!dataset.hidden) {
              // Dim other visible datasets
              return {
                ...dataset,
                borderColor: `${dataset.borderColor}99`, // Add transparency
                borderWidth: Math.max(dataset.borderWidth - 0.5, 1),
                backgroundColor: 'rgba(0,0,0,0.01)',
                z: 1,
              };
            }
            return dataset;
          });
        }

        // Calculate min and max values across all datasets
        const allValues = processedData.flatMap((d) => {
          const values = [];
          if (!hiddenDatasets.has(0)) values.push(d.deltaEdge);
          if (!hiddenDatasets.has(1) && d.msciWorld !== null) values.push(d.msciWorld);
          if (!hiddenDatasets.has(2) && d.sp500 !== null) values.push(d.sp500);
          if (!hiddenDatasets.has(3) && d.gold !== null) values.push(d.gold);
          return values.filter((v): v is number => v !== null);
        });

        const maxValue = allValues.length ? Math.max(...allValues) : 30;
        const minValue = allValues.length ? Math.min(...allValues) : -10;

        // Update chart data and options
        setChartData(data);
        setOptions(getChartOptions(isMobile, maxValue, minValue, activeDataset));
        setError(null);
      } catch (err) {
        console.error("Error processing chart data:", err);
        setError("Failed to process chart data");
      }
    }
  }, [equityData, isMobile, deadStrats, activeDataset, hiddenDatasets]);
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
  // Chart container onMouseEnter/Leave handlers
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setActiveDataset(null);
  };

  // Main render
  return (
    <div className="relative w-full">
      <div 
        className="relative p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-white shadow-md sm:shadow-lg border border-gray-200"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Responsive Legend */}
        <div className="relative z-10 flex flex-wrap items-center justify-start gap-x-4 gap-y-3 sm:gap-x-6 sm:gap-y-4 pb-4 mb-4 sm:pb-5 sm:mb-6 border-b border-gray-100">
          {chartData &&
            chartData.datasets.map((dataset, index) => {
              const isHidden = hiddenDatasets.has(index);
              const isActive = activeDataset === index;
              
              return (
                <div
                  key={index}
                  onClick={() => {
                    const newHidden = new Set(hiddenDatasets);
                    if (isHidden) {
                      newHidden.delete(index);
                    } else {
                      newHidden.add(index);
                    }
                    setHiddenDatasets(newHidden);
                  }}
                  onMouseEnter={() => setActiveDataset(index)}
                  onMouseLeave={() => setActiveDataset(null)}
                  className={`flex items-center gap-2 sm:gap-3 px-2 py-1.5 rounded-full cursor-pointer transition-colors duration-150 
                    ${isActive ? 'bg-gray-50' : 'hover:bg-gray-50/60'}`}
                >
                  <div className="relative flex-shrink-0">
                    {/* Color dot with simple pulse */}
                    <div
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full"
                      style={{ backgroundColor: dataset.borderColor }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      animate={{
                        opacity: [0.6, 0.2, 0.6],
                        scale: [1, 1.5, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      style={{
                        backgroundColor: dataset.borderColor,
                        filter: "blur(4px)",
                      }}
                    />
                    
                    {/* Simple X when hidden */}
                    {isHidden && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-[2px] h-[8px] sm:h-[10px] bg-gray-500 rotate-45" />
                        <div className="w-[2px] h-[8px] sm:h-[10px] bg-gray-500 -rotate-45" />
                      </div>
                    )}
                  </div>
                  
                  <span className={`text-xs sm:text-sm font-medium whitespace-nowrap ${isHidden ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                    {dataset.label}
                  </span>
                </div>
              );
            })}
        </div>

        {/* Responsive Chart */}
        <div className="relative h-[300px] xs:h-[350px] sm:h-[400px] md:h-[450px] w-full">
          {chartData && options && (
            <Line 
              ref={chartRef} 
              options={options} 
              data={chartData}
              redraw={false}
            />
          )}
        </div>

        {/* Error handling */}
        {(error || isErrorProcessing || isErrorDeadStrats) && (
          <ErrorDisplay error={error || "Unknown error"} />
        )}
      </div>
    </div>
  );
};

export default PerformanceGraph;

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
    ["SPY", "GLD", "URTH"], // Using exact Alpha Vantage symbols
    equityData?.[0]?.date ?? "",
    equityData?.[equityData.length - 1]?.date ?? ""
  );
  
  // Process and update chart data
  useEffect(() => {
    if (equityData && deadStrats) {
      const [sp500Data, goldData, msciWorldData] = deadStrats;
      
      // Validate that we have actual data for all three indices
      if (!sp500Data || !goldData || !msciWorldData) {
        console.error("Missing data for one or more market indices");
        setError("One or more market indices are missing data");
        return;
      }
      
      try {
        // Map and process the data points
        let processedData: ChartDataPoint[] = equityData.map((point) => ({
          date: point.date,
          deltaEdge: Number(point.percentageGain.toFixed(2)),
          sp500: sp500Data?.find((d) => d.date === point.date)?.value ?? null,
          gold: goldData?.find((d) => d.date === point.date)?.value ?? null,
          msciWorld: msciWorldData?.find((d) => d.date === point.date)?.value ?? null,
        }));
        
        // Downsample data for mobile to improve performance
        if (isMobile && processedData.length > 20) {
          const step = Math.ceil(processedData.length / 20);
          processedData = processedData.filter((_, index) => 
            index === 0 || 
            index === processedData.length - 1 || 
            index % step === 0
          );
        }
        
        // Prepare chart data structure
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

        // Apply highlight effects for active dataset
        if (activeDataset !== null && !hiddenDatasets.has(activeDataset)) {
          data.datasets = data.datasets.map((dataset, idx) => {
            if (idx === activeDataset) {
              return {
                ...dataset,
                borderWidth: (dataset.borderWidth || 2) + 1,
                backgroundColor: dataset.backgroundColor,
                z: 10,
              };
            } else if (!dataset.hidden) {
              return {
                ...dataset,
                borderColor: `${dataset.borderColor}80`,
                borderWidth: Math.max((dataset.borderWidth || 2) - 0.5, 1),
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

  // Render loading spinner
  const renderLoading = () => {
    if (!isLoading) return null;
    
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
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
    );
  };

  // Error display component
  const ErrorDisplay: React.FC<{ error: string }> = ({ error }) => {
    let errorMessage = "Our performance visualization is temporarily unavailable.";
    let errorTitle = "Performance Data Temporarily Unavailable";
    
    if (error.includes("Failed to process")) {
      errorMessage = "We're experiencing temporary issues retrieving performance data.";
    } else if (error.includes("Failed to fetch market")) {
      errorTitle = "Market Data Unavailable";
      errorMessage = "We're having trouble retrieving market comparison data. Please try again later.";
    } else if (error.includes("Missing data for one or more")) {
      errorTitle = "Incomplete Market Data";
      errorMessage = "Some market data points could not be retrieved. We're working to fix this issue.";
    } else if (error.includes("API Limit")) {
      errorTitle = "API Limit Reached";
      errorMessage = "We've reached our data provider's rate limit. Please try again in a minute.";
    }
    
    return (
      <div className="flex items-center justify-center h-full w-full">
        <div className="max-w-md p-6 rounded-2xl bg-white shadow-xl border border-rich-blue-100">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 mb-4 rounded-full bg-rich-blue-50 flex items-center justify-center">
              <LuMessageCircleReply className="w-6 h-6 text-rich-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {errorTitle}
            </h3>
            <p className="text-gray-600 mb-4">
              {errorMessage}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-rich-blue-600 text-white rounded-lg hover:bg-rich-blue-700 transition-colors"
              >
                Retry
              </button>
              <a 
                href="/contact" 
                className="px-4 py-2 bg-white text-rich-blue-600 border border-rich-blue-200 rounded-lg hover:bg-rich-blue-50 transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Chart container handlers
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
        {/* Show loading spinner */}
        {renderLoading()}
        
        {/* Legend */}
        {chartData && (
          <div className="relative z-10 flex flex-wrap items-center justify-start gap-x-4 gap-y-3 sm:gap-x-6 sm:gap-y-4 pb-4 mb-4 sm:pb-5 sm:mb-6 border-b border-gray-100">
            {chartData.datasets.map((dataset, index) => {
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
                    <div
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full"
                      style={{ backgroundColor: dataset.borderColor }}
                    />
                    
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
        )}

        {/* Chart or Error Container */}
        <div className="relative h-[300px] xs:h-[350px] sm:h-[400px] md:h-[450px] w-full bg-gray-50/30 rounded-md">
          {/* Error Message Layer */}
          {(error || isErrorProcessing || isErrorDeadStrats) && (
            <div className="absolute inset-0 z-20">
              {error && (
                <ErrorDisplay error={error} />
              )}
              {!error && isErrorProcessing && (
                <ErrorDisplay error="We couldn't retrieve your performance data." />
              )}
              {!error && !isErrorProcessing && isErrorDeadStrats && (
                <ErrorDisplay error={
                  deadStrats instanceof Error && deadStrats.message.includes("API Limit") 
                    ? "API Limit reached. Please try again in a minute." 
                    : "Failed to fetch market comparison data. Please try again later."
                } />
              )}
            </div>
          )}
          
          {/* Chart Layer */}
          {!error && !isErrorProcessing && !isErrorDeadStrats && chartData && options && (
            <Line 
              ref={chartRef} 
              options={options} 
              data={chartData}
              redraw={false}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PerformanceGraph;
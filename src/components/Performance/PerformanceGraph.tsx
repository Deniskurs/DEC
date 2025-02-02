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
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import statementData from "../../data/performance/statement.csv?raw";
import { useAccountData } from "../../hooks/useAccountData";
import { LuMessageCircleReply } from "react-icons/lu";

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

interface Trade {
  openDate: Date;
  gain: number;
}

const parseCSV = (csv: string): Trade[] => {
  const lines = csv.split("\n");
  const headers = lines[0].split(",");

  const openDateIndex = headers.findIndex((h) => h === "Open Date");
  const gainIndex = headers.findIndex((h) => h === "Gain");

  return lines
    .slice(1)
    .filter((line) => line.trim())
    .map((line) => {
      const values = line.split(",");
      return {
        openDate: new Date(values[openDateIndex]),
        gain: parseFloat(values[gainIndex]) || 0,
      };
    })
    .filter((trade) => !isNaN(trade.openDate.getTime()));
};

const addVolatility = (
  baseValue: number,
  dayIndex: number,
  volatilityFactor: number = 1
): number => {
  const shortTerm = Math.sin(dayIndex / 10) * 0.3;
  const mediumTerm = Math.sin(dayIndex / 30) * 0.5;
  const longTerm = Math.sin(dayIndex / 90) * 0.8;

  const totalVolatility =
    (shortTerm + mediumTerm + longTerm) * volatilityFactor;
  return baseValue * (1 + totalVolatility / 100);
};
const PerformanceGraph: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const chartRef = useRef<any>(null);
  const [chartData, setChartData] = useState<any>();
  const [options, setOptions] = useState<any>();
  const [error, setError] = useState<string | null>(null);
  const { equityQuery } = useAccountData();

  const {
    data: equityData,
    isLoading: equityDataLoading,
    isError: isErrorProcessing,
  } = equityQuery;

  useEffect(() => {
    if (equityData) {
      const processedData = equityData.map((point, index) => {
        const dayIndex = index;

        // Calculate percentage gains from 0% base
        const annualSP500Return = 0.09;
        const dailySP500Return = Math.pow(1 + annualSP500Return, 1 / 365) - 1;
        const sp500Value = (Math.pow(1 + dailySP500Return, dayIndex) - 1) * 100;

        const annualHedgeFundReturn = 0.08;
        const dailyHedgeFundReturn =
          Math.pow(1 + annualHedgeFundReturn, 1 / 365) - 1;
        const hedgeFundValue =
          (Math.pow(1 + dailyHedgeFundReturn, dayIndex) - 1) * 100;

        const annualTraditionalReturn = 0.06;
        const dailyTraditionalReturn =
          Math.pow(1 + annualTraditionalReturn, 1 / 365) - 1;
        const traditionalValue =
          (Math.pow(1 + dailyTraditionalReturn, dayIndex) - 1) * 100;

        return {
          date: point.date,
          deltaEdge: equityData
            ? Number(point.percentageGain.toFixed(2))
            : Number(point.value.toFixed(2)),
          sp500: Number(addVolatility(sp500Value, dayIndex, 1.2).toFixed(2)),
          hedgeFund: Number(
            addVolatility(hedgeFundValue, dayIndex, 0.8).toFixed(2)
          ),
          traditional: Number(
            addVolatility(traditionalValue, dayIndex, 0.6).toFixed(2)
          ),
        };
      });

      const data = {
        labels: processedData.map((d) => d.date),
        datasets: [
          {
            label: "Delta Edge Returns",
            data: processedData.map((d) => d.deltaEdge),
            borderColor: "rgb(59, 130, 236)",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            tension: 0.4,
            fill: true,
            order: 1,
            borderWidth: 3,
          },
          {
            label: "Average Hedge Fund",
            data: processedData.map((d) => d.hedgeFund),
            borderColor: "rgba(16, 185, 129, 0.8)",
            backgroundColor: "rgba(16, 185, 129, 0.02)",
            tension: 0.4,
            fill: true,
            borderDash: [8, 4],
            order: 2,
            borderWidth: 2,
          },
          {
            label: "S&P 500",
            data: processedData.map((d) => d.sp500),
            borderColor: "rgba(99, 102, 241, 0.5)",
            backgroundColor: "rgba(99, 102, 241, 0.02)",
            tension: 0.4,
            fill: true,
            borderDash: [5, 5],
            order: 3,
            borderWidth: 2,
          },
          {
            label: "Traditional FX Trading",
            data: processedData.map((d) => d.traditional),
            borderColor: "rgba(124, 58, 237, 0.5)",
            backgroundColor: "rgba(124, 58, 237, 0.02)",
            tension: 0.4,
            fill: true,
            borderDash: [3, 3],
            order: 4,
            borderWidth: 2,
          },
        ],
      };

      const newOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "rgba(2, 6, 23, 0.95)",
            titleColor: "#fff",
            bodyColor: "#fff",
            borderColor: "rgba(59, 130, 246, 0.2)",
            borderWidth: 1,
            padding: {
              x: 12,
              y: 8,
            },
            displayColors: true,
            callbacks: {
              label: function (context: any) {
                const label = context.dataset.label || "";
                const value = context.raw.toFixed(1);
                return `${label}: ${value}%`;
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              maxRotation: 45,
              minRotation: 45,
              padding: 8,
              font: {
                size: isMobile ? 10 : 11,
                family: "'Inter', sans-serif",
              },
              color: "#64748b",
            },
          },
          y: {
            position: "left",
            grid: {
              color: "rgba(100, 116, 139, 0.1)",
              drawBorder: false,
              lineWidth: 1,
            },
            ticks: {
              padding: 12,
              callback: (value: number) => `${value.toFixed(0)}%`,
              font: {
                size: isMobile ? 10 : 11,
                family: "'Inter', sans-serif",
              },
              color: "#64748b",
              maxTicksLimit: 6,
            },
            min: 0,
            max:
              Math.ceil(
                Math.max(...processedData.map((d) => d.deltaEdge)) / 10
              ) * 10,
            beginAtZero: true,
          },
        },
        interaction: {
          intersect: false,
          mode: "index",
        },
        elements: {
          point: {
            radius: 0,
            hoverRadius: 6,
          },
          line: {
            tension: 0.4,
          },
        },
      };

      setChartData(data);
      setOptions(newOptions);
      setError(null);
    }
  }, [equityData, isMobile]); // Add dependencies that the effect relies on

  if (equityDataLoading) {
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
                strokeDasharray={[0, 251.2]}
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

  return (
    <div className="relative w-full">
      <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white to-rich-blue-50/90 backdrop-blur-xl shadow-2xl border border-rich-blue-100/20">
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.08),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(16,185,129,0.08),transparent_70%)]" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-rich-blue-100/10 to-transparent"
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
                <span className="text-sm font-medium text-rich-blue-900">
                  {dataset.label}
                </span>
              </motion.div>
            ))}
        </div>

        <div className="relative h-[450px]">
          {chartData && (
            <Line ref={chartRef} options={options} data={chartData} />
          )}
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center z-20"
          >
            <div className="max-w-md p-6 rounded-2xl bg-white/95 backdrop-blur-xl shadow-2xl border border-rich-blue-100/20">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 mb-4 rounded-full bg-rich-blue-50 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-rich-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-rich-blue-900 mb-2">
                  Performance Data Unavailable
                </h3>
                <p className="text-rich-blue-600 mb-4">
                  We're unable to load the performance data at the moment. Our
                  team has been notified and is working on resolving this issue.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-rich-blue-600 text-white rounded-lg hover:bg-rich-blue-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PerformanceGraph;

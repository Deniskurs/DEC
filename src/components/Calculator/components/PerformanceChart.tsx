import React, { useMemo, memo, useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { motion } from "framer-motion";
import { LuTrendingUp } from "react-icons/lu";

interface PerformanceChartProps {
  chartData: any;
}

// 1. Create a custom hook to track the window size
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ chartData }) => {
  // 2. Use the custom hook to get current window width/height
  const { width } = useWindowSize();

  // A helper function to create a “base” font size that scales with screen width
  const getResponsiveFont = () => {
    /*
      You can adjust these breakpoints or logic as you wish. 
      Example:
        - < 480px: 10px
        - < 768px: 12px
        - < 1024px: 14px
        - >= 1024px: 16px
    */
    if (width < 480) return 10;
    if (width < 768) return 12;
    if (width < 1024) return 14;
    return 16;
  };

  const baseFontSize = getResponsiveFont();

  // Memoize chart datasets with enhanced styling
  const memoizedDatasets = useMemo(
    () => ({
      ...chartData,
      datasets: chartData.datasets.map((dataset: any, index: number) => ({
        ...dataset,
        borderWidth: index === 0 ? 3.5 : 2,
        borderColor: index === 0 ? "rgb(0, 191, 255)" : "rgba(0, 82, 204, 0.5)",
        borderDash: index === 0 ? [] : [5, 5],
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          if (index === 0) {
            gradient.addColorStop(0, "rgba(0, 191, 255, 0.25)");
            gradient.addColorStop(0.6, "rgba(0, 191, 255, 0.08)");
            gradient.addColorStop(1, "rgba(0, 191, 255, 0)");
          } else {
            gradient.addColorStop(0, "rgba(0, 82, 204, 0.12)");
            gradient.addColorStop(0.6, "rgba(0, 82, 204, 0.04)");
            gradient.addColorStop(1, "rgba(0, 82, 204, 0)");
          }
          return gradient;
        },
        pointBackgroundColor:
          index === 0 ? "rgb(0, 191, 255)" : "rgba(0, 82, 204, 0.5)",
        pointBorderColor: "#0A1428",
        pointBorderWidth: 2,
        pointHoverBackgroundColor: "#0A1428",
        pointHoverBorderColor:
          index === 0 ? "rgb(0, 191, 255)" : "rgba(0, 82, 204, 0.5)",
        pointHoverBorderWidth: 3,
        tension: 0.4,
        fill: true,
      })),
    }),
    [chartData]
  );

  // Enhanced chart options with mobile-first and truly responsive design
  const chartOptions = useMemo(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      devicePixelRatio: window.devicePixelRatio || 2,
      elements: {
        line: {
          tension: 0.4,
          borderJoinStyle: "round",
          capBezierPoints: true,
        },
        point: {
          // Adjust the radius/hover to scale with baseFontSize if desired
          radius: baseFontSize * 0.15,
          hitRadius: baseFontSize * 1.4,
          hoverRadius: baseFontSize * 0.4,
          hoverBorderWidth: 3,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            font: {
              family: "'Inter', sans-serif",
              size: baseFontSize, // Use our computed responsive size
              weight: "500",
            },
            padding: baseFontSize,
            color: "rgba(252, 249, 240, 0.8)",
            maxRotation: 0,
            autoSkip: true,
            // Adjust maxTicksLimit based on available width
            maxTicksLimit: width < 768 ? 6 : 8,
          },
          border: {
            display: false,
          },
        },
        y: {
          grid: {
            color: "rgba(252, 249, 240, 0.1)",
            drawBorder: false,
            lineWidth: 0.5,
            drawTicks: false,
          },
          border: {
            display: false,
          },
          ticks: {
            font: {
              family: "'Inter', sans-serif",
              size: baseFontSize, // Use our computed responsive size
              weight: "500",
            },
            padding: baseFontSize,
            color: "rgba(252, 249, 240, 0.8)",
            maxTicksLimit: width < 768 ? 6 : 8,
            callback: function (value: number) {
              return new Intl.NumberFormat("en-GB", {
                style: "currency",
                currency: "GBP",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(value);
            },
          },
        },
      },
      plugins: {
        legend: {
          position: "top" as const,
          align: "end" as const,
          onClick: null, // Disable legend clicking
          labels: {
            boxWidth: baseFontSize * 0.8,
            boxHeight: baseFontSize * 0.8,
            padding: baseFontSize * 1.25,
            color: "rgba(252, 249, 240, 0.9)",
            font: {
              family: "'Inter', sans-serif",
              size: baseFontSize,
              weight: "600",
            },
            usePointStyle: true,
            pointStyle: "circle",
          },
        },
        tooltip: {
          enabled: true,
          backgroundColor: "rgba(10, 20, 40, 0.95)",
          titleColor: "rgba(252, 249, 240, 1)",
          bodyColor: "rgba(252, 249, 240, 0.9)",
          bodyFont: {
            family: "'Inter', sans-serif",
            size: baseFontSize, // Use our computed responsive size
          },
          padding: baseFontSize,
          cornerRadius: 8,
          boxPadding: 6,
          displayColors: false,
          borderColor: "rgba(0, 102, 255, 0.2)",
          borderWidth: 1,
          animation: {
            duration: 150,
          },
          callbacks: {
            label: function (context: any) {
              return ` ${context.dataset.label}: ${new Intl.NumberFormat(
                "en-GB",
                {
                  style: "currency",
                  currency: "GBP",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }
              ).format(context.parsed.y)}`;
            },
          },
        },
      },
      interaction: {
        mode: "nearest",
        axis: "x",
        intersect: false,
      },
      animation: {
        duration: width < 768 ? 1000 : 2000,
        easing: "easeInOutQuart",
      },
    };
  }, [baseFontSize, width]);

  return (
    <motion.div
      className="mt-8 sm:mt-12 transform-gpu"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: [0.25, 0.1, 0, 1] }}
    >
      {/* Chart Container with Premium Design */}
      <div className="relative bg-[#080B1A]/95 rounded-xl sm:rounded-2xl shadow-2xl backdrop-blur-xl p-4 sm:p-6 lg:p-8 overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1428] via-[#0D1A33] to-[#0A1428] rounded-xl sm:rounded-2xl opacity-95" />

        {/* Dynamic Gradient Overlays */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,102,255,0.15),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,82,204,0.15),transparent_70%)]" />
        </div>

        {/* Simplified Header */}
        <div className="relative z-10 flex items-center gap-3 mb-4 px-2">
          <div className="p-2 bg-rich-blue-500/10 rounded-lg">
            <LuTrendingUp className="h-5 w-5 text-rich-blue-500" />
          </div>
          <h4
            className="font-semibold text-cream-50"
            style={{
              fontSize: baseFontSize * 1.1,
            }}
          >
            Performance Analysis
          </h4>
        </div>

        {/* Optimized Chart Container */}
        <div className="relative">
          <div className="h-[240px] sm:h-[320px] lg:h-[380px]">
            <Line options={chartOptions} data={memoizedDatasets} />
          </div>

          {/* Enhanced Disclaimer Section */}
          <motion.div
            className="mt-6 sm:mt-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-[#0A1428]/50 p-4 sm:p-6 rounded-xl border border-rich-blue-500/20 backdrop-blur-sm">
              <div className="relative z-10">
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1.5 bg-rich-blue-500/10 rounded-lg">
                    <LuTrendingUp className="h-4 w-4 text-rich-blue-500" />
                  </div>
                  <div>
                    <p
                      className="text-cream-50/90 leading-relaxed"
                      style={{
                        fontSize: baseFontSize * 0.9,
                      }}
                    >
                      The value of your investment can go up as well as down.
                      Past performance is not indicative of future returns.
                      Capital at risk. © {new Date().getFullYear()} Delta Edge
                      Capital.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default memo(PerformanceChart);

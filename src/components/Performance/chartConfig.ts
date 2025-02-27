// src/components/Performance/chartConfig.ts
import { ChartOptions, Plugin } from "chart.js";

// Enhanced custom plugin for better visuals
const enhancedChartPlugin: Plugin = {
  id: 'enhancedChart',
  beforeDraw: (chart) => {
    const ctx = chart.ctx;
    const chartArea = chart.chartArea;
    
    // Add a subtle gradient background to chart area for depth
    if (chartArea) {
      const gradient = ctx.createLinearGradient(
        chartArea.left,
        chartArea.top,
        chartArea.left,
        chartArea.bottom
      );
      gradient.addColorStop(0, 'rgba(27, 54, 93, 0.02)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(
        chartArea.left,
        chartArea.top,
        chartArea.right - chartArea.left,
        chartArea.bottom - chartArea.top
      );
    }
  }
};

// Function to determine if device is a small mobile
const isSmallMobile = (isMobile: boolean): boolean => {
  if (typeof window !== 'undefined') {
    return isMobile && window.innerWidth < 380;
  }
  return false;
};

export const getChartOptions = (
  isMobile: boolean,
  maxValue: number,
  minValue: number,
  activeDatasetIndex: number | null = null,
  isTablet: boolean = false
): ChartOptions<"line"> => {
  const smallMobile = isSmallMobile(isMobile);
  
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 800,
      easing: "easeOutQuart",
      // Optimize animations for performance on mobile
      delay: (context) => {
        // Stagger animations for dataset entries
        return isMobile ? 0 : context.dataIndex * 10;
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(15, 23, 42, 0.85)", // Sleeker dark background
        titleColor: "#ffffff",
        bodyColor: "rgba(255, 255, 255, 0.8)",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 0,
        padding: {
          x: smallMobile ? 6 : 8,
          y: smallMobile ? 5 : 6,
        },
        cornerRadius: 6,
        displayColors: false, // Remove color boxes for cleaner look
        position: 'nearest',
        caretPadding: isMobile ? 8 : 6,
        caretSize: 0, // Remove the pointer for cleaner look
        // Enhanced styling with bold
        titleFont: {
          weight: 'bold',
          size: smallMobile ? 10 : 11,
          family: "'Inter', system-ui, sans-serif",
        },
        bodyFont: {
          size: smallMobile ? 9 : 10,
          family: "'Inter', system-ui, sans-serif",
        },
        bodySpacing: 3,
        // Compact tooltip size
        boxWidth: 0, // Remove color boxes completely
        boxHeight: 0,
        // Use custom tooltip to make it more compact and less intrusive
        usePointStyle: true,
        // Make tooltip follow cursor more closely
        xAlign: 'center',
        yAlign: 'bottom',
        callbacks: {
          // Minimal date format to save space
          title: function (tooltipItems) {
            const date = new Date(tooltipItems[0].label);
            return date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "2-digit",
            });
          },
          // Simplified value display
          label: function (context: any) {
            // Only show values that aren't null
            if (context.raw === null) return null;
            
            // For active dataset, highlight it
            const isActive = context.datasetIndex === activeDatasetIndex || activeDatasetIndex === null;
            const label = context.dataset.label || "";
            const value = context.raw.toFixed(2);
            
            // Make the active dataset bold and add a highlight symbol
            if (isActive && context.dataset.label === "Delta Edge Returns") {
              return `● ${label}: ${value}%`;
            } else if (isActive) {
              return `${label}: ${value}%`;
            } else {
              // Less prominent for inactive datasets
              return `${label}: ${value}%`;
            }
          },
          // Compare only when hovering Delta Edge Returns
          afterBody: function(context: any) {
            // Don't show comparison if tooltip has too many items to avoid clutter
            if (context.length > 2) return [];
            
            // Find Delta Edge and S&P 500 datasets
            const deltaEdgeItem = context.find((item: any) => item.dataset.label === "Delta Edge Returns");
            const sp500Item = context.find((item: any) => item.dataset.label === "S&P 500");
            
            if (deltaEdgeItem && sp500Item && sp500Item.raw !== null) {
              const difference = (deltaEdgeItem.raw - sp500Item.raw).toFixed(2);
              const isPositive = Number(difference) > 0;
              
              if (isPositive) {
                return [`\nΔ +${difference}% vs S&P 500`];
              } else if (Number(difference) < 0) {
                return [`\nΔ ${difference}% vs S&P 500`];
              }
            }
            return [];
          },
          // Add custom styling to labels
          labelTextColor: function(context: any) {
            // Delta Edge in blue, others in lighter color
            if (context.dataset.label === "Delta Edge Returns") {
              return "#3b82f6"; // Bright blue
            } else if (context.dataset.label === "S&P 500") {
              return "#ef4444"; // Red
            } else if (context.dataset.label === "Gold Index") {
              return "#f59e0b"; // Amber
            } else if (context.dataset.label === "MSCI World ETF") {
              return "#10b981"; // Emerald
            }
            return "rgba(255, 255, 255, 0.8)";
          },
          labelPointStyle: function(context: any) {
            // Only show point style for active dataset or Delta Edge
            if (context.datasetIndex === activeDatasetIndex || 
                context.dataset.label === "Delta Edge Returns" ||
                activeDatasetIndex === null) {
              return {
                pointStyle: 'circle',
                rotation: 0
              };
            }
            return {
              pointStyle: false
            };
          }
        },
      },
      // Add our enhanced plugin
      enhancedChartPlugin,
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        border: {
          display: false,
        },
        ticks: {
          maxRotation: smallMobile ? 45 : (isMobile ? 40 : 0),
          minRotation: smallMobile ? 45 : (isMobile ? 40 : 0),
          padding: smallMobile ? 3 : (isMobile ? 5 : 8),
          font: {
            size: smallMobile ? 8 : (isMobile ? 9 : 11),
            family: "'Inter', system-ui, sans-serif",
          },
          color: "#1B365D",
          callback: function (value, index, values) {
            const date = new Date(this.getLabelForValue(index));
            // Extremely optimized labels for different screen sizes
            if (smallMobile) {
              // For very small screens, show minimal labels
              if (index === 0 || index === values.length - 1 || index % 5 === 0) {
                return date.toLocaleDateString("en-US", {
                  month: "numeric",
                  year: "2-digit",
                });
              }
              return "";
            } else if (isMobile) {
              // For regular mobile screens
              if (index === 0 || index === values.length - 1 || index % 4 === 0) {
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                });
              }
              return "";
            } else if (isTablet) {
              // For tablet screens
              if (index === 0 || index === values.length - 1 || index % 3 === 0) {
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                });
              }
              return "";
            }
            // For desktop screens
            return date.toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            });
          },
          autoSkip: true,
          maxTicksLimit: smallMobile ? 2 : (isMobile ? 3 : 8),
        },
      },
      y: {
        position: "left",
        grid: {
          color: "rgba(27, 54, 93, 0.05)",
          drawBorder: false,
          lineWidth: 1,
          // Only show grid lines at specific intervals
          drawTicks: true,
          tickLength: 5,
        },
        border: {
          display: false,
        },
        ticks: {
          padding: smallMobile ? 4 : (isMobile ? 8 : 12),
          callback: (value: number) => `${value.toFixed(0)}%`,
          font: {
            size: smallMobile ? 8 : (isMobile ? 9 : 11),
            family: "'Inter', system-ui, sans-serif",
          },
          color: "#4A5568",
          maxTicksLimit: smallMobile ? 4 : (isMobile ? 5 : 6),
        },
        // Dynamic min and max based on data range but ensure good visual spacing
        min: Math.floor(minValue) - (smallMobile ? 0.5 : (isMobile ? 1 : 2)),
        max: Math.ceil(maxValue) + (smallMobile ? 0.5 : (isMobile ? 1 : 2)),
        beginAtZero: minValue > 0 ? false : true,
      },
    },
    interaction: {
      intersect: false,
      mode: "index", // Changed to index for better tooltip experience
      axis: 'x', // Only search along x axis for better mobile touch experience
    },
    elements: {
      point: {
        radius: 0, // Hide points normally
        hoverRadius: smallMobile ? 4 : (isMobile ? 5 : 6),
        hoverBorderWidth: 2,
        hoverBorderColor: "#fff",
        // Smart point display - only show at important data points
        pointStyle: (ctx) => {
          const datasetIndex = ctx.datasetIndex;
          const dataIndex = ctx.dataIndex;
          const totalPoints = ctx.chart.data.datasets[datasetIndex].data.length;
          
          // Only show points at first, last, and milestone points
          if (dataIndex === 0 || dataIndex === totalPoints - 1 || 
              (datasetIndex === 0 && dataIndex % (isMobile ? 8 : 5) === 0)) {
            return 'circle';
          }
          return 'none';
        },
        // Dynamic radius based on importance
        radius: (ctx) => {
          const datasetIndex = ctx.datasetIndex;
          const dataIndex = ctx.dataIndex;
          const totalPoints = ctx.chart.data.datasets[datasetIndex].data.length;
          
          // Only show points at first, last, and milestone points
          if (dataIndex === 0 || dataIndex === totalPoints - 1) {
            return smallMobile ? 2 : 3;
          } else if (datasetIndex === 0 && dataIndex % (isMobile ? 8 : 5) === 0) {
            return smallMobile ? 1.5 : 2;
          }
          return 0;
        },
      },
      line: {
        tension: 0.4, // Slightly smoother curves
        borderCapStyle: "round",
        borderJoinStyle: "round",
        fill: false,
        // Enhanced line thickness with better mobile visibility and focus state
        borderWidth: (ctx) => {
          const datasetIndex = ctx.datasetIndex;
          const isActiveDataset = datasetIndex === activeDatasetIndex || activeDatasetIndex === null;
          const isDeltaEdge = datasetIndex === 0; // Delta Edge is the primary dataset
          
          let baseWidth = ctx.dataset.borderWidth as number;
          
          // Adjust thickness based on device and dataset importance
          if (isMobile) {
            // Make primary line slightly thicker on mobile for visibility
            if (isDeltaEdge) {
              baseWidth = Math.min(baseWidth, smallMobile ? 2.2 : 2.5);
            } else {
              // Make other lines slightly thinner on mobile
              baseWidth = Math.min(baseWidth, smallMobile ? 1.2 : 1.5);
            }
          }
          
          // Emphasize active dataset or dim inactive ones
          if (activeDatasetIndex !== null) {
            if (isActiveDataset) {
              return baseWidth + (smallMobile ? 0.5 : 1);
            } else {
              // Dim inactive datasets
              return baseWidth * 0.5;
            }
          }
          
          return baseWidth;
        },
      },
    },
  };
};

// Enhanced dataset styles with gradients and better visual hierarchy
export const DATASET_STYLES = {
  deltaEdge: {
    label: "Delta Edge Returns",
    borderColor: "#0066cc", // Bright blue
    backgroundColor: "transparent", // No fill
    pointBackgroundColor: "#0066cc",
    pointHoverBackgroundColor: "#fff",
    pointBorderColor: "#0066cc",
    pointHoverBorderColor: "#0066cc",
    pointBorderWidth: 2,
    pointHoverBorderWidth: 3,
    hoverBackgroundColor: "rgba(0, 102, 204, 0.12)",
    order: 1,
    borderWidth: 3,
    fill: false, // Disable fill for clean look
    tension: 0.4, // Add curve to make it more elegant
    borderJoinStyle: 'round',
  },
  sp500: {
    label: "S&P 500",
    borderColor: "#e63946", // Red
    backgroundColor: "rgba(230, 57, 70, 0.03)",
    pointBackgroundColor: "#e63946",
    pointHoverBackgroundColor: "#fff",
    pointBorderColor: "#e63946",
    pointHoverBorderColor: "#e63946",
    pointBorderWidth: 1.5,
    pointHoverBorderWidth: 2,
    hoverBackgroundColor: "rgba(230, 57, 70, 0.05)",
    borderDash: [5, 5],
    order: 3,
    borderWidth: 2,
    fill: false,
  },
  gold: {
    label: "Gold Index",
    borderColor: "#ffc107", // Gold
    backgroundColor: "rgba(255, 193, 7, 0.03)",
    pointBackgroundColor: "#ffc107",
    pointHoverBackgroundColor: "#fff",
    pointBorderColor: "#ffc107",
    pointHoverBorderColor: "#ffc107",
    pointBorderWidth: 1.5,
    pointHoverBorderWidth: 2,
    hoverBackgroundColor: "rgba(255, 193, 7, 0.05)",
    borderDash: [3, 3],
    order: 4,
    borderWidth: 2,
    fill: false,
  },
  msciWorld: {
    label: "MSCI World ETF",
    borderColor: "#2a9d8f", // Teal
    backgroundColor: "rgba(42, 157, 143, 0.03)",
    pointBackgroundColor: "#2a9d8f",
    pointHoverBackgroundColor: "#fff",
    pointBorderColor: "#2a9d8f",
    pointHoverBorderColor: "#2a9d8f",
    pointBorderWidth: 1.5,
    pointHoverBorderWidth: 2,
    hoverBackgroundColor: "rgba(42, 157, 143, 0.05)",
    borderDash: [8, 4],
    order: 2,
    borderWidth: 2,
    fill: false,
  },
};

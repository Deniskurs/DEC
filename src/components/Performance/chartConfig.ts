// src/components/Performance/chartConfig.ts
import { ChartOptions } from "chart.js";

export const getChartOptions = (
  isMobile: boolean,
  maxValue: number,
  minValue: number,
  activeDatasetIndex: number | null = null
): ChartOptions<"line"> => ({
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 800,
    easing: 'easeOutQuart'
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "rgba(255, 255, 255, 0.98)",
      titleColor: "#1B365D",
      bodyColor: "#4A5568",
      borderColor: "rgba(27, 54, 93, 0.1)",
      borderWidth: 1,
      padding: {
        x: 12,
        y: 8,
      },
      cornerRadius: 6,
      displayColors: true,
      callbacks: {
        // Format date in tooltip
        title: function(tooltipItems) {
          const date = new Date(tooltipItems[0].label);
          return date.toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric'
          });
        },
        // Format values in tooltip
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
        maxRotation: isMobile ? 50 : 45,
        minRotation: isMobile ? 50 : 45,
        padding: isMobile ? 5 : 8,
        font: {
          size: isMobile ? 9 : 11,
          family: "'Inter', system-ui, sans-serif",
        },
        color: "#1B365D",
        callback: function(value, index, values) {
          const date = new Date(this.getLabelForValue(index));
          // Show fewer labels on mobile
          if (isMobile && values.length > 5) {
            if (index === 0 || index === values.length - 1 || index % 3 === 0) {
              return date.toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric'
              });
            }
            return '';
          }
          return date.toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric'
          });
        },
        autoSkip: true,
        maxTicksLimit: isMobile ? 4 : 8,
      },
    },
    y: {
      position: "left",
      grid: {
        color: "rgba(27, 54, 93, 0.08)",
        drawBorder: false,
        lineWidth: 1,
      },
      ticks: {
        padding: isMobile ? 8 : 12,
        callback: (value: number) => `${value.toFixed(0)}%`,
        font: {
          size: isMobile ? 9 : 11,
          family: "'Inter', system-ui, sans-serif",
        },
        color: "#4A5568",
        maxTicksLimit: isMobile ? 5 : 6,
      },
      min: Math.floor(minValue) - (isMobile ? 1 : 2),
      max: Math.ceil(maxValue) + (isMobile ? 1 : 2),
      beginAtZero: false,
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
      hoverBorderWidth: 2,
      hoverBorderColor: '#fff',
    },
    line: {
      tension: 0.4,
      borderCapStyle: 'round',
      borderJoinStyle: 'round',
      fill: false,
      // Highlight active dataset
      borderWidth: (ctx) => {
        if (ctx.datasetIndex === activeDatasetIndex) {
          return ctx.dataset.borderWidth + 1;
        }
        return ctx.dataset.borderWidth;
      },
    },
  },
});

export const DATASET_STYLES = {
  deltaEdge: {
    label: "Delta Edge Returns",
    borderColor: "#0066cc", // Bright blue
    backgroundColor: "rgba(0, 102, 204, 0.05)",
    pointBackgroundColor: "#0066cc",
    pointHoverBackgroundColor: "#0066cc",
    order: 1,
    borderWidth: 3.5,
  },
  sp500: {
    label: "S&P 500",
    borderColor: "#e63946", // Red
    backgroundColor: "rgba(230, 57, 70, 0.03)",
    pointBackgroundColor: "#e63946",
    pointHoverBackgroundColor: "#e63946",
    borderDash: [5, 5],
    order: 3,
    borderWidth: 2.5,
  },
  gold: {
    label: "Gold Index",
    borderColor: "#ffc107", // Gold
    backgroundColor: "rgba(255, 193, 7, 0.03)",
    pointBackgroundColor: "#ffc107",
    pointHoverBackgroundColor: "#ffc107",
    borderDash: [3, 3],
    order: 4,
    borderWidth: 2.5,
  },
  msciWorld: {
    label: "MSCI World ETF",
    borderColor: "#2a9d8f", // Teal
    backgroundColor: "rgba(42, 157, 143, 0.03)",
    pointBackgroundColor: "#2a9d8f",
    pointHoverBackgroundColor: "#2a9d8f",
    borderDash: [8, 4],
    order: 2,
    borderWidth: 2.5,
  },
};

// src/components/Performance/chartConfig.ts
import { ChartOptions } from "chart.js";

export const getChartOptions = (
  isMobile: boolean,
  maxValue: number,
  minValue: number
): ChartOptions<"line"> => ({
  responsive: true,
  maintainAspectRatio: false,
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
        color: "#1B365D",
      },
    },
    y: {
      position: "left",
      grid: {
        color: "rgba(27, 54, 93, 0.06)",
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
        color: "#4A5568",
        maxTicksLimit: 6,
      },
      min: Math.floor(minValue), // Completely dynamic minimum
      max: Math.ceil(maxValue), // Completely dynamic maximum
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
    },
    line: {
      tension: 0.4,
    },
  },
});

export const DATASET_STYLES = {
  deltaEdge: {
    label: "Delta Edge Returns",
    borderColor: "#1B365D",
    backgroundColor: "rgba(27, 54, 93, 0.05)",
    order: 1,
    borderWidth: 3,
  },
  sp500: {
    label: "S&P 500",
    borderColor: "#946B38",
    backgroundColor: "rgba(148, 107, 56, 0.02)",
    borderDash: [5, 5],
    order: 3,
    borderWidth: 2,
  },
  gold: {
    label: "Gold Index",
    borderColor: "#DAA520",
    backgroundColor: "rgba(218, 165, 32, 0.02)",
    borderDash: [3, 3],
    order: 4,
    borderWidth: 2,
  },
  msciWorld: {
    label: "MSCI World ETF",
    borderColor: "#4A5568",
    backgroundColor: "rgba(74, 85, 104, 0.02)",
    borderDash: [8, 4],
    order: 2,
    borderWidth: 2,
  },
};

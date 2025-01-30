// calculatorConfig.ts
import { ChartOptions } from 'chart.js';
import { formatCurrency } from '../utils/formatters';

export const MONTHLY_GROWTH_RATE = 0.0176; // 1.76% monthly return
export const TRADITIONAL_APY = 0.04; // 4% APY for traditional investments
export const DEFAULT_INVESTMENT = 25000;
export const DEFAULT_MONTHS = 12;

export const INVESTMENT_RANGE = {
  min: 2500,
  max: 1000000,
  step: 500,
};

export const MONTHS_RANGE = {
  min: 6,
  max: 60,
  step: 1,
};

export const getChartData = (investment: number, months: number) => ({
  labels: Array.from({ length: months + 1 }, (_, i) => i === 0 ? 'Start' : `Month ${i}`),
  datasets: [
    {
      label: 'Delta Edge Strategy',
      data: Array.from({ length: months + 1 }, (_, i) => {
        return investment * Math.pow(1 + MONTHLY_GROWTH_RATE, i);
      }),
      borderColor: 'rgb(0, 102, 255)',
      backgroundColor: 'rgba(0, 102, 255, 0.1)',
      tension: 0.4,
      fill: true,
      borderWidth: 3,
      pointRadius: (ctx: any) => {
        const index = ctx.dataIndex;
        return index === 0 || index === months ? 6 : 0;
      },
      pointHoverRadius: 8,
      pointBackgroundColor: 'rgb(0, 102, 255)',
      pointBorderColor: 'white',
      pointBorderWidth: 2,
    },
    {
      label: 'Traditional Portfolio',
      data: Array.from({ length: months + 1 }, (_, i) => {
        const monthlyRate = TRADITIONAL_APY / 12;
        return investment * (1 + monthlyRate * i);
      }),
      borderColor: 'rgba(0, 82, 204, 0.5)',
      backgroundColor: 'rgba(0, 82, 204, 0.05)',
      tension: 0.4,
      fill: true,
      borderWidth: 2,
      borderDash: [5, 5],
      pointRadius: (ctx: any) => {
        const index = ctx.dataIndex;
        return index === 0 || index === months ? 6 : 0;
      },
      pointHoverRadius: 8,
      pointBackgroundColor: 'rgba(0, 82, 204, 0.5)',
      pointBorderColor: 'white',
      pointBorderWidth: 2,
    }
  ],
});

export const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top',
      onClick: null,
      labels: {
        boxWidth: 12,
        boxHeight: 12,
        padding: 20,
        font: {
          family: "'Inter', sans-serif",
          size: 13,
          weight: '600',
        },
        usePointStyle: true,
        pointStyle: 'circle',
      }
    },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      titleColor: '#002966',
      bodyColor: '#0066FF',
      bodyFont: {
        family: "'Inter', sans-serif",
        size: 14,
      },
      padding: 12,
      borderColor: 'rgba(0, 102, 255, 0.1)',
      borderWidth: 1,
      displayColors: true,
      callbacks: {
        label: function(context: any) {
          const value = context.parsed.y;
          const initialValue = context.dataset.data[0];
          const percentageGain = ((value - initialValue) / initialValue * 100).toFixed(1);
          return `${context.dataset.label}: ${formatCurrency(value)} (${percentageGain}% return)`;
        }
      }
    }
  },
  scales: {
    y: {
      grid: {
        color: 'rgba(0, 102, 255, 0.1)',
        drawBorder: false,
      },
      border: {
        display: false,
      },
      ticks: {
        callback: function(value: any) {
          return formatCurrency(value);
        },
        font: {
          family: "'Inter', sans-serif",
          size: 12,
        },
        padding: 8,
        color: '#002966'
      },
    },
    x: {
      grid: {
        display: false,
        drawBorder: false
      },
      border: {
        display: false
      },
      ticks: {
        font: {
          family: "'Inter', sans-serif",
          size: 12,
        },
        padding: 8,
        color: '#002966',
        maxRotation: 0,
        autoSkip: true,
        maxTicksLimit: 6
      }
    }
  },
  interaction: {
    intersect: false,
    mode: 'index'
  },
};
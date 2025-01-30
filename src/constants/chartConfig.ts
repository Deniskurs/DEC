import { ChartOptions } from 'chart.js';

export const getChartData = (isMobile: boolean) => ({
  labels: ['Sep 24', 'Oct 17', 'Nov 01', 'Dec 03', 'Dec 31', 'Jan 16'],
  datasets: [
    {
      label: 'Delta Edge Hybrid Fund',
      data: [100, 101.2, 102.5, 103.8, 105.2, 106.98],
      borderColor: 'rgb(0, 102, 255)',
      backgroundColor: (context: any) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(0, 102, 255, 0.25)');
        gradient.addColorStop(1, 'rgba(0, 102, 255, 0)');
        return gradient;
      },
      tension: 0.4,
      fill: true,
      pointRadius: (context: any) => context.dataIndex === context.dataset.data.length - 1 ? 8 : 6,
      pointHoverRadius: 10,
      pointBackgroundColor: 'rgb(0, 102, 255)',
      pointBorderColor: 'white',
      pointBorderWidth: 3,
      borderWidth: 4,
      borderCapStyle: 'round',
      cubicInterpolationMode: 'monotone',
    },
    {
      label: 'S&P 500',
      data: [100, 100.8, 101.3, 102.1, 102.8, 103.2],
      borderColor: 'rgb(0, 82, 204)',
      backgroundColor: (context: any) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(0, 82, 204, 0.15)');
        gradient.addColorStop(1, 'rgba(0, 82, 204, 0)');
        return gradient;
      },
      tension: 0.4,
      fill: true,
      pointRadius: 5,
      pointHoverRadius: 8,
      pointBackgroundColor: 'rgb(0, 82, 204)',
      pointBorderColor: 'white',
      pointBorderWidth: 2,
      borderWidth: 3,
      borderDash: [5, 5],
    },
    {
      label: 'Hedge Fund Index',
      data: [100, 100.6, 101.1, 101.8, 102.3, 102.7],
      borderColor: 'rgb(0, 61, 153)',
      backgroundColor: (context: any) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(0, 61, 153, 0.15)');
        gradient.addColorStop(1, 'rgba(0, 61, 153, 0)');
        return gradient;
      },
      tension: 0.4,
      fill: true,
      pointRadius: 5,
      pointHoverRadius: 8,
      pointBackgroundColor: 'rgb(0, 61, 153)',
      pointBorderColor: 'white',
      pointBorderWidth: 2,
      borderWidth: 3,
      borderDash: [8, 4],
    },
    {
      label: 'Traditional FX Trading',
      data: [100, 100.3, 100.7, 101.0, 101.4, 101.6],
      borderColor: 'rgb(0, 41, 102)',
      backgroundColor: (context: any) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, 'rgba(0, 41, 102, 0.15)');
        gradient.addColorStop(1, 'rgba(0, 41, 102, 0)');
        return gradient;
      },
      tension: 0.4,
      fill: true,
      pointRadius: 5,
      pointHoverRadius: 8,
      pointBackgroundColor: 'rgb(0, 41, 102)',
      pointBorderColor: 'white',
      pointBorderWidth: 2,
      borderWidth: 3,
      borderDash: [3, 3],
    }
  ],
});

export const getChartOptions = (isMobile: boolean): ChartOptions<'line'> => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: isMobile ? 'bottom' : 'top',
      align: 'center',
      labels: {
        padding: isMobile ? 15 : 25,
        font: {
          size: isMobile ? 11 : 14,
          family: "'Inter', sans-serif",
          weight: '600'
        },
        usePointStyle: true,
        pointStyle: 'circle',
        boxWidth: isMobile ? 8 : 10,
        boxHeight: isMobile ? 8 : 10,
      }
    },
    tooltip: {
      backgroundColor: 'rgba(252, 249, 240, 0.98)',
      titleColor: '#001433',
      bodyColor: '#002966',
      bodyFont: {
        size: isMobile ? 12 : 14,
        family: "'Inter', sans-serif"
      },
      titleFont: {
        size: isMobile ? 14 : 16,
        family: "'Inter', sans-serif",
        weight: '600'
      },
      padding: isMobile ? 12 : 16,
      cornerRadius: 12,
      boxPadding: 6,
      borderColor: 'rgba(252, 249, 240, 0.9)',
      borderWidth: 1,
      displayColors: true,
      callbacks: {
        label: function(context) {
          const gain = (context.parsed.y - 100).toFixed(2);
          const sign = Number(gain) >= 0 ? '+' : '';
          return `${context.dataset.label}: ${sign}${gain}%`;
        }
      },
      animation: {
        duration: 150
      }
    }
  },
  scales: {
    y: {
      beginAtZero: false,
      grid: {
        display: true,
        color: 'rgba(252, 249, 240, 0.4)',
        drawBorder: false,
        lineWidth: 1,
        drawTicks: false
      },
      border: {
        display: false
      },
      ticks: {
        callback: function(value) {
          const gain = (Number(value) - 100).toFixed(1);
          const sign = Number(gain) >= 0 ? '+' : '';
          return `${sign}${gain}%`;
        },
        font: {
          size: isMobile ? 10 : 12,
          family: "'Inter', sans-serif",
          weight: '500'
        },
        padding: isMobile ? 8 : 12,
        color: '#002966'
      },
      min: 99,
      max: 108,
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
          size: isMobile ? 10 : 12,
          family: "'Inter', sans-serif",
          weight: '500'
        },
        padding: isMobile ? 8 : 12,
        color: '#002966',
        maxRotation: isMobile ? 45 : 0,
        minRotation: isMobile ? 45 : 0
      }
    }
  },
  interaction: {
    intersect: false,
    mode: 'index'
  },
  elements: {
    line: {
      borderJoinStyle: 'round',
      capBezierPoints: true
    },
    point: {
      hitRadius: isMobile ? 4 : 6,
      hoverBorderWidth: 3
    }
  },
  animation: {
    duration: 1500,
    easing: 'easeInOutQuart'
  },
  layout: {
    padding: {
      top: isMobile ? 10 : 20,
      right: isMobile ? 10 : 20,
      bottom: isMobile ? 10 : 20,
      left: isMobile ? 10 : 20
    }
  }
});
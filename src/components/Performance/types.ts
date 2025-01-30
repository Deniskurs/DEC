export interface ChartDataPoint {
  date: string;
  deltaEdge: number;
  sp500: number;
  hedgeFund: number;
  traditional: number;
}

export interface PerformanceMetric {
  label: string;
  value: string;
  description: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
}
// src/types/marketData.ts
export interface RawMarketDataPoint {
  date: string;
  close: number;
  volume?: number;
}

export interface ProcessedMarketDataPoint {
  date: string;
  value: number;
}

export interface MarketDataState {
  sp500Data: ProcessedMarketDataPoint[];
  goldData: ProcessedMarketDataPoint[];
  msciWorldData: ProcessedMarketDataPoint[];
  isLoading: boolean;
  error: string | null;
}

export interface MarketDataConfig {
  apiKey: string;
  startDate: string;
  baseValue: number;
}

export interface ChartDataPoint {
  date: string;
  deltaEdge: number;
  sp500?: number;
  gold?: number;
  msciWorld?: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension: number;
    fill: boolean;
    borderDash?: number[];
    order: number;
    borderWidth: number;
  }[];
}

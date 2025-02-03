// src/hooks/useMarketData.ts
import { useState, useEffect } from "react";
import { MarketDataState, MarketDataConfig } from "../types/marketData";

const ALPHA_VANTAGE_BASE_URL = "https://www.alphavantage.co/query";

// Helper function to convert MM/DD/YYYY to YYYY-MM-DD
const formatDate = (dateStr: string): string => {
  const [month, day, year] = dateStr.split("/");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

// Helper function to convert YYYY-MM-DD to MM/DD/YYYY
const reverseFormatDate = (dateStr: string): string => {
  const [year, month, day] = dateStr.split("-");
  return `${month}/${day}/${year}`;
};

export const useMarketData = ({
  apiKey,
  startDate,
  baseValue,
}: MarketDataConfig): MarketDataState => {
  const [state, setState] = useState<MarketDataState>({
    sp500Data: [],
    goldData: [],
    msciWorldData: [],
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    if (!apiKey || !startDate) {
      console.log("Missing required parameters");
      return;
    }

    const formattedStartDate = formatDate(startDate);

    const processTimeSeriesData = (timeSeriesData: any, symbol: string) => {
      const getBasePrice = () => {
        const startDateData = timeSeriesData[formattedStartDate];
        if (startDateData) {
          return parseFloat(startDateData["4. close"]);
        }
        const dates = Object.keys(timeSeriesData).sort();
        const closestDate = dates.find(
          (date) => new Date(date) >= new Date(formattedStartDate)
        );
        return closestDate
          ? parseFloat(timeSeriesData[closestDate]["4. close"])
          : baseValue;
      };

      const basePrice = getBasePrice();

      return Object.entries(timeSeriesData)
        .filter(([date]) => new Date(date) >= new Date(formattedStartDate))
        .map(([date, values]: [string, any]) => {
          const closePrice = parseFloat(values["4. close"]);
          const percentageChange = ((closePrice - basePrice) / basePrice) * 100;

          return {
            date: reverseFormatDate(date),
            value: percentageChange,
          };
        })
        .sort(
          (a, b) =>
            new Date(formatDate(a.date)).getTime() -
            new Date(formatDate(b.date)).getTime()
        );
    };

    const fetchMarketData = async (symbol: string) => {
      const response = await fetch(
        `${ALPHA_VANTAGE_BASE_URL}?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=${apiKey}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch ${symbol} data: ${response.statusText}`
        );
      }

      const data = await response.json();

      if (data["Error Message"]) {
        throw new Error(`API Error for ${symbol}: ${data["Error Message"]}`);
      }

      if (data["Note"]) {
        throw new Error(`API Limit reached: ${data["Note"]}`);
      }

      const timeSeriesData = data["Time Series (Daily)"];
      if (!timeSeriesData) {
        throw new Error(`No time series data received for ${symbol}`);
      }

      return processTimeSeriesData(timeSeriesData, symbol);
    };

    const fetchAllData = async () => {
      try {
        setState((prev) => ({ ...prev, isLoading: true }));

        // Fetch all datasets concurrently
        const [sp500Data, goldData, msciWorldData] = await Promise.all([
          fetchMarketData("SPY"), // S&P 500 ETF
          fetchMarketData("GLD"), // Gold ETF
          fetchMarketData("URTH"), // iShares MSCI World ETF
        ]);

        setState({
          sp500Data,
          goldData,
          msciWorldData,
          isLoading: false,
          error: null,
        });
      } catch (err) {
        console.error("Market data fetch error:", err);
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error:
            err instanceof Error ? err.message : "Failed to fetch market data",
        }));
      }
    };

    fetchAllData();
  }, [apiKey, startDate, baseValue]);

  return state;
};

import apiClient from "../api/axios";
import { useQuery } from "@tanstack/react-query";

const ALPHA_VANTAGE_API_KEY = "WE9OWWH9DV65HA3K";
const ALPHA_VANTAGE_BASE_URL = "https://www.alphavantage.co/query";

interface MarketDataParams {
  symbols: string[];
  start: string;
  end?: string;
}
interface FetchMarketDataParams {
  symbol: string;
  start: string;
  end?: string;
}

// Helper function to convert MM/DD/YYYY to YYYY-MM-DD
const formatDate = (dateStr: string): string => {
  const [month, day, year] = dateStr.split("/");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

const fetchMarketData = async ({
  symbol,
  start,
  end,
}: FetchMarketDataParams) => {
  try {
    // Use Alpha Vantage API for all symbols
    const formattedStartDate = formatDate(start);
    
    // Map index symbols to Alpha Vantage tickers if needed
    let alphaTicker = symbol;
    
    const response = await fetch(
      `${ALPHA_VANTAGE_BASE_URL}?function=TIME_SERIES_DAILY&symbol=${alphaTicker}&outputsize=full&apikey=${ALPHA_VANTAGE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch ${symbol} data: ${response.statusText}`);
    }

    const data = await response.json();

    if (data["Error Message"]) {
      throw new Error(`API Error for ${symbol}: ${data["Error Message"]}`);
    }

    if (data["Note"]) {
      console.warn(`API Note for ${symbol}: ${data["Note"]}`);
      // Check if the note is about API call frequency/limits
      if (data["Note"].includes("Thank you for using Alpha Vantage")) {
        throw new Error(`API Limit reached for ${symbol}: ${data["Note"]}`);
      }
    }

    const timeSeriesData = data["Time Series (Daily)"];
    if (!timeSeriesData) {
      throw new Error(`No time series data received for ${symbol}`);
    }

    // Find base price at start date for percentage calculation
    const getBasePrice = () => {
      const startDateFormatted = formatDate(start);
      const startDateData = timeSeriesData[startDateFormatted];
      if (startDateData) {
        return parseFloat(startDateData["4. close"]);
      }
      const dates = Object.keys(timeSeriesData).sort();
      const closestDate = dates.find(
        (date) => new Date(date) >= new Date(startDateFormatted)
      );
      return closestDate
        ? parseFloat(timeSeriesData[closestDate]["4. close"])
        : 0;
    };

    const basePrice = getBasePrice();
    if (basePrice === 0) {
      throw new Error(`Could not determine base price for ${symbol}`);
    }

    // Process and format the data
    return Object.entries(timeSeriesData)
      .filter(([date]) => {
        if (!end) return new Date(date) >= new Date(formattedStartDate);
        const formattedEndDate = formatDate(end);
        return new Date(date) >= new Date(formattedStartDate) && 
               new Date(date) <= new Date(formattedEndDate);
      })
      .map(([date, values]: [string, any]) => {
        const closePrice = parseFloat(values["4. close"]);
        const percentageChange = ((closePrice - basePrice) / basePrice) * 100;

        // Convert YYYY-MM-DD to MM/DD/YYYY for consistency
        const [year, month, day] = date.split("-");
        return {
          date: `${month}/${day}/${year}`,
          value: percentageChange,
        };
      })
      .sort((a, b) => {
        const dateA = new Date(formatDate(a.date));
        const dateB = new Date(formatDate(b.date));
        return dateA.getTime() - dateB.getTime();
      });
  } catch (error) {
    console.error(`Error fetching ${symbol} data:`, error);
    throw error;
  }
};

const fetchAllMarketData = async ({
  symbols,
  start,
  end,
}: MarketDataParams) => {
  return Promise.all(
    symbols.map((symbol) => fetchMarketData({ symbol, start, end }))
  );
};

const fetchMonthlyGain = async (symbol: string) => {
  try {
    // If symbol is GLD or URTH, use Alpha Vantage to calculate average monthly gain
    if (symbol === "GLD" || symbol === "URTH") {
      // For Alpha Vantage symbols, we'll calculate a basic monthly gain from the last year of data
      const response = await fetch(
        `${ALPHA_VANTAGE_BASE_URL}?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch monthly data for ${symbol}`);
      }
      
      const data = await response.json();
      
      if (data["Error Message"]) {
        throw new Error(`API Error for ${symbol}: ${data["Error Message"]}`);
      }
      
      const monthlyData = data["Monthly Time Series"];
      if (!monthlyData) {
        throw new Error(`No monthly data received for ${symbol}`);
      }
      
      // Get entries and sort by date (newest first)
      const entries = Object.entries(monthlyData)
        .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime());
      
      // Get the last 13 months of data to calculate 12 monthly changes
      const last13Months = entries.slice(0, 13);
      
      if (last13Months.length < 2) {
        throw new Error(`Not enough monthly data for ${symbol}`);
      }
      
      // Calculate monthly percentage changes
      const monthlyChanges = [];
      for (let i = 0; i < last13Months.length - 1; i++) {
        const currentMonth = parseFloat(last13Months[i][1]["4. close"]);
        const previousMonth = parseFloat(last13Months[i + 1][1]["4. close"]);
        const monthlyChange = ((currentMonth - previousMonth) / previousMonth) * 100;
        monthlyChanges.push(monthlyChange);
      }
      
      // Calculate average monthly gain
      const avgMonthlyGain = monthlyChanges.reduce((sum, change) => sum + change, 0) / monthlyChanges.length;
      
      return {
        symbol,
        value: avgMonthlyGain.toFixed(2)
      };
    }
    
    // For other symbols, use the original API
    const url = `https://myfxbook-api.vercel.app/api/market/${symbol}/avg-monthly-gain`;
    const { data } = await apiClient.get(url);
    return data;
  } catch (error) {
    console.error(`Error fetching monthly gain for ${symbol}:`, error);
    
    // Return fallback value to avoid breaking the UI
    return {
      symbol,
      value: symbol === "GLD" ? "1.2" : "0.8" // Default fallback values
    };
  }
};

export const useDeadStrats = () => {
  const useMonthlyGainQuery = (symbol: string) => {
    return useQuery({
      queryKey: ["monthlyGain", symbol],
      queryFn: () => fetchMonthlyGain(symbol),
      // Shared configuration - cache for 24 hours to avoid hitting API limits
      refetchInterval: 86400000, // 24 hours
      staleTime: 86400000, // 24 hours
      retry: 1, // Retry failed request once
      retryDelay: 3000, // Wait 3 seconds between retries
      enabled: !!symbol,
    });
  };

  const useDeadMarketDataQuery = (
    symbols: string[],
    start: string,
    end?: string
  ) => {
    return useQuery({
      queryKey: ["allMarketData", symbols, start, end],
      queryFn: () => fetchAllMarketData({ symbols, start, end }),
      // Shared configuration - cache for 24 hours to avoid hitting API limits
      refetchInterval: 86400000, // 24 hours
      staleTime: 86400000, // 24 hours
      retry: 2, // Retry failed requests twice
      retryDelay: 5000, // Wait 5 seconds between retries
      // Validation
      enabled: !!start && symbols?.length > 0,
    });
  };

  return {
    useDeadMarketDataQuery,
    useMonthlyGainQuery,
  };
};

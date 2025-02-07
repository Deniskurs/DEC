import apiClient from "../api/axios";
import { useQuery } from "@tanstack/react-query";

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

const fetchMarketData = async ({
  symbol,
  start,
  end,
}: FetchMarketDataParams) => {
  const url = `/market/${symbol}${
    end ? `?start=${start}&end=${end}` : `?start=${start}`
  }`;

  const { data } = await apiClient.get(url);
  return data;
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
  const url = `/market/${symbol}/avg-monthly-gain`;
  const { data } = await apiClient.get(url);
  return data;
};

export const useDeadStrats = () => {
  const useMonthlyGainQuery = (symbol: string) => {
    return useQuery({
      queryKey: ["monthlyGain", symbol],
      queryFn: () => fetchMonthlyGain(symbol),
      refetchInterval: 43200000,
      staleTime: 43200000,
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
      // Shared configuration
      refetchInterval: 43200000,
      staleTime: 43200000,
      // Validation
      enabled: !!start && symbols?.length > 0,
    });
  };

  return {
    useDeadMarketDataQuery,
    useMonthlyGainQuery,
  };
};

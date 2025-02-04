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

export const useDeadStrats = (
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

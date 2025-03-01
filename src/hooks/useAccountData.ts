import apiClient from "../api/axios";

import { useQuery } from "@tanstack/react-query";

const fetchEquityData = async () => {
  const { data } = await apiClient.get(
    "https://myfxbook-api.vercel.app/api/account/11312543/equity"
  );
  //   console.log("fetching equity data", data);

  return data;
};

const fetchAccountData = async () => {
  const { data } = await apiClient.get(
    "https://myfxbook-api.vercel.app/api/account/11312543/"
  );
  return data;
};

export const useAccountData = () => {
  const equityQuery = useQuery({
    queryKey: ["equityData"],
    queryFn: () => fetchEquityData(),
    refetchInterval: 432000, // 12 hours in milliseconds
  });
  const accountQuery = useQuery({
    queryKey: ["accountData"],
    queryFn: () => fetchAccountData(),
    refetchInterval: 432000, //  12 hours in milliseconds
  });

  return { equityQuery, accountQuery };
};

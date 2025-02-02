import { useQuery } from "@tanstack/react-query";
import { getCurrency } from "../api/currency";
import { CurrencyRate } from "../interfaces/currency";

export const useCurrency = () => {
  return useQuery<CurrencyRate[], Error>({
    queryKey: ["currency"],
    queryFn: getCurrency,
  });
};

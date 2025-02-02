import { CurrencyRate, CurrencyResponse } from "../interfaces/currency";
import { axiosInstance } from "./axiosInstance";

export const getCurrency = async (): Promise<CurrencyRate[]> => {
  const response = await axiosInstance.get<CurrencyResponse>(
    `/api/latest?access_key=${import.meta.env.VITE_APP_ACCESS_KEY_API}`
  );

  if (!response.data.success) {
    throw new Error("Failed to fetch currency rates");
  }

  const rates = response.data.rates;

  if (!rates["BRL"]) {
    throw new Error("BRL rate not found in the response");
  }

  // Convert to BRL
  const brlRate = rates["BRL"];
  const convertedRates = Object.entries(rates).map(([code, value]) => ({
    code,
    value: brlRate / value,
    timestamp: response.data.timestamp,
  }));

  return convertedRates;
};

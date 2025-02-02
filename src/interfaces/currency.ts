export interface CurrencyRate {
  code: string;
  value: number;
  timestamp: number;
}

export interface CurrencyResponse {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: { [key: string]: number };
}

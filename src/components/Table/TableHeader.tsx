import { ArrowUpDown } from "lucide-react";
import { CurrencyRate } from "../../interfaces/currency";

interface TableHeaderProps {
  handleSort: (field: keyof CurrencyRate) => void;
}

export const TableHeader = ({ handleSort }: TableHeaderProps) => {
  return (
    <tr>
      {["code", "value", "timestamp"].map((header) => (
        <th
          key={header}
          className="p-4 text-left border-b border-gray-700 bg-gray-800 bg-opacity-50 capitalize"
        >
          <button
            className="flex items-center text-sm font-medium tracking-wider text-gray-400"
            onClick={() => handleSort(header as keyof CurrencyRate)}
          >
            {header === "code"
              ? "Currency"
              : header === "value"
              ? "Value (BRL)"
              : "Date/Time"}

            {header !== "timestamp" && (
              <ArrowUpDown size={16} className="ml-1 cursor-pointer" />
            )}
          </button>
        </th>
      ))}
    </tr>
  );
};

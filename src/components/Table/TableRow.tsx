import { CurrencyRate } from "../../interfaces/currency";
import { formatCurrency } from "../../utils/formatCurrency";

interface TableRowProps {
  data: CurrencyRate;
}

export const TableRow = ({ data }: TableRowProps) => {
  return (
    <tr
      key={data.code}
      className="bg-gray-800 bg-opacity-30 hover:bg-opacity-50 transition-colors"
    >
      <td className="p-4 border-b border-gray-700 font-medium text-gray-200">
        {data.code}
      </td>
      <td className="p-4 border-b border-gray-700 font-medium text-gray-200">
        {formatCurrency(data.value)}
      </td>
      <td className="p-4 border-b border-gray-700 font-medium text-gray-200">
        {new Date(data.timestamp * 1000).toLocaleString("pt-BR")}
      </td>
    </tr>
  );
};

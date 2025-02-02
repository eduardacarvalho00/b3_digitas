import { useMemo, useState } from "react";
import { CurrencyRate } from "../../interfaces/currency";
import { ArrowUpDown } from "lucide-react";
import { TableRow } from "./TableRow";
import { Pagination } from "../Pagination";

interface TableProps {
  data: CurrencyRate[];
}

const ITEMS_PER_PAGE = 6;

export const Table = ({ data }: TableProps) => {
  const [sortField, setSortField] = useState<keyof CurrencyRate>("code");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortField, sortDirection]);

  const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSort = (field: keyof CurrencyRate) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {["code", "value", "timestamp"].map((header) => (
              <th
                key={header}
                className="p-4 text-left border-b border-gray-700 bg-gray-800 bg-opacity-50"
              >
                <button
                  onClick={() => handleSort(header as keyof CurrencyRate)}
                  className="flex items-center text-sm font-medium uppercase tracking-wider text-gray-400"
                >
                  {header === "code"
                    ? "Currency"
                    : header === "value"
                    ? "value (BRL)"
                    : "Date/Time"}

                  {header !== "timestamp" && (
                    <ArrowUpDown size={16} className="ml-1" />
                  )}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row) => (
            <TableRow data={row} />
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

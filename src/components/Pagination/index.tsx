import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  return (
    <div className="flex justify-center gap-2 items-center mt-4">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="p-2 bg-gray-700 cursor-pointer rounded-full disabled:opacity-50  disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        <ChevronLeft size={20} />
      </button>
      <span className="text-gray-400">
        {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="p-2 bg-gray-700 cursor-pointer rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

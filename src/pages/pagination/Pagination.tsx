// components/Pagination.tsx
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

const Pagination = ({ page, totalPages, setPage }: PaginationProps) => {
  return (
    <div className="flex justify-center mt-6 gap-4 items-center">
      <button
        onClick={() => setPage(Math.max(page - 1, 1))}
        disabled={page === 1}
        className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaArrowLeft />
      </button>

      <span className="px-4 py-2 font-medium">{`Page ${page} of ${totalPages}`}</span>

      <button
        onClick={() => setPage(Math.min(page + 1, totalPages))}
        disabled={page === totalPages}
        className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default Pagination;

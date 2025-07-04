import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { BorrowSummaryItem } from "@/types/interface";

import { ImBook } from "react-icons/im";
import { Link } from "react-router-dom";

interface Props {
  item: BorrowSummaryItem;
}

const BorrowSummaryCard = ({ item }: Props) => {
  return (
    <div className="border border-gray-200 rounded-lg bg-[#fcfbfb] p-6 shadow-sm mt-4">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader>
          <div className="group flex items-center justify-center">
            <CardTitle className="flex items-center gap-2 text-center font-bold text-lg transition-colors duration-300 group-hover:text-rose-600">
              <ImBook className="text-sky-600 group-hover:text-rose-600 transition-colors duration-300" />
              {item.book.title}
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-1 text-sm text-gray-700">
          <p className="flex items-center gap-2  font-medium justify-center">
            <span className="text-gray-700 font-bold">ISBN:</span>
            <span className="">{item.book.isbn}</span>
          </p>
          <p className="flex items-center gap-2 text-gray-700  font-medium justify-center">
            <strong>Total Quantity Borrowed:</strong>{" "}
            <span className="text-green-500 font-bold">
              {item.totalQuantity}
            </span>
          </p>
        </CardContent>
        <div className="flex justify-center pb-4">
          <Link
            to={`/books/${item.book.bookId}`}
            state={{ from: location.pathname }}
          >
            <Button
              variant="outline"
              size="sm"
              className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white cursor-pointer"
            >
              Book Details
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default BorrowSummaryCard;

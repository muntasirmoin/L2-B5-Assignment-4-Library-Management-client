import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { BorrowSummaryItem } from "@/redux/api/baseApi";

interface Props {
  item: BorrowSummaryItem;
}

const BorrowSummaryCard = ({ item }: Props) => {
  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader>
        <CardTitle>{item.book.title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-1 text-sm text-gray-700">
        <p>
          <strong>ISBN:</strong>{" "}
          <span className="font-mono">{item.book.isbn}</span>
        </p>
        <p>
          <strong>Total Quantity Borrowed:</strong> {item.totalQuantity}
        </p>
      </CardContent>
    </Card>
  );
};

export default BorrowSummaryCard;

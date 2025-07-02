import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useBorrowBookMutation } from "@/redux/api/baseApi";
export interface IBorrow {
  book: string;
  quantity: number;
  dueDate: Date;
}

const BorrowBook = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: string })?.from || "/books";

  const [borrowBook, { isLoading }] = useBorrowBookMutation();

  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookId) return toast.error("Invalid Book ID");

    try {
      await borrowBook({
        book: bookId,
        quantity,
        dueDate: new Date(dueDate),
      }).unwrap();

      toast.success("Book borrowed successfully");
      navigate(from);
    } catch (err) {
      toast.error(`Failed to borrow book: ${err || "Unknown error"}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-muted">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-center">Borrow Book</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Quantity</label>
              <Input
                type="number"
                min={0}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Due Date</label>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>

            <div className="flex gap-4 pt-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-green-600  hover:bg-green-700 hover:text-white"
              >
                {isLoading ? "Borrowing..." : "Borrow"}
              </Button>
              <Button
                type="button"
                className="flex-1 bg-red-600  hover:bg-red-700 hover:text-white"
                onClick={() => navigate(from)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BorrowBook;

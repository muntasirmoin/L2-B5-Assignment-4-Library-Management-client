import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useDeleteBookMutation } from "@/redux/api/baseApi";
import { DeleteBookCard } from "./deleteBook/DeleteBookCard";
import { toast } from "sonner";
import { useLocation, Link } from "react-router-dom";

export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}

interface BookCardProps {
  book: IBook;
}

export const BookCard = ({ book }: BookCardProps) => {
  console.log("book_id inside card", book);
  const location = useLocation();

  //   delete
  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteBook(id).unwrap();
      toast.success("Book deleted successfully");
    } catch (err) {
      toast.error(`Failed to delete book: ${err || "Unknown error"}`);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader>
        <CardTitle>{book.title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-1 text-sm text-gray-700">
        <p>
          <strong>Author:</strong> {book.author}
        </p>
        <p>
          <strong>Genre:</strong> {book.genre}
        </p>
        <p>
          <strong>ISBN:</strong> {book.isbn}
        </p>
        <p>
          <strong>Copies:</strong> {book.copies}
        </p>
        <p>
          <strong>Availability:</strong>{" "}
          <span className={book.available ? "text-green-600" : "text-red-600"}>
            {book.available ? "Available" : "Not Available"}
          </span>
        </p>
      </CardContent>

      <CardFooter className="flex gap-2 flex-wrap">
        {/* Borrow Button */}
        <Link to={`/borrow/${book._id}`} state={{ from: location.pathname }}>
          <Button variant="outline" size="sm">
            Borrow
          </Button>
        </Link>

        {/* Edit Button */}
        <Link to={`/edit-book/${book._id}`} state={{ from: location.pathname }}>
          <Button variant="outline" size="sm">
            Edit
          </Button>
        </Link>

        {/* Delete Button */}
        <DeleteBookCard book={book} onDelete={handleDelete} />
      </CardFooter>
    </Card>
  );
};

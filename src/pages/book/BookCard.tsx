import { Card, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useDeleteBookMutation } from "@/redux/api/baseApi";
import { DeleteBookCard } from "./deleteBook/DeleteBookCard";
import { toast } from "sonner";
import { useLocation, Link, useNavigate } from "react-router-dom";

import { ImBook } from "react-icons/im";
import { FaPenNib } from "react-icons/fa";
import type { IBook } from "@/types/interface";

interface BookCardProps {
  book: IBook;
}

export const BookCard = ({ book }: BookCardProps) => {
  console.log("book_id inside card", book);
  const location = useLocation();
  const navigate = useNavigate();

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
      <CardContent className="space-y-1 text-sm text-gray-700 pt-0 mt-0">
        {/* title */}
        <div className="group flex items-center justify-center">
          <CardTitle className="flex items-center gap-2 text-center font-bold text-lg transition-colors duration-300 group-hover:text-rose-600">
            <ImBook className="text-sky-600 group-hover:text-rose-600 transition-colors duration-300" />
            {book.title}
          </CardTitle>
        </div>

        <p className="flex items-center text-gray-700 justify-center font-semibold m-2">
          <strong>Author </strong>
          <FaPenNib className="text-green-800" />
          <strong className="text-green-500 hover:text-green-800 transition-colors duration-200 ml-1">
            {book.author}
          </strong>
        </p>

        <p className="flex items-center gap-2 font-bold  justify-center">
          <span className="text-gray-700 font-bold">Genre:</span> {book.genre}
        </p>
        <p className="flex items-center gap-2  font-medium justify-center">
          <span className="text-gray-700 font-bold">ISBN:</span>
          <span className="">{book.isbn}</span>
        </p>

        <p
          className={`flex items-center gap-2 ${
            book.available ? "text-green-600" : "text-red-600"
          } font-medium justify-center`}
        >
          <span className="text-gray-700 font-bold">Copies:</span> {book.copies}
        </p>
        <p
          className={`flex items-center gap-2 text-gray-900 font-medium justify-center`}
        >
          <span className="text-gray-700 font-bold">Availability:</span>{" "}
          <span className={book.available ? "text-green-600" : "text-red-600"}>
            {book.available ? "Available" : "Unavailable"}
          </span>
        </p>
      </CardContent>

      <CardFooter className="flex gap-2 flex-wrap justify-between">
        {/* view button */}
        <Link to={`/books/${book._id}`} state={{ from: location.pathname }}>
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate(`/books/${book._id}`)}
            className="text-teal-700 border-teal-700 hover:bg-teal-600 hover:text-white shadow-md hover:shadow-lg rounded-lg transition-all duration-300 cursor-pointer"
          >
            View
          </Button>
        </Link>
        {/* Borrow Button */}
        {book.copies === 0 ? (
          <Button
            variant="outline"
            disabled
            size="sm"
            className="text-gray-600 border-gray-600 cursor-not-allowed"
          >
            Unavailable
          </Button>
        ) : (
          <Link to={`/borrow/${book._id}`} state={{ from: location.pathname }}>
            <Button
              variant="outline"
              size="sm"
              className="text-green-600 border-green-600 hover:bg-green-700 hover:text-white cursor-pointer"
            >
              Borrow
            </Button>
          </Link>
        )}

        {/* Edit Button */}
        <Link to={`/edit-book/${book._id}`} state={{ from: location.pathname }}>
          <Button
            variant="outline"
            size="sm"
            className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white cursor-pointer"
          >
            Edit
          </Button>
        </Link>

        {/* Delete Button */}
        <DeleteBookCard book={book} onDelete={handleDelete} />
      </CardFooter>
    </Card>
  );
};

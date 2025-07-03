// components/DeleteBookCard.tsx
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import type { IBook } from "../BookCard";

interface DeleteBookCardProps {
  book: IBook;
  onDelete: (id: string) => void;
}

export const DeleteBookCard = ({ book, onDelete }: DeleteBookCardProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          size="sm"
          className="cursor-pointer transition hover:bg-red-900"
        >
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-500">
            Delete Book
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this book?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="bg-muted p-4 rounded-md text-sm space-y-1 border">
          <p>
            <strong>Title:</strong> {book.title}
          </p>
          <p>
            <strong>Author:</strong> {book.author}
          </p>
          <p>
            <strong>ISBN:</strong> {book.isbn}
          </p>
        </div>

        <AlertDialogCancel className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white cursor-pointer">
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction
          onClick={() => onDelete(book._id)}
          className="bg-red  text-red-600 border border-red-600 hover:bg-red-600 hover:text-white cursor-pointer"
        >
          Delete
        </AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
  );
};

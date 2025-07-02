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
          <AlertDialogTitle>Delete Book</AlertDialogTitle>
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

        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={() => onDelete(book._id)}>
          Delete
        </AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
  );
};

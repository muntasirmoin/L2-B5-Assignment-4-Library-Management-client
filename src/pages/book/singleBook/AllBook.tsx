import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDeleteBookMutation, useGetBooksQuery } from "@/redux/api/baseApi";
import { useState } from "react";
import type { IBook } from "../BookCard";
import Pagination from "@/pages/pagination/Pagination";
import { DeleteBookCard } from "../deleteBook/DeleteBookCard";
import { toast } from "sonner";

const AllBook = () => {
  const [page, setPage] = useState(1);
  const limit = 10; // You can adjust this as needed

  const { data, isLoading, isError } = useGetBooksQuery(
    { page, limit },
    {
      pollingInterval: 30000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteBook(id).unwrap();
      toast.success("Book deleted successfully");
    } catch (err) {
      toast.error(`Failed to delete book: ${err || "Unknown error"}`);
    }
  };

  const books = data?.data || [];
  //   const totalBooks = data?.total || 0; // Make sure your API returns total count
  //   const totalPages = Math.ceil(totalBooks / limit);
  const totalPages = data?.meta?.totalPages || 1;

  const navigate = useNavigate();

  if (isLoading) return <p>Loading books...</p>;
  if (isError) return <p>Error loading books.</p>;

  return (
    <>
      <div className="overflow-x-auto">
        <Table className="min-w-[600px] border-t border-b border-gray-300">
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-nowrap border-l border-r border-gray-300 font-extrabold text-2xl text-center bg-gradient-to-r from-blue-400 to-blue-600 text-white">
                Title
              </TableHead>
              <TableHead className="whitespace-nowrap border-l border-r border-gray-300 font-extrabold text-2xl text-center bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white">
                Author
              </TableHead>

              <TableHead className="whitespace-nowrap border-l border-r border-gray-300 font-extrabold text-2xl text-center bg-gradient-to-r from-indigo-400 to-indigo-600 text-white">
                Copies
              </TableHead>

              <TableHead className="whitespace-nowrap border-l border-r border-gray-300 font-extrabold text-2xl text-center bg-gradient-to-r from-orange-400 to-red-500 text-white">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          {/* <TableBody className="text-center">
            {books.map((book: IBook, index: number) => (
              <TableRow
                key={book._id}
                className={`
        
        ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} 
        hover:bg-gray-200
      `}
              >
                <TableCell className="border-1 text-center font-bold text-lg transition-colors ">
                  {book.title}
                </TableCell>
                <TableCell className="border-1 text-center font-bold text-lg transition-colors ">
                  {book.author}
                </TableCell>
                <TableCell
                  className={`border-1 text-center font-bold text-lg transition-colors duration-300 ${
                    book.copies === 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {book.copies}
                </TableCell>
                <TableCell className="flex justify-between gap-2 border-l font-bold text-lg border-r border-gray-300 whitespace-nowrap">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/books/${book._id}`)}
                  >
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/edit-book/${book._id}`)}
                  >
                    Edit
                  </Button>
                  <DeleteBookCard book={book} onDelete={handleDelete} />
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => navigate(`/borrow/${book._id}`)}
                  >
                    Borrow
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody> */}

          <TableBody className="text-center border border-gray-300">
            {books.map((book: IBook, index: number) => (
              <TableRow
                key={book._id}
                className={`
        ${index % 2 === 0 ? "bg-white" : "bg-gray-100"} 
        hover:bg-yellow-100 transition-colors duration-300 cursor-pointer
      `}
              >
                <TableCell className="border-1 border-b border-gray-300 text-center font-extrabold text-xl text-blue-700 transition-colors">
                  {book.title}
                </TableCell>
                <TableCell className="border-1 border-b border-gray-300 text-center font-extrabold text-xl text-orange-600 transition-colors">
                  {book.author}
                </TableCell>
                <TableCell
                  className={`border-1 border-b border-gray-300 text-center font-extrabold text-xl transition-colors duration-300 ${
                    book.copies === 0 ? "text-red-700" : "text-green-700"
                  }`}
                >
                  {book.copies}
                </TableCell>
                <TableCell className="flex justify-between gap-2 border-b border-gray-300 font-bold text-lg whitespace-nowrap px-4 py-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/books/${book._id}`)}
                    className="cursor-pointer transition-transform duration-200 hover:scale-105 hover:bg-blue-100"
                  >
                    View
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate(`/edit-book/${book._id}`)}
                  >
                    Edit
                  </Button>
                  <DeleteBookCard book={book} onDelete={handleDelete} />
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => navigate(`/borrow/${book._id}`)}
                  >
                    Borrow
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Component */}
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </>
  );
};

export default AllBook;

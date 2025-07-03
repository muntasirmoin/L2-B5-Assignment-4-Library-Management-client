import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
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
      <div className="border border-gray-200 bg-[#fcfbfb] p-1 ">
        <div className="text-center mb-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gradient bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text">
            Book Inventory
          </h1>
          <p className="text-sm sm:text-base mt-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text font-medium">
            A simple way to manage and access books.
          </p>
        </div>
        <div className="overflow-x-auto">
          <Table className="min-w-[320px] border-t border-b border-gray-300 w-full">
            <TableHeader>
              <TableRow>
                <TableHead
                  className="whitespace-nowrap border-l border-r border-gray-300 font-extrabold text-center bg-gradient-to-r from-blue-400 to-blue-600 text-white
                       text-sm sm:text-base md:text-2xl px-1 sm:px-3"
                >
                  Title
                </TableHead>
                <TableHead
                  className="whitespace-nowrap border-l border-r border-gray-300 font-extrabold text-center bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white
                       text-sm sm:text-base md:text-2xl px-1 sm:px-3"
                >
                  Author
                </TableHead>
                <TableHead
                  className="whitespace-nowrap border-l border-r border-gray-300 font-extrabold text-center bg-gradient-to-r from-indigo-400 to-indigo-600 text-white
                       text-sm sm:text-base md:text-2xl px-1 sm:px-3"
                >
                  Genre
                </TableHead>
                <TableHead
                  className="whitespace-nowrap border-l border-r border-gray-300 font-extrabold text-center bg-gradient-to-r from-indigo-400 to-indigo-600 text-white
                       text-sm sm:text-base md:text-2xl px-1 sm:px-3"
                >
                  ISBN
                </TableHead>

                <TableHead
                  className="whitespace-nowrap border-l border-r border-gray-300 font-extrabold text-center bg-gradient-to-r from-indigo-400 to-indigo-600 text-white
                       text-sm sm:text-base md:text-2xl px-1 sm:px-3"
                >
                  Copies
                </TableHead>
                <TableHead
                  className="whitespace-nowrap border-l border-r border-gray-300 font-extrabold text-center bg-gradient-to-r from-orange-400 to-red-500 text-white
                       text-sm sm:text-base md:text-2xl px-1 sm:px-3"
                >
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="text-center border border-gray-300">
              {books.map((book: IBook, index: number) => (
                <TableRow
                  key={book._id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-100"
                  } hover:bg-yellow-100 transition-colors duration-300`}
                >
                  <TableCell className="border-1 border-b border-gray-300 text-center font-semibold text-sm sm:text-base md:text-xl px-1 sm:px-3 min-w-0 break-words bg-gradient-to-r from-blue-300 via-indigo-900 to-blue-300 text-transparent bg-clip-text">
                    {book.title}
                  </TableCell>
                  <TableCell className="border-1 border-b border-gray-300 text-center font-semibold text-sm sm:text-base md:text-xl text-orange-600 px-1 sm:px-3 min-w-0 break-words">
                    {book.author}
                  </TableCell>
                  <TableCell className="border-1 border-b border-gray-300 text-center font-normal text-sm sm:text-base md:text-xl px-1 sm:px-3 min-w-0 break-words bg-gradient-to-r from-indigo-600 via-orange-600 to-blue-600 text-transparent bg-clip-text">
                    {book.genre}
                  </TableCell>
                  <TableCell className="border-1 border-b border-gray-300 text-center font-normal text-xs px-1 min-w-0 break-words bg-gradient-to-r from-indigo-600 via-orange-600 to-blue-600 text-transparent bg-clip-text">
                    {book.isbn}
                  </TableCell>
                  <TableCell
                    className={`border-1 border-b border-gray-300 text-center font-extrabold text-sm sm:text-base md:text-xl px-1 sm:px-3 min-w-0 break-words transition-colors duration-300 ${
                      book.copies === 0 ? "text-red-700" : "text-green-700"
                    }`}
                  >
                    {book.copies}
                  </TableCell>
                  <TableCell className="flex flex-wrap justify-between gap-2 border-b border-gray-300 font-bold text-xs sm:text-base whitespace-nowrap px-1 sm:px-3 py-2">
                    <Link
                      to={`/books/${book._id}`}
                      state={{ from: location.pathname }}
                    >
                      <Button
                        size="sm"
                        variant="outline"
                        //   onClick={() => navigate(`/books/${book._id}`)}
                        className="text-teal-700 border-teal-700 hover:bg-teal-600 hover:text-white shadow-md hover:shadow-lg rounded-lg transition-all duration-300 cursor-pointer"
                      >
                        View
                      </Button>
                    </Link>

                    {book.copies === 0 ? (
                      <Button
                        size="sm"
                        variant="outline"
                        disabled
                        className="text-red-600 border-red-600 cursor-not-allowed uppercase px-2 py-1 text-xs"
                      >
                        Unavailable
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-green-600 border-green-600 hover:bg-green-700 hover:text-white cursor-pointer"
                        onClick={() => navigate(`/borrow/${book._id}`)}
                      >
                        Borrow
                      </Button>
                    )}

                    <Button
                      size="sm"
                      variant="outline"
                      className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white cursor-pointer"
                      onClick={() => navigate(`/edit-book/${book._id}`)}
                    >
                      Edit
                    </Button>

                    <DeleteBookCard book={book} onDelete={handleDelete} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Component */}
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>
    </>
  );
};

export default AllBook;

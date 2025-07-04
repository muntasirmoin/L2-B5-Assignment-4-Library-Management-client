import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useBorrowBookMutation, useGetBookQuery } from "@/redux/api/baseApi";

import { FaBookOpen, FaPenNib } from "react-icons/fa";
import { ImBook } from "react-icons/im";
import type { APIError } from "@/types/interface";
import { Helmet } from "react-helmet-async";

const BorrowBook = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: string })?.from || "/books";

  const { data, isError } = useGetBookQuery(bookId, {
    // pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const bookGet = data?.data;
  console.log("book", bookGet);

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

      toast.success("Book Borrowed successfully");
      navigate("/borrow-summary");
    } catch (err) {
      const error = err as APIError;

      const message = error?.data?.message || "Unknown error";
      toast.error(`Failed to borrow book: ${message}`);

      const fieldErrors = error?.data?.error?.errors;
      if (fieldErrors) {
        for (const key in fieldErrors) {
          if (fieldErrors[key]?.message) {
            toast.error(`${key}: ${fieldErrors[key].message}`);
          }
        }
      }
    }
  };

  if (!bookGet) {
    return <p>Loading book details...</p>;
  }
  if (isError || !data?.data)
    return <p className="text-center py-10 text-red-500">Book not found.</p>;

  return (
    <>
      <Helmet>
        <title>Borrow | Book!Nest </title>
      </Helmet>
      <div className="items-stretch bg-muted p-4 flex flex-col md:flex-row justify-center gap-8">
        {/* book info */}
        <div className="flex flex-1 flex-col justify-start items-center p-4 bg-muted w-full md:w-1/2">
          <Card className="w-full max-w-xl flex flex-col max-h-[500px] shadow-lg bg-[#fcfbfb] border border-gray-200">
            <CardHeader className="pb-2 text-center">
              <CardTitle className="text-xl font-bold text-blue-800 flex items-center justify-center gap-2">
                <ImBook className="text-sky-600" />
                {bookGet.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 text-sm text-gray-700">
              <div className="flex items-center justify-center gap-2">
                <strong className="text-indigo-600 flex items-center gap-1">
                  <FaPenNib />
                  Author:
                </strong>
                <span className="hover:text-green-600 transition-colors duration-200 font-medium">
                  {bookGet.author}
                </span>
              </div>

              <div className="text-center px-2 py-2">
                <p>
                  <strong>Genre:</strong> {bookGet.genre}
                </p>
                <p>
                  <strong>ISBN:</strong>{" "}
                  <span className="underline text-gray-800">
                    {bookGet.isbn}
                  </span>
                </p>
              </div>

              <div className="text-center px-2">
                <p>
                  <strong>Copies:</strong> {bookGet.copies}
                </p>
                <p>
                  <strong>Availability:</strong>{" "}
                  <span
                    className={
                      bookGet.available ? "text-green-600" : "text-red-600"
                    }
                  >
                    {bookGet.available ? "Available" : "Unavailable"}
                  </span>
                </p>
              </div>
            </CardContent>
            <div className="flex items-center justify-center gap-2">
              <strong className="text-indigo-600 flex items-center gap-1">
                {/* <FaPenNib /> */}
                Description:
              </strong>
              <span className="hover:text-green-600 transition-colors duration-200 font-medium">
                {bookGet.description}
              </span>
            </div>
          </Card>
        </div>
        {/*  borrow */}
        <div className="flex flex-1 justify-center p-4 bg-muted w-full md:w-1/2 ">
          <Card className="w-full max-w-md flex flex-col max-h-[400px]">
            <CardContent className="">
              <h2 className="text-3xl md:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-blue-500 to-indigo-600 mb-4 flex items-center justify-center gap-2">
                <FaBookOpen />
                Borrow Here
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4 p-0">
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
                {/* Buttons */}
                <div className="flex gap-4 p-0">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-green-600  hover:bg-green-700 hover:text-white cursor-pointer"
                  >
                    {isLoading ? "Borrowing..." : "Borrow"}
                  </Button>
                  <Button
                    type="button"
                    className="flex-1 bg-red-600  hover:bg-red-700 hover:text-white cursor-pointer"
                    onClick={() => navigate(from)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default BorrowBook;

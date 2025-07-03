import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetBookQuery } from "@/redux/api/baseApi";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";

import { ImBook } from "react-icons/im";
import { FaPenNib } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { RiArrowGoBackFill } from "react-icons/ri";
import { Helmet } from "react-helmet-async";

const SingleBookCard = () => {
  const { id } = useParams<{ id: string }>();
  // const location = useLocation();
  const navigate = useNavigate();
  const location = useLocation();

  console.log("pathSingleCard", (location.state as { from?: string })?.from);

  const from = (location.state as { from?: string })?.from || "/books";
  console.log("singleID", id);

  const { data, isLoading, isError } = useGetBookQuery(id);

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (isError || !data?.data)
    return <p className="text-center py-10 text-red-500">Book not found.</p>;

  const book = data.data;

  return (
    <>
      <Helmet>
        <title>Book Info | Book!Nest </title>
      </Helmet>
      <div className=" flex flex-col justify-start items-center p-4 bg-muted">
        <Card className="w-full max-w-xl shadow-lg bg-[#fcfbfb] border border-gray-200">
          <CardHeader className="pb-2 text-center">
            <CardTitle className="text-xl font-bold text-blue-800 flex items-center justify-center gap-2">
              <ImBook className="text-sky-600" />
              {book.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 text-sm text-gray-700">
            <div className="flex items-center justify-center gap-2">
              <strong className="text-indigo-600 flex items-center gap-1">
                <FaPenNib />
                Author:
              </strong>
              <span className="hover:text-green-600 transition-colors duration-200 font-medium">
                {book.author}
              </span>
            </div>

            <div className="flex justify-between px-2">
              <p>
                <strong>Genre:</strong> {book.genre}
              </p>
              <p>
                <strong>ISBN:</strong>{" "}
                <span className="underline text-gray-800">{book.isbn}</span>
              </p>
            </div>

            <div className="flex justify-between px-2">
              <p>
                <strong>Copies:</strong> {book.copies}
              </p>
              <p>
                <strong>Availability:</strong>{" "}
                <span
                  className={book.available ? "text-green-600" : "text-red-600"}
                >
                  {book.available ? "Available" : "Unavailable"}
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
              {book.description}
            </span>
          </div>

          <CardFooter className="flex justify-center mt-4">
            <Button
              onClick={() => navigate(from)}
              variant="outline"
              size="sm"
              className="text-red-600 border-green-600 hover:bg-green-600 hover:text-white cursor-pointer"
            >
              <RiArrowGoBackFill />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default SingleBookCard;

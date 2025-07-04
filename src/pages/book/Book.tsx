import { useGetBooksQuery } from "@/redux/api/baseApi";
import { BookCard } from "./BookCard";
import { useState } from "react";
import Pagination from "../pagination/Pagination";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import Banner from "@/components/banner/Banner";
import { Helmet } from "react-helmet-async";
import type { IBook } from "@/types/interface";

export default function Book() {
  const [page, setPage] = useState(1);
  const limit = 6;

  const { data, isLoading, isError } = useGetBooksQuery(
    { page, limit },
    {
      pollingInterval: 30000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  const totalPages = data?.meta?.totalPages || 1;

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-4">
        {[...Array(3)].map((_, idx) => (
          <Skeleton key={idx} className="h-32 w-full rounded-md" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Could not load books.</AlertDescription>
        </Alert>
      </div>
    );
  }
  return (
    <>
      <Helmet>
        <title>Home | Book!Nest </title>
      </Helmet>
      <Banner />
      <div className="border border-gray-200 rounded-lg bg-[#fcfbfb] p-6 shadow-sm mt-4">
        <h2 className="text-2xl mt-2 sm:text-3xl md:text-4xl font-extrabold text-center bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-transparent bg-clip-text">
          Books are uniquely portable magic!
        </h2>

        <p className="text-xl mb-4 font-bold sm:text-base text-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text mt-1">
          Discover knowledge. Stay organized. Read more.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data?.map((book: IBook) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
        {/* Pagination Controls */}
        <div className="flex justify-center mt-6 gap-4">
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        </div>
      </div>
    </>
  );
}

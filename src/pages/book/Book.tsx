import { useGetBooksQuery } from "@/redux/api/baseApi";
import { BookCard, type IBook } from "./BookCard";
import { useState } from "react";
import Pagination from "../pagination/Pagination";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

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
      <h1 className="text-2xl text-center font-semibold mb-4">Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data?.map((book: IBook) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 gap-4">
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>
    </>
  );
}

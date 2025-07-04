import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useGetBorrowSummaryQuery } from "@/redux/api/baseApi";
import BorrowSummaryCard from "./BorrowSummaryCard";
import { Helmet } from "react-helmet-async";

const BorrowSummary = () => {
  const { data, isLoading, isError } = useGetBorrowSummaryQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  console.log("data", data);
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
          <AlertDescription>Could not load borrow summary.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Borrow Summary | Book!Nest </title>
      </Helmet>
      <div className="border border-gray-200 rounded-lg bg-[#fcfbfb] p-2 shadow-sm ">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h2 className="text-2xl p-2 sm:text-3xl md:text-4xl font-extrabold text-center bg-gradient-to-r from-green-500 via-lime-500 to-emerald-500 text-transparent bg-clip-text">
            Every borrowed book is a new beginning.
          </h2>

          <p className="text-xl font-bold sm:text-base text-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text mt-1">
            Unlock stories, knowledge, and adventures — one book at a time.
          </p>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {data?.data?.map((item, index) => (
              <BorrowSummaryCard key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BorrowSummary;

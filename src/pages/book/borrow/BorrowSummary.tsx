import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useGetBorrowSummaryQuery } from "@/redux/api/baseApi";
import BorrowSummaryCard from "./BorrowSummaryCard";

const BorrowSummary = () => {
  const { data, isLoading, isError } = useGetBorrowSummaryQuery(undefined, {
    // pollingInterval: 30000,
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
    <div className="border border-gray-200 rounded-lg bg-[#fcfbfb] p-6 shadow-sm ">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6 tracking-wide">
          Borrowed Books Summary
        </h2>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {data?.data?.map((item, index) => (
            <BorrowSummaryCard key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BorrowSummary;

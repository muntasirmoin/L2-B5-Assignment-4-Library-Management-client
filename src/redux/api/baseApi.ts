import type { BorrowSummaryItem, IBorrow } from "@/types/interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface BorrowSummaryResponse {
  success: boolean;
  message: string;
  data: BorrowSummaryItem[];
}

export const baseApi = createApi({
  reducerPath: "baseApi",
  // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  // need to update here before live check
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-managment-server-gilt.vercel.app",
  }),
  tagTypes: ["books", "borrow"],
  endpoints: (builder) => ({
    // create a book
    createBook: builder.mutation({
      query: (newBook) => ({
        url: "/books",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["books"],
    }),
    // get book
    getBooks: builder.query({
      query: (params = { page: 1, limit: 10 }) =>
        `/books?page=${params.page}&limit=${params.limit}`,
      providesTags: ["books"],
    }),
    // update book
    updateBook: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["books"],
    }),
    //  get single book
    getBook: builder.query({
      query: (id) => `/books/${id}`,
    }),
    // delete book
    deleteBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),

    // post borrow
    borrowBook: builder.mutation({
      query: (borrowData: IBorrow) => ({
        url: "/borrow",
        method: "POST",
        body: borrowData,
      }),
      invalidatesTags: ["borrow", "books"],
    }),
    // borrow summary

    getBorrowSummary: builder.query<BorrowSummaryResponse, void>({
      query: () => "/borrow",
    }),
  }),
});

export const {
  useCreateBookMutation,
  useGetBooksQuery,
  useUpdateBookMutation,
  useGetBookQuery,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = baseApi;

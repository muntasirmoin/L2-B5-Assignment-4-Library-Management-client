import App from "@/App";
import Book from "@/pages/book/Book";
import BorrowBook from "@/pages/book/borrow/BorrowBook";
import BorrowSummary from "@/pages/book/borrow/BorrowSummary";
import CreateBook from "@/pages/book/createBook/CreateBook";
import EditBookPage from "@/pages/book/editBook/EditBookPage";
import AllBook from "@/pages/book/singleBook/AllBook";
import SingleBookCard from "@/pages/book/singleBook/SingleBookCard";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <div>hello world</div>,
    Component: App,
    children: [
      {
        index: true,

        Component: Book,
      },
      {
        index: true,
        path: "/books",
        Component: AllBook,
      },
      {
        path: "/edit-book/:id",
        Component: EditBookPage,
      },
      {
        path: "/borrow/:bookId",
        Component: BorrowBook,
      },
      {
        path: "/books/:id",
        Component: SingleBookCard,
      },
      {
        path: "/borrow-summary",
        Component: BorrowSummary,
      },
      {
        path: "/create-book",
        Component: CreateBook,
      },
    ],
  },
]);

export default router;

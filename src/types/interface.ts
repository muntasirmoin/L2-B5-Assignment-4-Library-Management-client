export type Genre =
  | "FICTION"
  | "NON_FICTION"
  | "SCIENCE"
  | "HISTORY"
  | "BIOGRAPHY"
  | "FANTASY";

export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}

export interface IBorrow {
  book: string;
  quantity: number;
  dueDate: Date;
}

export interface BorrowSummaryItem {
  totalQuantity: number;
  book: {
    bookId: string;
    title: string;
    isbn: string;
  };
}

export interface APIError {
  status: number;
  data: {
    message?: string;
    error?: {
      errors?: Record<string, { message: string }>;
    };
  };
}

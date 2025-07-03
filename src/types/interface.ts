export type Genre =
  | "FICTION"
  | "NON_FICTION"
  | "SCIENCE"
  | "HISTORY"
  | "BIOGRAPHY"
  | "FANTASY";

export interface APIError {
  status: number;
  data: {
    message?: string;
    error?: {
      errors?: Record<string, { message: string }>;
    };
  };
}

export interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}

export interface BorrowPayload {
  book: string;
  quantity: number;
  dueDate: string; // ISO format
}

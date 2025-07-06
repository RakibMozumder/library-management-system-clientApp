import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  useGetBookQuery,
  useBorrowBookMutation,
} from '../features/books/bookApi';
import { useState } from 'react';

export default function BorrowForm() {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();

  const {
    data: book,
    isLoading,
    isError,
  } = useGetBookQuery(bookId!, { skip: !bookId });

  const [borrowBook, { isLoading: isBorrowing }] = useBorrowBookMutation();
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState('');

  if (isLoading) return <p>Loading…</p>;
  if (isError || !book) return <p className="text-red-600">Book not found.</p>;
  if (!book.available)
    return <p className="text-yellow-600">This book is unavailable.</p>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (quantity < 1 || quantity > book.copies) return;
    await borrowBook({ book: bookId!, quantity, dueDate }).unwrap();
    navigate('/borrow-summary');
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow p-6 rounded-md">
      <h2 className="text-xl font-semibold mb-4">Borrow “{book.title}”</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">
            Quantity <span className="text-xs text-gray-500">(max {book.copies})</span>
          </label>
          <input
            type="number"
            min={1}
            max={book.copies}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Math.min(book.copies, +e.target.value)))}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Due Date</label>
          <input
            type="date"
            required
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={isBorrowing}
            className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {isBorrowing ? 'Borrowing…' : 'Borrow'}
          </button>
          <Link to="/books" className="text-gray-600 hover:underline">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
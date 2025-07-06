import { Link } from "react-router-dom";
import { useBorrowSummaryQuery } from "../features/books/bookApi";

type Row = { title: string; isbn: string; totalQuantity: number };

export default function BorrowSummary() {
  const { data, isLoading, isError } = useBorrowSummaryQuery();

  if (isLoading) return <p>Loading summary…</p>;
  if (isError || !data)
    return <p className="text-red-600">Failed to load summary.</p>;

  return (
    <div className="overflow-x-auto bg-white shadow rounded-md">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h2 className="text-xl font-semibold">Borrow Summary</h2>
        <Link to="/books" className="text-indigo-600 hover:underline">
          ← Back to Books
        </Link>
      </div>
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left font-medium text-gray-600">
              Book Title
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-600">
              ISBN
            </th>
            <th className="px-4 py-2 text-left font-medium text-gray-600">
              Total Borrowed
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((r: Row) => (
            <tr key={r.isbn} className="hover:bg-gray-50">
              <td className="px-4 py-2">{r.title}</td>
              <td className="px-4 py-2">{r.isbn}</td>
              <td className="px-4 py-2 font-semibold">{r.totalQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

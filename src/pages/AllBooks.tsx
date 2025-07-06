import { Link, useNavigate } from 'react-router-dom';
import {
  useGetBooksQuery,
  useDeleteBookMutation,
} from '../features/books/bookApi';

export default function AllBooks() {
  const { data, isLoading, error } = useGetBooksQuery();
  const [deleteBook] = useDeleteBookMutation();
  const navigate = useNavigate();

  if (isLoading) return <p>Loading…</p>;
  if (error)
    return <p className="text-red-600">Failed to load books 🥲</p>;

  return (
    <div className="overflow-x-auto bg-white shadow rounded-md">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            {['Title', 'Author', 'Genre', 'ISBN', 'Copies', 'Avail', 'Actions'].map(
              (h) => (
                <th
                  key={h}
                  className="px-3 py-2 text-left font-medium text-gray-600"
                >
                  {h}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data?.data.map((b) => (
            <tr key={b._id} className="hover:bg-gray-50">
              <td className="px-3 py-2 font-medium">
                <Link
                  to={`/books/${b._id}`}
                  className="text-indigo-600 hover:underline"
                >
                  {b.title}
                </Link>
              </td>
              <td className="px-3 py-2">{b.author}</td>
              <td className="px-3 py-2">{b.genre}</td>
              <td className="px-3 py-2">{b.isbn}</td>
              <td className="px-3 py-2">{b.copies}</td>
              <td className="px-3 py-2">{b.available ? '✅' : '❌'}</td>
              <td className="px-3 py-2 whitespace-nowrap space-x-2">
                <button
                  onClick={() => navigate(`/edit-book/${b._id}`)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteBook(b._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
                <button
                  onClick={() => navigate(`/borrow/${b._id}`)}
                  className="text-green-600 hover:underline"
                >
                  Borrow
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
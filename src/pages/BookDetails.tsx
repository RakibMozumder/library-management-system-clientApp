import { useParams, Link } from 'react-router-dom';
import { useGetBookQuery } from '../features/books/bookApi';
export default function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetBookQuery(id!, { skip: !id });

  if (isLoading) return <p>Loading…</p>;
  if (isError || !data)
    return <p className="text-red-600">Book not found.</p>;

  return (
    <div className="max-w-xl mx-auto bg-white shadow p-6 rounded-md space-y-2">
      <h2 className="text-2xl font-semibold mb-2">{data.title}</h2>
      <p>
        <strong>Author:</strong> {data.author}
      </p>
      <p>
        <strong>Genre:</strong> {data.genre}
      </p>
      <p>
        <strong>ISBN:</strong> {data.isbn}
      </p>
      <p>
        <strong>Copies:</strong> {data.copies}
      </p>
      <p>
        <strong>Status:</strong> {data.available ? 'Available' : 'Unavailable'}
      </p>
      {data.description && <p className="pt-2">{data.description}</p>}
      <div className="pt-4 space-x-3">
        <Link to={`/edit-book/${id}`} className="text-blue-600 hover:underline">
          Edit
        </Link>
        <Link to={`/borrow/${id}`} className="text-green-600 hover:underline">
          Borrow
        </Link>
        <Link to="/books" className="text-gray-600 hover:underline">
          Back
        </Link>
      </div>
    </div>
  );
}
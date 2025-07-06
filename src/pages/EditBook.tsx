import { useParams, useNavigate } from 'react-router-dom';
import {
  useGetBookQuery,
  useUpdateBookMutation,
} from '../features/books/bookApi';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

interface FormState {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
}

export default function EditBook() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading } = useGetBookQuery(id!, { skip: !id });
  const [updateBook, { isLoading: isSaving }] = useUpdateBookMutation();

  const [form, setForm] = useState<FormState>({
    title: '',
    author: '',
    genre: '',
    isbn: '',
    description: '',
    copies: 1,
  });
  useEffect(() => {
    if (data) {
      const { title, author, genre, isbn, description = '', copies } = data;
      setForm({ title, author, genre, isbn, description, copies });
    }
  }, [data]);

  if (isLoading) return <p>Loading…</p>;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: name === 'copies' ? +value : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateBook({ id: id!, body: form }).unwrap();
      toast.success('Book updated!');
      navigate('/books');
    } catch {
      toast.error('Update failed');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white shadow p-6 rounded-md space-y-4"
    >
      {['title', 'author', 'genre', 'isbn'].map((f) => (
        <div key={f}>
          <label className="block mb-1 capitalize font-medium">{f}</label>
          <input
            name={f}
            value={form[f as keyof FormState] as string}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
      ))}

      
      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      
      <div>
        <label className="block mb-1 font-medium">Copies</label>
        <input
          type="number"
          name="copies"
          min={0}
          value={form.copies}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <button
        type="submit"
        disabled={isSaving}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isSaving ? 'Updating…' : 'Update'}
      </button>
    </form>
  );
}

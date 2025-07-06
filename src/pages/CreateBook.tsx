import { useNavigate } from 'react-router-dom';
import { useCreateBookMutation } from '../features/books/bookApi';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  genre: z.string().min(1),
  isbn: z.string().min(1),
  description: z.string().optional(),
  copies: z.number().min(1, 'Must be ≥ 1'),
});
type FormData = z.infer<typeof schema>;

export default function CreateBook() {
  const navigate = useNavigate();
  const [createBook, { isLoading }] = useCreateBookMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { copies: 1 } as any,
  });

  const onSubmit = async (data: FormData) => {
    try {
      await createBook(data).unwrap();
      toast.success('Book added!');
      reset();
      navigate('/books');
    } catch {
      toast.error('Failed to add book');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto bg-white shadow p-6 rounded-md space-y-4"
    >
      {['title', 'author', 'genre', 'isbn'].map((field) => (
        <div key={field}>
          <label className="block mb-1 capitalize font-medium">{field}</label>
          <input
            {...register(field as keyof FormData)}
            className="w-full border px-3 py-2 rounded"
          />
          {errors[field as keyof FormData] && (
            <p className="text-xs text-red-600">
              {errors[field as keyof FormData]?.message as string}
            </p>
          )}
        </div>
      ))}

      {/* description */}
      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          {...register('description')}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      {/* copies */}
      <div>
        <label className="block mb-1 font-medium">Copies</label>
        <input
          type="number"
          {...register('copies', { valueAsNumber: true })}
          className="w-full border px-3 py-2 rounded"
        />
        {errors.copies && (
          <p className="text-xs text-red-600">{errors.copies.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isLoading ? 'Saving…' : 'Save'}
      </button>
    </form>
  );
}

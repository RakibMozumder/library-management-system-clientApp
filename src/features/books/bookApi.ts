import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Book, BorrowPayload } from './types';

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1',
  }),
  tagTypes: ['Book', 'Borrow'],

  endpoints: (builder) => ({
    
    getBooks: builder.query<{ data: Book[] }, void>({
      query: () => '/books',
      providesTags: ['Book'],
    }),

    getBook: builder.query<Book, string>({
      query: (id) => `/books/${id}`,
    }),

    
    createBook: builder.mutation<Book, Partial<Book>>({
      query: (body) => ({
        url: '/books',
        method: 'POST',
        body,
      }),
      
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          bookApi.util.updateQueryData('getBooks', undefined, (draft) => {
            draft.data.push({ ...arg, _id: crypto.randomUUID() } as Book);
          }),
        );
        try {
          await queryFulfilled; 
        } catch {
          patch.undo(); 
        }
      },
      invalidatesTags: ['Book'],
    }),

    updateBook: builder.mutation<Book, { id: string; body: Partial<Book> }>({
      query: ({ id, body }) => ({ url: `/books/${id}`, method: 'PATCH', body }),
      invalidatesTags: ['Book'],
    }),

    deleteBook: builder.mutation<{ _id: string }, string>({
      query: (id) => ({ url: `/books/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Book'],
    }),

    
    borrowBook: builder.mutation<any, BorrowPayload>({
      query: (body) => ({ url: '/borrows', method: 'POST', body }),
      invalidatesTags: ['Book', 'Borrow'],
    }),

    borrowSummary: builder.query<any[], void>({
      query: () => '/borrows/summary',
      providesTags: ['Borrow'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useBorrowSummaryQuery,
} = bookApi;

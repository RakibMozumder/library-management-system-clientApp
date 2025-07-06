# Library Management System Client App

This is the **frontend** for the full-stack **Library Management System** built using:

- **React 18 + TypeScript**
- **Redux Toolkit + RTK Query**
- **Tailwind CSS**
- **Vite**

It connects to a RESTful backend (Node.js + Express + MongoDB) via `RTK Query` to manage books and borrowing operations in a simple public interface.

---

## 🌐 Live Demo

> Deploy this frontend separately on **Vercel**, and connect it to your live backend API.

```env
VITE_API_BASE_URL=https://your-backend-api-url.com/api/v1
```

---

## Features

✅ View All Books\
✅ Add New Book\
✅ Edit / Delete Book\
✅ Borrow Book (with quantity + due date)\
✅ Borrow Summary with aggregation\
✅ Fully Responsive Layout (Tailwind CSS)\
✅ Toast Notifications (react-toastify)\
✅ Optimistic UI Updates via RTK Query

---

## Stack

| Category  | Technology                             |
| --------- | -------------------------------------- |
| Framework | React 18 + Vite                        |
| Language  | TypeScript                             |
| State     | Redux Toolkit + RTK Query              |
| Styling   | Tailwind CSS                           |
| Forms     | React Hook Form + Zod (optional bonus) |

---

🧩 Project Structure

```
src/
├── app/            # Redux store setup
├── components/     # Navbar, Footer, Toast
├── features/
│   └── books/      # RTK Query API + types
├── pages/          # AllBooks, CreateBook, BorrowForm, etc.
└── main.tsx        # App bootstrap
```

---

## Setup & Development

### Prerequisites:

- Node.js ≥ 18
- Backend API already running (locally or on Render)

### 1. Install dependencies:

```bash
npm install
```

### 2. Add `.env` file:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

### 3. Start development server:

```bash
npm run dev
```

Frontend will be served at: [http://localhost:5173](http://localhost:5173)

---

## Scripts

| Script            | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start dev server (Vite)  |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |

---

## Deployment

To deploy this frontend on **Vercel**:

1. Push the App to GitHub
2. Import it into Vercel as a new project
3. Set `VITE_API_BASE_URL` in Vercel's Environment Variables
4. Set Build Command = `npm run build`, Output Directory = `dist`
5. Deploy

---

## License

[MIT](../LICENSE)

---

## Author

Developed by **Rakib**\
[RakibMozumder](https://github.com/RakibMozumder)

---

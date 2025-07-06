
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AllBooks from "./pages/AllBooks";
import BookDetails from "./pages/BookDetails";
import BorrowForm from "./pages/BorrowForm";
import BorrowSummary from "./pages/BorrowSummary";
import CreateBook from "./pages/CreateBook";
import EditBook from "./pages/EditBook";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
       <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Navigate to="/books" replace />} />
          <Route path="/books" element={<AllBooks />} />
          <Route path="/create-book" element={<CreateBook />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/edit-book/:id" element={<EditBook />} />
          <Route path="/borrow/:bookId" element={<BorrowForm />} />
          <Route path="/borrow-summary" element={<BorrowSummary />} />
        </Routes>
      </main>
       <Footer /> 
      <ToastContainer position="top-right" />
    </BrowserRouter>
  );
}


export default App;

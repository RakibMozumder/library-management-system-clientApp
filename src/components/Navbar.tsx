import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkCls   = 'block px-3 py-2 rounded hover:bg-gray-200';
  const activeCls = 'bg-gray-300 font-semibold';

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">

        
        <Link to="/books" className="text-xl font-bold text-indigo-600">
          Library
        </Link>

        
        <button
          className="sm:hidden p-2 text-2xl leading-none"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? '✕' : '☰'}
        </button>

        
        <div className={`${open ? 'block' : 'hidden'} sm:flex gap-2 sm:items-center`}>
          <NavLink
            to="/books"
            onClick={() => setOpen(false)}
            className={({ isActive }) => `${linkCls} ${isActive ? activeCls : ''}`}
          >
            All Books
          </NavLink>

          <NavLink
            to="/create-book"
            onClick={() => setOpen(false)}
            className={({ isActive }) => `${linkCls} ${isActive ? activeCls : ''}`}
          >
            Add Book
          </NavLink>

          <NavLink
            to="/borrow-summary"
            onClick={() => setOpen(false)}
            className={({ isActive }) => `${linkCls} ${isActive ? activeCls : ''}`}
          >
            Borrow Summary
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

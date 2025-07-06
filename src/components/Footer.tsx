import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-12 border-t">
      <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-600 space-y-2">
        <p>
          © {new Date().getFullYear()} Library App – built with ❤️ using React,
          Redux Toolkit Query, Tailwind CSS, and Express + MongoDB.
        </p>
        <p>
          Source code on&nbsp;
          <Link
            to="https://github.com/RakibMozumder"
            target="_blank"
            className="text-indigo-600 hover:underline"
          >
            GitHub
          </Link>
          .  Design inspired by minimalist UI principles.
        </p>
      </div>
    </footer>
  );
}

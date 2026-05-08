import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import * as BooksAPI from "./BooksAPI";
import BookShelves from "./components/BookShelves.jsx";
import BookSearch  from "./components/BookSearch.jsx";

import "./App.css";

const SHELVES = [
  { id: "currentlyReading", title: "Currently Reading" },
  { id: "wantToRead",       title: "Want to Read" },
  { id: "read",             title: "Read" },
];

export default function App() {
  const [books, setBooks]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  // Initial load — pull what's already on the shelves.
  useEffect(() => {
    BooksAPI.getAll()
      .then((b) => setBooks(b ?? []))
      .catch((e) => setError(e.message ?? String(e)))
      .finally(() => setLoading(false));
  }, []);

  // Optimistic shelf change — update local state immediately, fire the
  // API call in the background, and roll back on failure.
  const moveBook = async (book, newShelf) => {
    const prev = books;
    setBooks((cur) => {
      const without = cur.filter((b) => b.id !== book.id);
      return newShelf === "none" ? without : [...without, { ...book, shelf: newShelf }];
    });
    try { await BooksAPI.update(book, newShelf); }
    catch (e) {
      setBooks(prev);
      setError(`Failed to move "${book.title}": ${e.message ?? e}`);
    }
  };

  return (
    <div className="app">
      {error ? (
        <div className="error-banner" role="alert">
          {error} <button onClick={() => setError(null)}>dismiss</button>
        </div>
      ) : null}
      <Routes>
        <Route path="/"        element={<BookShelves books={books} loading={loading} shelves={SHELVES} onMove={moveBook} />} />
        <Route path="/search"  element={<BookSearch myBooks={books} onMove={moveBook} />} />
        <Route path="*"        element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

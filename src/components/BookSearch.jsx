import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import * as BooksAPI from "../BooksAPI";
import Book from "./Book.jsx";

export default function BookSearch({ myBooks, onMove }) {
  const [query, setQuery]   = useState("");
  const [results, setRes]   = useState([]);
  const [loading, setLd]    = useState(false);
  const reqId               = useRef(0);

  // Build a quick id → shelf lookup so we can reflect existing shelf
  // assignment even though search results come without a `shelf` field.
  const shelfById = Object.fromEntries(myBooks.map((b) => [b.id, b.shelf]));

  // Debounced search effect
  useEffect(() => {
    const q = query.trim();
    if (!q) { setRes([]); setLd(false); return; }
    setLd(true);
    const id = ++reqId.current;
    const t  = setTimeout(() => {
      BooksAPI.search(q, 20)
        .then((books) => {
          if (id !== reqId.current) return;        // stale
          if (!Array.isArray(books)) setRes([]);   // API returns {error:...} for bad queries
          else                       setRes(books);
        })
        .catch(() => {
          if (id === reqId.current) setRes([]);
        })
        .finally(() => {
          if (id === reqId.current) setLd(false);
        });
    }, 250);
    return () => clearTimeout(t);
  }, [query]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">Close</Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>
      </div>
      <div className="search-books-results">
        {loading && <p className="loading">Searching…</p>}
        {!loading && query && results.length === 0 && (
          <p className="loading">No books match "{query}". Try another query.</p>
        )}
        <ol className="books-grid">
          {results.map((b) => (
            <Book
              key={b.id}
              book={b}
              shelf={shelfById[b.id] ?? "none"}
              onMove={onMove}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}

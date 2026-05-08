import { Link } from "react-router-dom";
import Bookshelf from "./Bookshelf.jsx";

export default function BookShelves({ books, loading, shelves, onMove }) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        {loading ? (
          <p className="loading">Loading your shelves…</p>
        ) : (
          <div>
            {shelves.map(({ id, title }) => (
              <Bookshelf
                key={id}
                title={title}
                books={books.filter((b) => b.shelf === id)}
                onMove={onMove}
              />
            ))}
          </div>
        )}
      </div>
      <div className="open-search">
        <Link to="/search" aria-label="Add a book">Add a book</Link>
      </div>
    </div>
  );
}

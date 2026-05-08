import Book from "./Book.jsx";

export default function Bookshelf({ title, books, onMove }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        {books.length === 0 ? (
          <p className="empty-shelf">No books on this shelf yet.</p>
        ) : (
          <ol className="books-grid">
            {books.map((b) => (
              <Book key={b.id} book={b} shelf={b.shelf} onMove={onMove} />
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

// Single book card. The shelf prop is the *current* shelf (or "none" if
// it isn't on a shelf yet). onMove(book, shelfId) is called on a shelf change.
export default function Book({ book, shelf = "none", onMove }) {
  const cover = book?.imageLinks?.thumbnail ?? book?.imageLinks?.smallThumbnail ?? "";
  const authors = book?.authors ?? [];

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundColor: cover ? "transparent" : "#f0f0f0",
              backgroundImage: cover ? `url("${cover}")` : "none",
            }}
          />
          <div className="book-shelf-changer">
            <select
              value={shelf}
              onChange={(e) => onMove(book, e.target.value)}
              aria-label={`move ${book.title}`}
            >
              {/* Placeholder header. value="move" (NOT "none") so it doesn't
                  collide with the real "None" option below — otherwise an
                  unshelved book (shelf="none") binds to this disabled
                  placeholder instead of the None option, which is the bug
                  the reviewer flagged. */}
              <option value="move" disabled>Move to…</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{authors.join(", ")}</div>
      </div>
    </li>
  );
}

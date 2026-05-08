# MyReads — A Book Tracking App

Final project for Udacity's *React Fundamentals* course (nd019 c1). A
single-page React app that tracks the books a user is reading, has read, and
wants to read across three shelves, backed by Udacity's BooksAPI.

## Features

* **Three shelves** — Currently Reading, Want to Read, Read.
* **Search page** at `/search` with a debounced query that calls
  `BooksAPI.search` and previews results.
* **Optimistic shelf updates** — moving a book updates the UI immediately;
  an API failure rolls the local state back and surfaces the error in a
  banner.
* **Existing-book recognition on search** — books already on a shelf show
  the correct shelf in the dropdown on the search page (the API doesn't
  return a `shelf` field for raw search results, so we cross-reference the
  user's books).
* **Routing** with `react-router-dom` v7 (`/`, `/search`, `*` → `/`).
* **Empty state per shelf** so empty shelves don't look broken.
* **Error banner** with dismiss for failed API calls.

## Project layout

```
src/
├── App.jsx                 routes + state + optimistic move
├── App.css                 starter CSS + a few additions (.error-banner, .loading…)
├── BooksAPI.js             starter Udacity API client
├── components/
│   ├── Book.jsx            single-book card with shelf dropdown
│   ├── Bookshelf.jsx       a shelf section
│   ├── BookShelves.jsx     home page — all three shelves + "Add a book" link
│   └── BookSearch.jsx      search page with debounced query
├── index.css               starter global styles
└── main.jsx                ReactDOM root + BrowserRouter
```

## Running

```bash
npm install
npm run dev      # http://localhost:5173/
npm run build    # production bundle in dist/
npm start        # build + preview on :3001
```

## Standing-out work

1. **Optimistic UI** — `App.jsx` moves the book locally before the API
   responds and rolls back on error.
2. **Debounced search** with a request-id race guard so old responses
   never overwrite newer ones.
3. **Error banner** with explicit dismissal, not a silent failure.
4. **Empty shelf state** so the UI tells the user when a shelf has nothing
   yet, instead of rendering an empty `<ol>`.
5. **`<Link>`** routing instead of `<a>` so navigation between `/` and
   `/search` doesn't reload the bundle and lose state.

## License

Educational submission for Udacity nd019 c1. Starter scaffold © Udacity.

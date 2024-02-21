import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("https://reactnd-books-api.udacity.com/books", {
      headers: { 'Authorization': 'whatever-you-want' }
    })
    .then((response) => {
      setBooks(response.data.books);
      setLoading(false);
    })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        setError('404 - Not Found');
        console.log(setError)
      } else {
        setError('An error occurred while fetching data');
        console.log(setError)
      }
      setLoading(false);
    });
    }, []);
  return (
    <div className="App">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {books.map((books, index) => (
        <div key={index}>
          <h1>{books.title}</h1>
          <img src={books.imageLinks.smallThumbnail} alt={books.title} />
          <p>{books.description}</p>
          <p>Authors: {books.authors.join(', ')}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;

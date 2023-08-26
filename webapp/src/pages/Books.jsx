import React, {useState, useEffect} from 'react'
import axios from 'axios'

export function Books() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    const fetchAllBooks = async() => {
      try {
        const response = await axios.get("http://localhost:8800/books")
        setBooks(response.data)
      } catch(err) {
        console.log(err)
      }
    }
    fetchAllBooks()
  }, [])

  if (books == []) return <div>Loading...</div>

  return (
    <div>
      <h1>Lotsa Books</h1>
      <div className="books">
        {
          books.map(book => (
            <div className="book" key={book.id}>
              {book.title}
            </div>
          ))
        }
      </div>
    </div>
  )
}
import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { ADD_BOOK, UPDATE_BOOK } from '../GraphQL/Mutations';
import { useParams } from 'react-router-dom';
import { GET_BOOK_BY_ID } from '../GraphQL/Queries';

const EditBook = () => {
  const { id } = useParams()
  
  const { data } = useQuery(GET_BOOK_BY_ID, {
    variables: {
      id: id
    }
  })
  const [book, setBook] = useState({
    id: id,
    title: '',
    author: '',
    desc: '',
    price: 0.00,
    pages: 0,
  });


  useEffect(() => {
    if (data) setBook(data.getBook)
  }, [data])

  const [updateBook, { loading, error }] = useMutation(UPDATE_BOOK);

  const onInputChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const bookWithNumbers = {
        ...book,
        price: parseFloat(book.price),
        pages: parseInt(book.pages),
      };
      const { __typename, ...cleanedBookInput } = bookWithNumbers;
      console.log(cleanedBookInput)

      await updateBook({
        variables: {
          book: cleanedBookInput,
        },
      });

      window.location.replace("/")
    } catch (error) {
      console.error('Error submitting the book:', error);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)} className="form">
        <h1 className='center'>Edit Book</h1>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={book.title}
          onChange={(e) => {
            onInputChange(e);
          }}
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={book.author}
          onChange={(e) => {
            onInputChange(e);
          }}
        />
        <input
          type="text"
          name="desc"
          placeholder="Description"
          value={book.desc}
          onChange={(e) => {
            onInputChange(e);
          }}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={book.price}
          onChange={(e) => {
            onInputChange(e);
          }}
        />
        <input
          type="number"
          name="pages"
          placeholder="Pages"
          value={book.pages}
          onChange={(e) => {
            onInputChange(e);
          }}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Book'}
        </button>

        {error && <p>Error: {error.message}</p>}
      </form>
    </div>
  );
}

export default EditBook


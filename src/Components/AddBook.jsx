import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { ADD_BOOK } from '../GraphQL/Mutations';

const AddBook = () => {
    const [book, setBook] = useState({
        title: '',
        author: '',
        desc: '',
        price: 0.00,
        pages: 0,
    });

    const [createBook, { loading, error }] = useMutation(ADD_BOOK);

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

            await createBook({
                variables: {
                    bookReq: bookWithNumbers,
                },
            });

            setBook({
                title: '',
                author: '',
                desc: '',
                price: 0.0,
                pages: 0,
            });

            window.location.replace("/")
        } catch (error) {
            console.error('Error submitting the book:', error);
        }
    };

    return (
        <div>
            <form onSubmit={(e) => onSubmit(e)} className="form">
            <h1 className='center'>Add Book</h1>
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
                    {loading ? 'Adding...' : 'Add Book'}
                </button>

                {error && <p>Error: {error.message}</p>}
            </form>
        </div>
    );
};

export default AddBook;

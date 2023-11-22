import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { GET_BOOK_BY_ID } from '../GraphQL/Queries';

const ViewBook = () => {
    const { id } = useParams()
    const [book, setBook] = useState({});

    const { error, loading, data } = useQuery(GET_BOOK_BY_ID, {
        variables: {
            id: id
        }
    })

    useEffect(() => {
        if (data) setBook(data.getBook)
    }, [data])

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div class="book-details-container">
            <div className='imgbook'>
                <img src="https://picsum.photos/250/350" alt="Book Cover" />
            </div>
            <div class="book-info">
                <h1>{book.title}</h1>
                <p><b className='title'>Author:</b> {book.author}</p>
                <p><b className='title'>Description:</b> {book.desc}</p>
                <div className='book-info-div'>
                    <p className='book-info-cards'>
                        <b className='title'>Price:</b> ₹ {book.price}/-
                    </p>
                    <p className='book-info-cards'>
                        <b className='title'>Pages:</b> {book.pages}
                    </p>
                </div>

            </div>
        </div>
    )
}

export default ViewBook
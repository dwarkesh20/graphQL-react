import { gql } from "@apollo/client";

export const ADD_BOOK = gql`
    mutation CreateBook($bookReq: BookReq!){
        createBook(bookReq: $bookReq) {
            id
            title
            author
            desc
            price
            pages
        }
    }
`
export const UPDATE_BOOK = gql`
    mutation UpdateBook($book: BookInp!){
        updateBook(book: $book) {
            id
            title
            author
            desc
            price
            pages
        }
    }
`
export const DELETE_BOOK = gql`
mutation deleteBook($id: String!) {
  deleteBook(id: $id)
}
`;


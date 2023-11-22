import { gql } from "@apollo/client";

export const LOAD_BOOKS = gql`
query{
    allBooks{
        id
        title
        price
    }
}`


export const GET_BOOK_BY_ID = gql`
query GetBook($id: String!){
    getBook(id: $id){
        id
        title
        desc
        price
        pages
        author
    }
}`


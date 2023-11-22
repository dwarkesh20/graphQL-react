import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, HttpLink, from } from '@apollo/client';
import { ErrorLink, onError } from '@apollo/client/link/error'
import GetBooks from './Components/GetBooks';
import Header from './Components/Header';
import { Route, Routes } from 'react-router-dom';
import AddBook from './Components/AddBook';
import EditBook from './Components/EditBook';
import ViewBook from './Components/ViewBook';

const errorLink = new onError(({ graphqlErrors, networkError})=>{
  if(graphqlErrors){
    graphqlErrors.map(({message, location, path})=>{
      alert(`GraphQL Error, ${message}`)
    })
  }
})

const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:8080/graphql" })
])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
})

function App() {
  return <ApolloProvider client={client}>
    <Header/>
    <Routes>
      <Route path='/' element={<GetBooks/>}></Route>
      <Route path='/viewbook/:id' element={<ViewBook/>}></Route>
      <Route path='/addbook' element={<AddBook/>}></Route>
      <Route path='/editbook/:id' element={<EditBook/>}></Route>
    </Routes>
    
  </ApolloProvider>;
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  
  HttpLink,
  from
} from "@apollo/client";
import {onError } from '@apollo/client/link/error' 
import { GraphQLError } from 'graphql';


const errorLink = onError(({graphQLErrors, networkErrors})=>{
  if(graphQLErrors){
    // GraphQLError.map(({message, location, path})=>{
      console.log(graphQLErrors)
    // })
  }
})
// apollo client setup
const client = new ApolloClient({
  link: from([
    errorLink,
    new HttpLink({
      uri: 'http://localhost:4000/graphql'})
  ]),
  // uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(); 

import React,{useEffect} from 'react'
import { useQuery } from '@apollo/client'


import gql from 'graphql-tag'

const getBookQuery = gql`
query getBookQuery{
    books{
        name
        id
    }
}
`
const BookList = () => {
    const { data, loading, error  } = useQuery(getBookQuery,{variables: {}, notifyOnNetworkStatusChange: true})
        

    console.log(loading)
    console.log(data)
    console.log(error)

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
  
    return (
        <div>
            <ul id="book-list">
                {data.books.map(book=>
                <li key={book.id}>{book.name}</li>
                    )}
                
            </ul>
            
        </div>
    )
}

export default BookList

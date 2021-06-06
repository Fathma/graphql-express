import React, {useState} from 'react'
import { useQuery, useMutation } from '@apollo/client'


import gql from 'graphql-tag'

const getBookQuery = gql`
query getAuthorQuery{
    authors{
        name
        id
    }
}`

const addBookQuery = gql`
mutation addBookQuery{
    addBook{
        name
        genre
        authorId
    }
}`


export const addBookMutation = gql`
    mutation addBook($name: String!, $genre: String!, $authorId: ID!) {
        addBook(name: $name, genre: $genre, authorId: $authorId) {
            name 
            genre
        }
    } 
    
`
const AddBook = () => {
    const [name, setname] = useState("")
    const [genre, setgenre] = useState("")
    const [authorId, setauthorId] = useState("")

    const { data, loading, error  } = useQuery(getBookQuery,{variables:{}, notifyOnNetworkStatusChange: true})
    
    const [addBook,{t_data_}] = useMutation(addBookMutation)

    console.log(loading)
    console.log(data)
    console.log(error)
    const submit=async e=>{
        e.preventDefault()
        let variables ={
            name,
            genre,
            authorId
        }
        // addBook({variables})
        addBook({variables: variables})
        console.log(t_data_)

    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
        <div>
            <form onSubmit={e=>submit(e)}>
                <input placeholder='name' type='text' onChange={e=> setname(e.target.value)}/>
                <input placeholder='genre' type='text'  onChange={e=> setgenre(e.target.value)}/>
                <select  onChange={e=> setauthorId(e.target.value)}>
                    {data.authors.map(author=>
                    <option value={author.id}>{author.name}</option>
                        
                        )}
                </select>
                <button  type="submit">+</button>
            </form>
        </div>
    )
}

export default AddBook

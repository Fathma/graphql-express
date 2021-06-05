const graphql = require('graphql')
const _ = require('lodash')
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql


// dummy data
var books =[
    {name: "Name of the Wind", genre:'Fantasy', id:'1', authorId: "1"},
    {name: "The Final Empire", genre:'fantasy', id:'2', authorId: "2"},
    {name: "the long earth", genre:'Sci-fi', id:'3',authorId: "3"},
    {name: "Name of the Wind1", genre:'Fantasy', id:'1', authorId: "2"},
    {name: "The Final Empire1", genre:'fantasy', id:'2', authorId: "3"},
    {name: "the long earth1", genre:'Sci-fi', id:'3',authorId: "3"}
]

var authors = [
    {name: 'prick ', age: 44, id:'1'}, 
    {name: 'brandon', age: 42, id:'2'},
    {name: 'terry', age: 66, id:'3'}
]

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields:()=>({
        id: {type: GraphQLID},
        name:{type: GraphQLString},
        age:{type: graphql.GraphQLInt},
        books:{
            type:new GraphQLList(BookType),
            resolve(parent, args){
                return _.filter(books, {authorId: parent.id})
            }
        }

    })
})

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields:()=>({
        id: {type: GraphQLID},
        name:{type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                return _.find(authors, {id: parent.authorId})
            }
        }
    })
})



const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        book:{
            type: BookType,
            args: { id: {type: GraphQLID}},
            resolve(parent, args){
                // code to get data form db/ other source
                return _.find(books, { id: args.id })
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type: GraphQLID}},
            resolve(parent, args){
                return _.find(books, {id: args.id})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})
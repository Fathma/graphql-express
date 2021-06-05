const graphql = require('graphql')
const _ = require('lodash')
const { GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql


// dummy data
var books =[
    {name: "Name of the Wind", genre:'Fantasy', id:'1'},
    {name: "The Final Empire", genre:'fantasy', id:'2'},
    {name: "the long earth", genre:'Sci-fi', id:'3'}
]
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields:()=>({
        id: {type: GraphQLString},
        name:{type: GraphQLString},
        genre: {type: GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        book:{
            type: BookType,
            args: { id: {type: GraphQLString}},
            resolve(parent, args){
                // code to get data form db/ other source
                return _.find(books, { id: args.id })
            }
        },
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})
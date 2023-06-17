import Fastify from 'fastify'
import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql'
// yarn add fastify
import { createHandler } from 'graphql-http/lib/use/fastify'

const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    todos: { type: TodoType },
  }),
})

const TodoType = new GraphQLObjectType({
  name: 'Todo',
  fields: () => ({
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    owner: { type: UserType },
    watchers: { type: new GraphQLList(UserType) },
  }),
})

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      me: {
        type: UserType,
        resolve: () => ({
          name: 'John Cena',
          age: 30,
          todos: [],
        }),
      },
    }),
  }),
})

// Create a fastify instance serving all methods on `/graphql`
// where the GraphQL over HTTP fastify request handler is
const fastify = Fastify()
fastify.all('/graphql', createHandler({ schema }))

fastify.listen({ port: 4000, host: '0.0.0.0' })
console.log('Listening to port 4000')

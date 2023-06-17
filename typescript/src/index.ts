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

function createUser() {
  return {
    name: 'John Cena',
    age: 30,
  }
}

const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    todos: {
      type: new GraphQLList(TodoType),
      resolve() {
        const todos = []
        for (let i = 0; i < 15; i++) {
          todos.push(createTodo())
        }

        return todos
      },
    },
  }),
})

function createTodo() {
  return {
    title: 'Lorem ipsum dolor sit amet',
    description:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
  }
}

const TodoType = new GraphQLObjectType({
  name: 'Todo',
  fields: () => ({
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    owner: {
      type: UserType,
      resolve: createUser,
    },
    watchers: {
      type: new GraphQLList(UserType),
      resolve() {
        const watchers = []
        for (let i = 0; i < 5; i++) {
          watchers.push(createUser())
        }

        return watchers
      },
    },
  }),
})

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      me: {
        type: UserType,
        resolve() {
          return {
            name: 'John Cena',
            age: 30,
            todos: [],
          }
        },
      },
      todos: {
        type: new GraphQLList(TodoType),
        resolve() {
          const todos = []
          for (let i = 0; i < 15; i++) {
            todos.push(createTodo())
          }

          return todos
        },
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

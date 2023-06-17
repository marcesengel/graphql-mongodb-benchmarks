import http from 'k6/http'

export const options = {
  vus: 150,
  duration: '30s',
  ext: {
    loadimpact: {
      // Project: Default project
      projectID: 3646240,
      // Test runs with the same name groups test runs together
      name: 'Rust GraphQL query me',
      distribution: {
        main: { loadZone: 'amazon:de:frankfurt', percent: 100 },
      },
    },
  },
}

const meQuery = `
  query {
    me {
        name
    }
  }
`

const todosQuery = `
  query {
    todos {
      title
      description
      watchers {
        name
      }
    }
  }
`

const queries = [
  { rand: 0.3, query: todosQuery },
  { rand: 1, query: meQuery },
]

export default function () {
  const rand = Math.random()
  const query = queries.find((q) => rand <= q.rand).query

  http.post('http://194.233.171.14:4000/graphql', JSON.stringify({ query }), {
    'Content-Type': 'application/json',
  })
}

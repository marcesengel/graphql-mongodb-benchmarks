import http from 'k6/http'

const meQuery = `
  query {
    me {
        name
    }
  }
`

export default function () {
  http.post(
    'http://localhost:4000/graphql',
    JSON.stringify({ query: meQuery }),
    { 'Content-Type': 'application/json' },
  )
}

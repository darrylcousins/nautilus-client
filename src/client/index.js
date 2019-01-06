/**
 * @file Provides a `client` for graphql queries
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import gql from 'graphql-tag'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { createHttpLink } from 'apollo-link-http'
import { withClientState } from 'apollo-link-state'
import { InMemoryCache } from 'apollo-cache-inmemory'

const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`

const resolvers = {
}

const cache = new InMemoryCache().restore(window.__APOLLO_STATE__)

export default new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',
    headers: {
      authorization: localStorage.getItem('token'),
      'client-name': 'Space Explorer [web]',
      'client-version': '1.0.0',
    },
  }),
  initializers: {
    isLoggedIn: () => !!localStorage.getItem('token')
  },
  resolvers,
  typeDefs,
});

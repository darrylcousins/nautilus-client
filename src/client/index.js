/**
 * @file Provides a `client` for graphql queries
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { withClientState } from 'apollo-link-state'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { ACCOUNT_ID } from '../graphql/account'

const AccountType = "account"

const typeDefs = `
  type Account {
    id: String
    firstname: String
    lastname: String
    email: String
  }
  type Context {
    content_id: String
    content_type: String
  }
  type Query {
    account: Account
    context: Context
  }
`

export const defaults = {
  account: {
    id: ACCOUNT_ID,
    __typename: AccountType,
  }
}

export const resolvers = {
  Mutation: {
    account: (_, { id }, { cache }) => {
      cache.writeData({
        data: {
          account: {
            id: id,
            __typename: AccountType,
          }
        }
      })
      return null
    },
  }
}

const cache = new InMemoryCache().restore(window.__APOLLO_STATE__)

const stateLink = withClientState({ resolvers, cache, defaults, typeDefs })

const httpLink = createHttpLink({
  uri: 'http://127.0.0.1:4000/graphql'
})

const authLink = setContext((request, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
      'client-name': 'Nautilus Client [web]',
      'client-version': '0.1.0'
    }
  }
})

export default new ApolloClient({
  link: ApolloLink.from([stateLink, authLink.concat(httpLink)]),
  cache: cache,
})

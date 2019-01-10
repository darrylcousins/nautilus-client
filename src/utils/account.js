/**
 * @file Provides a `Account` constants
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import gql from 'graphql-tag'

// Stored as default account in this session
export const ACCOUNT_ID = "5f07f9a1-cf0d-4a21-85e4-104ea874133a"

/* Used to query local state account id
 * For example:
 * <Query query={ GET_ACCOUNT }></Query>
 */
export const GET_ACCOUNT = gql`
  {
    account @client {
      id
    }
  }
`

/**
 * @file Provides a `Glossary` graphql queries
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import gql from 'graphql-tag'

export const GET_GLOSSARY_ENTRY = gql`
  query GetGlossaryEntry($id: String!) {
    glossaryentry(id: $id)   {
        id
        account
        title
        byline
        content
      }
    }
`

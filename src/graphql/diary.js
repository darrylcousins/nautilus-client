/**
 * @file Provides a `Diary` graphql queries
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import gql from 'graphql-tag'

export const GET_DIARY_ENTRY = gql`
  query GetDiaryEntry($id: String!) {
    diaryentry(id: $id)   {
        id
        account
        date
        title
        byline
        content
      }
    }
`

/**
 * @file Provides a `DiaryEntries` page view
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Loading from './components/loading'
import Error from './components/error'
import { ACCOUNT_ID } from '../utils/account'

const GET_DIARY = gql`
  query GetDiaryEntries($account: String!) {
    diaryentries(account: $account)   {
        id
        date
        title
        byline
        content
      }
    }
`

export default (props) =>
  <Query query={ GET_DIARY } variables={{ ACCOUNT_ID  }}>
    {({ data, loading, error }) => {
      if (loading) return <Loading />
      if (error) return <Error />

      return (
        <Fragment>
          {data.diaryentries &&
            data.diaryentries.map(entry => (
              <ul key={ entry.id }>
                <li>{ entry.id }</li>
                <li>{ entry.date }</li>
                <li>{ entry.title }</li>
                <li>{ entry.byline }</li>
                <li>{ entry.content }</li>
              </ul>
          ))}
        </Fragment>
      )
    }}
  </Query>


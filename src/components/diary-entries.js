/**
 * @file Provides a `DiaryEntries` page view
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Loading from './loading'
import Error from './error'
import { STORE_DATE_FORMAT, HTML_DATE_FORMAT  } from './../utils/date'
import { ACCOUNT_ID } from '../utils/account'

import Input from './form/input.js'

const GET_DIARY = gql`
  query GetDiaryEntries($ACCOUNT_ID: String!) {
    diaryentries(account: $ACCOUNT_ID)   {
        id
        date
        title
        byline
        content
      }
    }
`

export default() =>
  <Query query={ GET_DIARY } variables={{ ACCOUNT_ID  }}>
    {({ data, loading, error }) => {
      if (loading) return <Loading />
      if (error) return <Error />

      return (
        <Fragment>
          <button type="button"
            className="pointer br2 ba b--dark-green bg-green white pa2 ml1 mv1 bg-animate hover-bg-dark-green border-box"
          >New</button>
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
          <button type="button"
                  className="pointer br2 ba b--navy bg-dark-blue white pa2 ml1 mv1 bg-animate hover-bg-navy border-box"
          >Edit</button>
        </Fragment>
      )
    }}
  </Query>


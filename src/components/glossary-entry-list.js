/**
 * @file Provides a `GlossaryEntries` page view
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import moment from 'moment'

import Loading from './loading'
import Error from './error'
import { STORE_DATE_FORMAT, HTML_DATE_FORMAT  } from './../utils/date'
import { ACCOUNT_ID } from '../utils/account'

const GET_GLOSSARY = gql`
  query GetGlossaryEntries($ACCOUNT_ID: String!) {
    glossaryentries(account: $ACCOUNT_ID)   {
        id
        title
        byline
        content
      }
    }
`

// development testing
const date = moment()

export default() =>
  <Query query={ GET_GLOSSARY } variables={{ ACCOUNT_ID }}>
    {({ data, loading, error }) => {
      if (loading) return <Loading />
      if (error) return <Error />

      console.log(date)
      console.log(moment(date).format(STORE_DATE_FORMAT))
      console.log(moment(date).format(HTML_DATE_FORMAT))

      return (
        <Fragment>
          {data.glossaryentries &&
            data.glossaryentries.map(entry => (
              <ul key={ entry.id }>
                <li>{ entry.id }</li>
                <li>{ entry.title }</li>
                <li>{ entry.byline }</li>
                <li>{ entry.content }</li>
              </ul>
          ))}
        </Fragment>
      )
    }}
  </Query>

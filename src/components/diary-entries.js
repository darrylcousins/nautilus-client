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
import { GET_ACCOUNT } from '../utils/account'

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

/**
 * Best way I could figure out to nest the local state account query for
 * account to use in entry query
 */

export default() =>
  <Query query={ GET_ACCOUNT }>
    {({ data, loading, error }) => {
      if (loading) return <Loading />
      if (error) return <Error />
      return (
        <DiaryEntries account={ { "account": data.account.id } } />
      )
    }}
  </Query>

class DiaryEntries extends React.Component {

  render() {
    return (
      <Query query={ GET_DIARY } variables={ this.props.account }>
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
                    <li>
                      <Link
                        className="pointer br2 ba b--navy bg-dark-blue white pa2 ml1 mv1 bg-animate hover-bg-navy border-box"
                        to={ `/diary/${ entry.id }` }>Detail</Link>
                    </li>
                    <li>
                      <Link
                        className="pointer br2 ba b--navy bg-dark-blue white pa2 ml1 mv1 bg-animate hover-bg-navy border-box"
                        to={ `/diary/${ entry.id }/edit` }>Edit</Link>
                    </li>
                  </ul>
              ))}
            </Fragment>
          )
        }}
      </Query>
    )
  }

}

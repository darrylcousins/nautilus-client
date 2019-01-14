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
import { ListStyle } from '../utils/style'
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
              <ul className="list" style={ ListStyle }>
                <li className="dib mr2 fr">
                  <Link
                    className="f6 f5-ns b db link dim orange"
                    to={ `/diary/` }>Create entry</Link>
                </li>
              </ul>
              <h1 className="navy">Diary List</h1>
              {data.diaryentries &&
                data.diaryentries.map(entry => (
                  <Fragment>
                    <h3 className="navy">{ entry.title }</h3>
                    <ul key={ entry.id }>
                      <li>{ entry.id }</li>
                      <li>{ entry.date }</li>
                      <li>{ entry.byline }</li>
                      <li>{ entry.content }</li>
                    </ul>
                    <ul className="list fr" style={ ListStyle }>
                      <li className="dib mr2">
                        <Link
                          className="f6 f5-ns b db link dim navy"
                          to={ `/diary/${ entry.id }` }>Full entry</Link>
                      </li>
                      <li className="dib mr2">
                        <Link
                          className="f6 f5-ns b db link dim dark-green"
                          to={ `/diary/${ entry.id }/edit` }>Edit entry</Link>
                      </li>
                    </ul>
                  </Fragment>
              ))}
            </Fragment>
          )
        }}
      </Query>
    )
  }

}

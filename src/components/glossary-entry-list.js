/**
 * @file Provides a `GlossaryEntries` page view
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

const GET_GLOSSARY = gql`
  query GetGlossaryEntries($account: String!) {
    glossaryentries(account: $account)   {
        id
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
        <GlossaryEntries account={ { "account": data.account.id } } />
      )
    }}
  </Query>

class GlossaryEntries extends React.Component {

  render() {
    return (
      <Query query={ GET_GLOSSARY } variables={ this.props.account }>
        {({ data, loading, error }) => {
          if (loading) return <Loading />
          if (error) return <Error />

          return (
            <Fragment>
              <ul className="list" style={ ListStyle }>
                <li className="dib mr2 fr">
                  <Link
                    className="f6 f5-ns b db link dim orange"
                    to={ `/glossary/` }>Create entry</Link>
                </li>
              </ul>
              <h1 className="navy">Glossary List</h1>
              {data.glossaryentries &&
                data.glossaryentries.map(entry => (
                  <Fragment>
                    <h3 className="navy">{ entry.title }</h3>
                    <ul key={ entry.id }>
                      <li>{ entry.id }</li>
                      <li>{ entry.title }</li>
                      <li>{ entry.byline }</li>
                      <li>{ entry.content }</li>
                    </ul>
                    <ul className="list fr" style={ ListStyle }>
                      <li className="dib mr2">
                        <Link
                          className="f6 f5-ns b db link dim navy"
                          to={ `/glossary/${ entry.id }` }>Full entry</Link>
                      </li>
                      <li className="dib mr2">
                        <Link
                          className="f6 f5-ns b db link dim dark-green"
                          to={ `/glossary/${ entry.id }/edit` }>Edit entry</Link>
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

/**
 * @file Provides a `GlossaryEntries` page view
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit'
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus'
import faTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt'

import Loading from './loading'
import Error from './error'
import { ListStyle } from '../utils/style'
import { GET_ACCOUNT } from '../graphql/account'
import { GET_GLOSSARY } from '../graphql/glossary'

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
      <Query
        query={ GET_GLOSSARY }
        variables={ this.props.account }
        fetchPolicy="no-cache">
        {({ data, loading, error }) => {
          if (loading) return <Loading />
          if (error) return <Error />

          return (
            <Fragment>
              <ul className="list" style={ ListStyle }>
                <li className="dib mr2 fr">
                  <Link
                    className="f6 f5-ns b db link dim orange"
                    to={ `/glossary/create` }>
                    <FontAwesomeIcon icon={ faPlus } color="red" />
                  </Link>
                </li>
              </ul>
              <h1 className="navy">Glossary List</h1>
              {data.glossaryentries &&
                data.glossaryentries.map((entry, idx) => (
                  <Fragment
                      key={ idx }
                    >
                    <Link
                      className="link db dim mb1"
                      to={ `/glossary/${ entry.id }` }>
                      <div className="pa1 grow">
                        <h3 className="mv0 navy">
                          { entry.title }
                        </h3>
                        <p className="near-black mb0">
                          { entry.byline }
                        </p>
                      </div>
                    </Link>
                    <Link
                      className="f6 f5-ns b db link dim fr"
                      to={ `/glossary/${ entry.id }/edit` }>
                      <FontAwesomeIcon icon={ faEdit } color="navy" />
                    </Link>
                    <Link
                      className="mr2 f6 f5-ns b db link dim fr"
                      to={ `/glossary/${ entry.id }/delete` }>
                      <FontAwesomeIcon icon={ faTrashAlt } color="navy" />
                    </Link>
                    <div className="cf mb2"></div>
                  </Fragment>
              ))}
            </Fragment>
          )
        }}
      </Query>
    )
  }

}

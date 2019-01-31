/**
 * @file Provides a `profile` page
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import marked from 'marked'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit'
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus'
import faList from '@fortawesome/fontawesome-free-solid/faList'
import faTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt'

import Loading from './loading'
import Error from './error'
import { ListStyle } from '../utils/style'
import { GET_GLOSSARY_ENTRY } from '../graphql/glossary'

export default class GlossaryEntryDetail extends React.Component {

  render() {
    return (
      <Query
        query={ GET_GLOSSARY_ENTRY }
        variables={{ "id": this.props.match.params.id }}
        fetchPolicy="cache-and-network">
        {({ data, loading, error }) => {
          if (loading) return <Loading />
          if (error) return <Error />

          return (
            <Fragment>
              <ul className="list fr" style={ ListStyle }>
                <li className="dib mr2">
                  <Link
                    className="f6 f5-ns b db link dim"
                    to={ `/glossary/` }>
                    <FontAwesomeIcon icon={ faList } color="navy" />
                  </Link>
                </li>
                <li className="dib mr2">
                  <Link
                    className="f6 f5-ns b db link dim"
                    to={ `/glossary/${ this.props.match.params.id }/edit` }>
                    <FontAwesomeIcon icon={ faEdit } color="navy" />
                  </Link>
                </li>
                <li className="dib mr2">
                  <Link
                    className="f6 f5-ns b db link dim"
                    to={ `/glossary/${ this.props.match.params.id }/delete` }>
                    <FontAwesomeIcon icon={ faTrashAlt } color="navy" />
                  </Link>
                </li>
                <li className="dib mr2">
                  <Link
                    className="f6 f5-ns b db link dim"
                    to={ `/glossary/create` }>
                    <FontAwesomeIcon icon={ faPlus } color="red" />
                  </Link>
                </li>
              </ul>
              <h1 className="navy">{ data.glossaryentry.title }</h1>
              <p className="f8 dark-gray i">{ data.glossaryentry.byline }</p>
              <div
                className="f8 dark-gray i"
                dangerouslySetInnerHTML={{ __html: marked(data.glossaryentry.byline) }} />
              <div
                dangerouslySetInnerHTML={{ __html: marked(data.glossaryentry.content) }} />
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

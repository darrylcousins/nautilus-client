/**
 * @file Provides a `profile` page
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'

import Loading from './loading'
import Error from './error'
import { ListStyle } from '../utils/style'
import { GET_GLOSSARY_ENTRY } from '../graphql/glossary'

export default class GlossaryEntryDetail extends React.Component {

  render() {
    return (
      <Query query={ GET_GLOSSARY_ENTRY } variables={{ "id": this.props.match.params.id }}>
        {({ data, loading, error }) => {
          if (loading) return <Loading />
          if (error) return <Error />

          console.log(data)
          return (
            <Fragment>
              <ul className="list fr" style={ ListStyle }>
                <li className="dib mr2">
                  <Link
                    className="f6 f5-ns b db link dim mid-gray"
                    to={ `/glossary/` }>Glossary List</Link>
                </li>
                <li className="dib mr2">
                  <Link
                    className="f6 f5-ns b db link dim navy"
                    to={ `/glossary/${ this.props.match.params.id }/edit` }>Edit Entry</Link>
                </li>
              </ul>
              <h1 className="navy">{ data.glossaryentry.title }</h1>
              <ul>
                <li>{ this.props.match.params.id }</li>
                <li>{ data.glossaryentry.title }</li>
                <li>{ data.glossaryentry.byline }</li>
                <li>{ data.glossaryentry.content }</li>
              </ul>
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

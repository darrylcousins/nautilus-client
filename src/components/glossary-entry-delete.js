/**
 * @file Provides an `Update Glossary Entry` form component
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import { Form, Text } from 'react-form'
import gql from 'graphql-tag'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus'
import faList from '@fortawesome/fontawesome-free-solid/faList'
import faEye from '@fortawesome/fontawesome-free-solid/faEye'

import Client from '../client'
import Message from './form/message.js'
import Style from './form/style'
import Loading from './loading'
import Error from './error'
import { ListStyle } from '../utils/style'
import { GET_GLOSSARY_ENTRY } from '../graphql/glossary'
//import { GET_ACCOUNT } from '../graphql/account'

export default class GlossaryEntryDelete extends React.Component {

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(data, e, formApi) {

    const M = gql`
      mutation
        DeleteGlossaryEntry(
          $id: String!
          $account: String!
          $type: String!
          $title: String!
          $byline: String!
          $content: String!
        ){
        deleteGlossaryEntry(
          id: $id
          account: $account
          type: $type
          title: $title
          byline: $byline
          content: $content
        ){
          id
          account
          title
          byline
          content
        }
      }
    `

    //const account = Client.cache.readQuery({
    //  query: GET_ACCOUNT
    //}).account

    // get a promise
    // update cache and redirect to glossary listing
    Client.mutate({
      mutation: M,
      variables: data
      })
      .then((outcome) => {
        var result = outcome.data.deleteGlossaryEntry
        // use result to pass message feedback to user
        console.log('SUCCESS', result)
        this.props.history.push(`/glossary/`)
      })
      .catch((errors) => {
        console.log('ERROR', errors)
      })
  }

  render() {
    return (
      <Query query={ GET_GLOSSARY_ENTRY } variables={{ "id": this.props.match.params.id }}>
        {({ data, loading, error }) => {
          if (loading) return <Loading />
          if (error) return <Error />

          return (
            <Fragment>
              <div className="fr">
                <ul className="list" style={ ListStyle }>
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
                      to={ `/glossary/${ this.props.match.params.id }` }>
                      <FontAwesomeIcon icon={ faEye } color="navy" />
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
              </div>
              <h1 className="navy">Delete { data.glossaryentry.title }</h1>
              <Form onSubmit={ this.onSubmit }
                validate={ this.validate }
                defaultValues={
                  {
                    account: data.glossaryentry.account,
                    type: "glossaryentry",
                    id: this.props.match.params.id,
                    title: data.glossaryentry.title,
                    byline: data.glossaryentry.byline,
                    content: data.glossaryentry.content,
                  }
                }
                  >
                {formApi => (
                  <form
                    onSubmit={ formApi.submitForm }
                    id="glossary-entry-update-form"
                    className={ Style.form }>
                    <div>{ formApi.errors && <Message name="__all__" type="error" messages={ formApi.errors }/> }</div>
                    <Text
                      type="hidden"
                      name ="account"
                    />
                    <Text
                      type="hidden"
                      name = "type"
                    />
                    <Text
                      type="hidden"
                      name ="title"
                    />
                    <Text
                      type="hidden"
                      name = "byline"
                    />
                    <Text
                      type="hidden"
                      name = "content"
                    />
                    <div className="fr">
                      <button
                        type="submit"
                        className={ Style.buttonDefault }
                      >Delete
                      </button>
                    </div>
                  </form>
                )}
              </Form>
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

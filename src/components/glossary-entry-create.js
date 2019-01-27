/**
 * @file Provides an `Create Glossary Entry` form component
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import { Form, Text } from 'react-form'
import gql from 'graphql-tag'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import faList from '@fortawesome/fontawesome-free-solid/faList'

import Client from '../client'
import Input from './form/input.js'
import TextArea from './form/textarea.js'
import Message from './form/message.js'
import Style from './form/style'
import Loading from './loading'
import Error from './error'
import { ListStyle } from '../utils/style'
import { GET_ACCOUNT } from '../graphql/account'

export default class GlossaryEntryCreate extends React.Component {

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  validate(data) {
    // test for empty fields do it here rather than at field level
    let required = {
      title: "Title",
      byline: "Byline",
      content: "Content",
    }
    let ret = Object()
    for (var key in required) {
      if (required.hasOwnProperty(key) && data.hasOwnProperty(key)) {
        if (!data[key] || data[key].trim() === '') {
          ret[key] = Object()
          ret[key]["error"] = `${ required[key] } is a required field`
          ret[key]["warning"] = `Please enter a ${ required[key].toLowerCase() }`
        } else {
          ret[key] = Object()
          ret[key]["success"] = true
        }

      }
    }
    return ret
  }

  onSubmit(data, e, formApi) {

    const M = gql`
      mutation
        CreateGlossaryEntry(
          $account: String!
          $title: String!
          $byline: String!
          $content: String!
        ){
        createGlossaryEntry(
          account: $account
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

    // get a promise
    Client.mutate({
      mutation: M,
      variables: data
      })
      .then((outcome) => {
        var result = outcome.data.createGlossaryEntry
        console.log('SUCCESS', result)
        // use result to pass message feedback to user
        //this.props.history.push(`/glossary/${ result.id }`)
        this.props.history.push(`/glossary/`)
      })
      .catch((errors) => {
        console.log('ERROR', errors)
      })
  }

  render() {
    return (
      <Query query={ GET_ACCOUNT }>
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
                </ul>
              </div>
              <h1 className="navy">Create Entry</h1>
              <Form onSubmit={ this.onSubmit }
                validate={ this.validate }
                defaultValues={
                  {
                    account: data.account.id,
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
                    <Input
                      formApi={ formApi }
                      name="title"
                      title="Title"
                      help_text="Glossary entry title."
                    />
                    <TextArea
                      formApi={ formApi }
                      name="byline"
                      title="Byline"
                      help_text="Some sort of succinct summary of the day."
                    />
                    <TextArea
                      formApi={ formApi }
                      name="content"
                      title="Content"
                      help_text="List or narate your day,"
                      rows="4"
                      cols="20"
                    />
                    <div className="fr">
                      <button
                        type="submit"
                        className={ Style.buttonDefault }
                      >Save
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

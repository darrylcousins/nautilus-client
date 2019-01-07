/**
 * @file Provides an `Update Diary Entry` form component
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'
import { Redirect } from 'react-router-dom'
import { Query } from 'react-apollo'
import { Form } from 'react-form'
import gql from 'graphql-tag'

import Client from '../client'
import Input from './form/input.js'
import Message from './form/message.js'
import Style from './form/style'

export default class UpdateDiaryEntry extends React.Component {

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  validate(data) {
    // test for empty fields do it here rather than at field level
    let required = {
      title: "Title",
      date: "Date",
      byline: "Byline",
      content: "Content",
    }
    console.log(data)
    let ret = Object()
    for (var key in required) {
      if (required.hasOwnProperty(key) && data.hasOwnProperty(key)) {
        if (!data[key] || data[key].trim() === '') {
          ret[key] = Object()
          ret[key]["error"] = `${ required[key] } is a required field`
          ret[key]["warning"] = `Please enter a ${ required[key].toLowerCase() }`
        }
      }
    }
    return ret
  }

  onSubmit(data, e, formApi) {

    const M = gql`
      mutation UpdateGlossaryEntry(
        $account: String!
        $type: String!
        $id: String!
        $title: String!
        $byline: String!
        $content: String!
      ){
        updateGlossaryEntry(
          account: $account
          id: $id
          type: $type
          title: $title
          byline: $byline
          content: $content
        ){
          id
          title
          byline
          content
        }
      }
    `
    // get a promise
    Client.mutate({
      mutation: M,
      })
      .then((outcome) => {
        var result = outcome.data.UpdateGlossaryEntry
        if (result.formErrors != null) {
          formApi.setFormState("submitting", false)
          const errors = JSON.parse(result.formErrors)
          // reset form with submitted data
          var key
          for (key in data) {
            formApi.setValue(key, data[key])
          }
          // set errors
          for (key in errors) {
            if (errors.hasOwnProperty(key)) {
              formApi.setError(key, errors[key][0])
            }
          }
        } else {
          // success
          // TODO feedback and redirect somewhere
          console.log('SUCCESS', result)
        }
      })
      .catch((errors) => {
        console.log(errors)
        // form reset and unusable
        formApi.setError("__all__", "Network error, you may need to reload page")
      })
  }

  render() {
    var data = {
      title: "Test"
    }
    return (
      <Form onSubmit={ this.onSubmit }
        validate={ this.validate }
        defaultValues={
          {
            account: data.account,
            id: data.id,
            type: data.type,
            date: data.date,
            title: data.title,
            byline: data.byline,
            content: data.content,
          }
        }
          >
        {formApi => (
          <form
            onSubmit={ formApi.submitForm }
            id="diary-entry-update-form"
            className={ Style.form }>
            <div>{ formApi.errors && <Message name="__all__" type="error" messages={ formApi.errors }/> }</div>
            <Input
              formApi={ formApi }
              name="date"
              title="Date"
              help_text="Date for this diary entry."
            />
            <Input
              formApi={ formApi }
              name="title"
              title="Title"
              help_text="Diary entry title."
            />
            <Input
              formApi={ formApi }
              name="byline"
              title="Byline"
              help_text="Some sort of succinct summary of the day."
            />
            <Input
              formApi={ formApi }
              name="conetn"
              title="Content"
              help_text="List or narate your day,"
            />
            <button
              type="submit"
              className={ Style.buttonDefault }
            >Update
            </button>
          </form>
        )}
      </Form>
    )
  }
}


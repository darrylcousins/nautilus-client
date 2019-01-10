/**
 * @file Provides an `Update Diary Entry` form component
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'
import { Query } from 'react-apollo'
import { Form } from 'react-form'
import gql from 'graphql-tag'

import Client from '../client'
import Input from './form/input.js'
import Message from './form/message.js'
import Style from './form/style'
import Loading from './loading'
import Error from './error'
import { GET_DIARY_ENTRY } from '../graphql/diary'

export default class DiaryEntryUpdate extends React.Component {

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
      mutation
        UpdateDiaryEntry(
          $account: String!
          $type: String!
          $id: String!
          $date: String!
          $title: String!
          $byline: String!
          $content: String!
        ){
        updateDiaryEntry(
          account: $account
          type: $type
          id: $id
          date: $date
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
      variables: data
      })
      .then((outcome) => {
        var result = outcome.data.UpdateDiaryEntry
        // TODO feedback and redirect somewhere
        console.log('SUCCESS', result)
      })
      .catch((errors) => {
        // TODO feedback and redirect somewhere
        console.log('ERROR', errors)
      })
  }

  render() {
    console.log(this.props.match.params.id)
    return (
      <Query query={ GET_DIARY_ENTRY } variables={{ "id": this.props.match.params.id }}>
        {({ data, loading, error }) => {
          if (loading) return <Loading />
          if (error) return <Error />

          return (
            <Form onSubmit={ this.onSubmit }
              validate={ this.validate }
              defaultValues={
                {
                  account: data.diaryentry.account,
                  id: this.props.match.params.id,
                  type: "diaryentry",
                  date: data.diaryentry.date,
                  title: data.diaryentry.title,
                  byline: data.diaryentry.byline,
                  content: data.diaryentry.content,
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
                    type="hidden"
                    name ="account"
                  />
                  <Input
                    formApi={ formApi }
                    type="hidden"
                    name ="id"
                  />
                  <Input
                    formApi={ formApi }
                    type="hidden"
                    name = "type"
                  />
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
                    name="content"
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
        }}
      </Query>
    )
  }
}

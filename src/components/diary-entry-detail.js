/**
 * @file Provides a `profile` page
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'
import { Query } from 'react-apollo'

import Loading from './loading'
import Error from './error'
import { GET_DIARY_ENTRY } from '../graphql/diary'

export default class DiaryEntryDetail extends React.Component {

  render() {
    return (
      <Query query={ GET_DIARY_ENTRY } variables={{ "id": this.props.match.params.id }}>
        {({ data, loading, error }) => {
          if (loading) return <Loading />
          if (error) return <Error />

          console.log(data)
          return (
            <p>Diary detail { this.props.match.params.id }</p>
          )
        }}
      </Query>
    )
  }
}

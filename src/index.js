/**
 * @file Provides root of the App
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'

import App from './App'
import Client from './client'
import { GET_ACCOUNT } from './graphql/account'

import './index.css'

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()

//Client
//  .query({
//    query: gql`
//    query getAccounts {
//      accounts {
//            id
//            firstname
//            lastname
//            email
//          }
//          }
//    `})
//  .then(result => console.log('index-debug:', result))

Client
  .query({
    query: GET_ACCOUNT
  })
  .then(result => console.log('index-debug account:', result.data.account.id))


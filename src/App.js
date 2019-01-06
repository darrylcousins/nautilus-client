/**
 * @file Provides the `App`
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo'
import {
  BrowserRouter as Router,
  Link,
  Route,
} from 'react-router-dom'

import Client from './client'
import Index from './components/index'
import GlossaryEntries from './components/glossary-entries'
import DiaryEntries from './components/diary-entries'

class App extends Component {
  render() {
    return (
      <ApolloProvider client={ Client }>
        <Router>
          <div>
            <Route exact path="/" component={ Index } />
            <Route exact path="/glossary" component={ GlossaryEntries } />
            <Route exact path="/diary" component={ DiaryEntries } />
          </div>
        </Router>
      </ApolloProvider>
    )
  }
}

export default App

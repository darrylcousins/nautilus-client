/**
 * @file Provides a `GlossaryEntries` page view
 * @author Darryl Cousins <darryljcousins@gmail.com>
 */
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import marked from 'marked'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit'
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus'
import faTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt'
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch'

import Loading from './loading'
import Error from './error'
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
        <GlossaryEntries account={ data.account.id } />
      )
    }}
  </Query>

class GlossaryEntries extends React.Component {

  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
    this.state = { searchTerm: "" }
    this.searchInput = React.createRef()
  }

  componentDidUpdate() {
    console.log(this.searchInput)
    if (this.searchInput.current) {
      console.log("focus?")
      this.searchInput.current.focus()
    }
    //const search = document.getElementById("searchTerm")
    //console.log(search, search.value)
    //if (this.state.searchTerm === document.getElementById("searchTerm")) {
    //}
  }

  handleSearch(e) {
    if (e.target.value !== this.state.searchTerm) {
      this.setState({ searchTerm : e.target.value })
    }
  }

  render() {
    const variables = {
      account: this.props.account,
      searchTerm: this.state.searchTerm
    }
    return (
      <Query
        query={ GET_GLOSSARY }
        variables={ variables }
        fetchPolicy="cache-and-network">
        {({ data, loading, error }) => {
          if (loading) return <Loading />
          if (error) return <Error />

          // className="input-reset ba b--black-20 br2 pa2 mb2 db w-90"

          return (
            <Fragment>
              <Link
                className="f6 f5-ns b db link dim orange fr"
                to={ `/glossary/create` }>
                <FontAwesomeIcon icon={ faPlus } color="red" />
              </Link>
              <h1 className="navy">Glossary</h1>
              <label className="absolute pa0 ma0 o-0" htmlFor="searchTerm">Search term</label>
              <div className="relative mv3 dt dib w-100">
                <div className="bg-light-gray b--black-20 bb bt bl pa2 br2 br--left dtc dib">
                  <FontAwesomeIcon icon={ faSearch } />
                </div>
                <input
                  autoFocus={ true }
                  id="searchTerm"
                  ref={ this.searchInput }
                  type="text"
                  onChange={ this.handleSearch }
                  className="input-reset dtc pa2 b--black-20 dib bt bb bw1 w-100 br--right"
                  value={ this.state.searchTerm }
                  placeholder="Search..." />
              </div>
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
                        <div
                          className="near-black mb0"
                          dangerouslySetInnerHTML={{ __html: marked(entry.byline) }} />
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

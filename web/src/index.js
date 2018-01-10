import React                  from 'react'
import ReactDOM               from 'react-dom'
import {BrowserRouter, Route} from 'react-router-dom'
import {ApolloProvider}       from 'react-apollo'
import {ApolloClient}         from 'apollo-client'
import {HttpLink}             from 'apollo-link-http'
import {InMemoryCache}        from 'apollo-cache-inmemory'
import 'tachyons'

import UserListPage           from './components/UserListPage'
import UserPage               from './components/UserPage'
import ArticlePage            from './components/ArticlePage'
import {paths}                from './constants/paths.js'
import './index.css'

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <div>
        <Route exact path='/'                     component={UserListPage} />
        <Route       path={paths.user + ':id'}    component={UserPage} />
        <Route       path={paths.article + ':id'} component={ArticlePage} />
      </div>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
)

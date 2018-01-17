import React                  from 'react'
import ReactDOM               from 'react-dom'
import {BrowserRouter, Route} from 'react-router-dom'
import {ApolloProvider}       from 'react-apollo'
import {ApolloClient}         from 'apollo-client'
import {ApolloLink}           from 'apollo-link'
import {HttpLink}             from 'apollo-link-http'
import {InMemoryCache}        from 'apollo-cache-inmemory'
import 'tachyons'

import ArticlePage            from './components/ArticlePage'
import HomePage               from './components/HomePage'
import LoginPage              from './components/LoginPage'
import SignupPage             from './components/SignupPage'
import UserPage               from './components/UserPage'
import {paths}                from './constants/paths'
import './index.css'

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
})

const middlewareLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: `Bearer ${localStorage.getItem('graphcoolToken')}`,
    },
  })
  return forward(operation)
})

const client = new ApolloClient({
  link: middlewareLink.concat(httpLink),
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <div>
        <Route exact path='/'                     component={HomePage} />
        <Route       path={paths.createUser}      component={SignupPage} />
        <Route       path={paths.login}           component={LoginPage} />
        <Route       path={paths.user + ':id'}    component={UserPage} />
        <Route       path={paths.article + ':id'} component={ArticlePage} />
      </div>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
)

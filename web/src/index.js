import React                  from 'react'
import ReactDOM               from 'react-dom'
import {ApolloProvider}       from 'react-apollo'
import {ApolloClient}         from 'apollo-client'
import {ApolloLink}           from 'apollo-link'
import {HttpLink}             from 'apollo-link-http'
import {InMemoryCache}        from 'apollo-cache-inmemory'
import 'tachyons'

import App                    from './components/App'
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
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
)

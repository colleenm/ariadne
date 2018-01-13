import React                  from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import {graphql}              from 'react-apollo'
import gql                    from 'graphql-tag'

import Header                 from './Header'
import ArticlePage            from './ArticlePage'
import HomePage               from './HomePage'
import Loading                from './Loading'
import LoginPage              from './LoginPage'
import SignupPage             from './SignupPage'
import UserPage               from './UserPage'
import {paths}                from '../constants/paths'

class App extends React.Component {

  render() {
    if (this.props.LoggedInUser.loading) {
      return (<Loading />)
    }

    const userId = this.props.LoggedInUser.loggedInUser ?
      this.props.LoggedInUser.loggedInUser.id : ''

    const withUser = (Component) => () => <Component loggedInUser={userId} />

    return (
      <div>
        <Header loggedInUser={userId} />
        <BrowserRouter>
          <div>
            <Route exact path='/'                     component={withUser(HomePage)} />
            <Route       path={paths.createUser}      component={withUser(SignupPage)} />
            <Route       path={paths.login}           component={withUser(LoginPage)} />
            <Route       path={paths.user + ':id'}    component={withUser(UserPage)} />
            <Route       path={paths.article + ':id'} component={withUser(ArticlePage)} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

const LoggedInUser = gql`
  query LoggedInUser {
    loggedInUser {
      id
    }
  }
`

const AppWithGraphQL = graphql(LoggedInUser, {
  name: 'LoggedInUser',
  options: {fetchPolicy: 'network-only'},
})(App)

export default AppWithGraphQL

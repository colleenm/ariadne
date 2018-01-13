import React              from 'react'
import {graphql, compose} from 'react-apollo'
import {withRouter}       from 'react-router-dom'
import gql                from 'graphql-tag'

import Header             from './Header'
import Loading            from './Loading'
import {styles}           from '../styles'

class LoginPage extends React.Component {

  constructor (props) {
    super()

    this.state = {
      email: '',
      password: '',
    }
  }

  render () {
    if (this.props.LoggedInUserQuery.loading) {
      return (<Loading />)
    }

    // Redirect if user is logged in
    if (this.props.LoggedInUserQuery.user) {
      this.props.history.replace('/')
    }

    return (
      <div>
        <Header />
        <div className='w-100 ph4 pv5 flex justify-center'>
          <div>
            <input
              className='w-100 mv3 pa1'
              value={this.state.email}
              placeholder='Email'
              onChange={(e) => this.setState({email: e.target.value})}
              />
            <input
              className='w-100 mv3 pa1'
              type='password'
              value={this.state.password}
              placeholder='Password'
              onChange={(e) => this.setState({password: e.target.value})}
              />

            <div className='tc mv3'>
              <button className={styles.disabledButton + ' pa2 ' +
                  (this.state.email && this.state.password && styles.button)}
                onClick={this.authenticate}>
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  authenticate = async () => {
    const {email, password} = this.state
    try {
      const response = await this.props.AuthenticateUserMutation({variables: {email, password}})
      localStorage.setItem('graphcoolToken', response.data.authenticateUser.token)
      this.props.history.replace('/')
    } catch(e) {
      console.error('Login error: ' + e)
      // TODO notify user of invalid password in UI
    }
  }
}

const AuthenticateUserMutation = gql`
  mutation AuthenticateUserMutation ($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
      token
    }
  }
`

const LoggedInUserQuery = gql`
  query LoggedInUserQuery {
    loggedInUser {
      id
    }
  }
`
export default compose(
  graphql(AuthenticateUserMutation, {name: 'AuthenticateUserMutation'}),
  graphql(LoggedInUserQuery, {
    name: 'LoggedInUserQuery',
    options: { fetchPolicy: 'network-only' }
  })
)(withRouter(LoginPage))

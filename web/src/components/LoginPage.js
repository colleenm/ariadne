import React                 from 'react'
import {withApollo, graphql} from 'react-apollo'
import {withRouter}          from 'react-router-dom'
import gql                   from 'graphql-tag'

import {styles}              from '../styles'

class LoginPage extends React.Component {

  constructor (props) {
    super()

    this.state = {
      email: '',
      password: '',
    }
  }

  componentWillMount() {
    if (this.props.loggedInUser) {
      this.props.history.push('/')
    }
  }

  render () {
    return (
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
    )
  }

  authenticate = async () => {
    const {email, password} = this.state
    try {
      const response = await this.props.AuthenticateUserMutation({variables: {email, password}})
      localStorage.setItem('graphcoolToken', response.data.authenticateUser.token)
      this.props.client.resetStore().then(
        this.props.history.push('/')
      )
    } catch (e) {
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

const LoginPageWithGraphQL = graphql(AuthenticateUserMutation, {
  name: 'AuthenticateUserMutation',
})(withApollo(withRouter(LoginPage)))

export default LoginPageWithGraphQL

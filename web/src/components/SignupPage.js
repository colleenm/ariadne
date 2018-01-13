import React              from 'react'
import {graphql, compose} from 'react-apollo'
import {withRouter}       from 'react-router-dom'
import gql                from 'graphql-tag'

import Header             from './Header'
import Loading            from './Loading'
import {styles}           from '../styles'

class SignupPage extends React.Component {

  constructor(props) {
    super()

    this.state = {
      email: '',
      password: '',
      name: '',
    }
  }

  render() {
    if (this.props.LoggedInUserQuery.loading) {
      return (<Loading />)
    }

    if (this.props.LoggedInUserQuery.loggedInUser) {
      this.props.history.replace('/')
    }

    return (
			<div>
        <Header />
				<div className='w-100 ph4 pv5 flex justify-center'>
					<div>
						<input
							className='w-100 mv3'
							value={this.state.email}
							placeholder='Email'
							onChange={(e) => this.setState({email: e.target.value})}
							/>
						<input
							className='w-100 mv3'
							type='password'
							value={this.state.password}
							placeholder='Password'
							onChange={(e) => this.setState({password: e.target.value})}
							/>
						<input
							className='w-100 mv3'
							value={this.state.name}
							placeholder='Username'
							onChange={(e) => this.setState({name: e.target.value})}
							/>
            <div className='tc mv3'>
               <button className={styles.disabledButton + ' pa2 ' +
                  (this.state.email && this.state.password && this.state.name && styles.button)}
                onClick={this.signupUser}>
                Sign up
              </button>
            </div>
					</div>
				</div>
			</div>
		)
  }

  signupUser = async () => {
    const {email, password, name} = this.state

    try {
      const response = await this.props.CreateUserFromSignup(
        {variables: {email, password, name}})
      localStorage.setItem('graphcoolToken', response.data.signupUser.token)
      this.props.history.push('/')
    } catch (e) {
      console.error('An error occurred: ', e)
      this.props.history.push('/')
    }
  }
}

const LoggedInUserQuery = gql`
  query LoggedInUserQuery {
    loggedInUser {
      id
    }
  }
`

const CreateUserFromSignup = gql`
  mutation CreateUserFromSignup($email: String!,
      $password: String!, $name: String!) {
    signupUser(email: $email, password: $password, name: $name) {
      id
      token
    }
  }
`

export default compose(
  graphql(LoggedInUserQuery, {
    name: 'LoggedInUserQuery',
    options: {fetchPolicy: 'network-only'},
  }),
  graphql(CreateUserFromSignup, {name: 'CreateUserFromSignup'}),
)(withRouter(SignupPage))

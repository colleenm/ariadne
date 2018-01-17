import React                from 'react'
import {graphql, compose}   from 'react-apollo'
import {withRouter}         from 'react-router-dom'
import gql                  from 'graphql-tag'

import Header               from './Header'
import Loading              from './Loading'

class HomePage extends React.Component {

  render() {
    if (this.props.HomePageLoggedInUser.loading) {
      return (<Loading />)
    }

    const {loggedInUser} = this.props.HomePageLoggedInUser

    if (loggedInUser) {
      return (
        <div>
          <Header />
          <div className='center w6 tc mv7'>
            <div>hello user {loggedInUser.id}</div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <Header />
          <div className='center w6 tc mv7'>
            <div>please <a href='/login/'>log in </a> or <a href='/signup/'>sign up</a></div>
          </div>
        </div>
      )
    }
  }
}

const HomePageLoggedInUser = gql`
  query HomePageLoggedInUser {
    loggedInUser {
      id
    }
  }
`

export default compose(
  graphql(HomePageLoggedInUser, {
    name: 'HomePageLoggedInUser',
    options: {fetchPolicy: 'network-only'},
  }),
)(withRouter(HomePage))


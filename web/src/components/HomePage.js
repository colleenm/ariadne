import React                from 'react'
import {graphql}   from 'react-apollo'
import gql                  from 'graphql-tag'

import Loading              from './Loading'

class HomePage extends React.Component {

  render() {
    if (this.props.HomePageUser.loading) {
      return (<Loading />)
    }

    const user = this.props.HomePageUser.User

    if (this.props.loggedInUser && user) {
      return (
        <div className='center w6 tc mv7'>
          <div>hello {user.name}</div>
        </div>
      )
    } else {
      return (
        <div className='center w6 tc mv7'>
          <div>please <a href='/login/'>log in </a> or <a href='/signup/'>sign up</a></div>
        </div>
      )
    }
  }
}

const HomePageUser = gql`
  query HomePageUser ($id: ID!) {
    User(id: $id) {
      id
      name
    }
  }
`

const HomePageWithGraphQL =  graphql(HomePageUser, {
  name: 'HomePageUser',
  options: ({loggedInUser}) => ({
    variables: {
      id: loggedInUser,
    },
  }),
})(HomePage)

export default HomePageWithGraphQL

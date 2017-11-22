import React       from 'react'
import {graphql}   from 'react-apollo'
import gql         from 'graphql-tag'

import Loading     from './Loading'
import User        from './User'

class UserListPage extends React.Component {

  render() {
    if (this.props.AllUsers.loading) {
      return <Loading/>
    }

    return (
      <div className={'w-100 flex justify-center pa6'}>
        <div className='w-100 flex flex-wrap' style={{maxWidth: 1150}}>
          {this.props.AllUsers.allUsers &&
            this.props.AllUsers.allUsers.map(user => (
            <User
              key={user.id}
              user={user}
              refresh={() => this.props.AllUsers.refetch()}
            />
          ))}
        </div>
        {this.props.children}
      </div>
    )
  }
}

const AllUsers = gql`{
  allUsers {
    id
    name
    imageUrl
  }
}`

const UserListPageWithGraphQL =  graphql(AllUsers, {
  name: 'AllUsers',
  fetchPolicy: 'network-only',
})(UserListPage)

export default UserListPageWithGraphQL

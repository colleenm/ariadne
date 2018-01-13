import React     from 'react'
import {graphql} from 'react-apollo'
import gql       from 'graphql-tag'

import Loading   from './Loading'
import User      from './User'

class UserListPage extends React.Component {

  render() {
    if (this.props.AllUsers.loading) {
      return <Loading/>
    }

    const {allUsers} = this.props.AllUsers

    return (
      <div className={'w-100 flex justify-center pa6'}>
        <div className='w-100 flex flex-wrap' style={{maxWidth: 1150}}>
          {allUsers && allUsers.map(user => (
            <User
              key={user.id}
              user={user}
              refresh={() => allUsers.refetch()}
            />
          ))}
        </div>
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

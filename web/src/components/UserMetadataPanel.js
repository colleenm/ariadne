import React         from 'react'
import {graphql}     from 'react-apollo'
import gql           from 'graphql-tag'

import Loading       from './Loading'
import {paths}       from '../constants/paths'
import {styles}      from '../styles'
import {utils}       from '../utils'

class UserMetadataPanel extends React.Component {

  render() {
    if (this.props.UserMetadataUser.loading) {
      return <Loading />
    }

    const user = this.props.UserMetadataUser.user

    return (
      <div className={styles.dullText}>
        {/* For user pages */}
        <div className='mb2'>
          <div>
            Member since {utils.formatDate(new Date(user.createdAt))}
          </div>
          <div>Email: {user.email}</div>
        </div>
        <div className='mb2'>
          <div>Member of:</div>
          {user.currentGroups.map((group) => (
            <div key={group.id}>
              <a href={paths.group + group.id} className='white'>
                {group.name}
              </a>
            </div>
          ))}
        </div>
        <div>
          <div>{utils.formatArticleCount(user.authorships.map((authorship) => authorship.article))}</div>
          <div>{utils.formatRequestCount(user.requestsMade)} made</div>
          <div>{utils.formatRequestCount(user.requestsFilled)} filled</div>
          {/* TODO Separate articles & op eds and add op ed count */}
        </div>
      </div>
    )
  }
}

const UserMetadataUser= gql`
  query UserMetadataUser($id: ID!) {
    user(id: $id) {
      id
      expunged
      active
      createdAt
      email
      authorships {
        id
      }
      currentGroups {
        id
        name
      }
      requestsMade {
        id
      }
      requestsFilled {
        id
      }
    }
  }
`

const UserMetadataPanelWithGraphQL =  graphql(UserMetadataUser, {
  name: 'UserMetadataUser',
  options: ({agentId}) => ({
    variables: {
      id: agentId,
    },
  }),
})(UserMetadataPanel)

export default UserMetadataPanelWithGraphQL


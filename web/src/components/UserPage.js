import React              from 'react'
import {graphql}          from 'react-apollo'
import {withRouter}       from 'react-router-dom'
import gql                from 'graphql-tag'

import Header             from './Header'
import Loading            from './Loading'
import SortableEntityList from './SortableEntityList'
import UserMetadataPanel  from './UserMetadataPanel'
import {styles}           from '../styles'

class UserPage extends React.Component {

  render() {
    if (this.props.UserPageUser.loading) {
      return <Loading/>
    }

    const {user} = this.props.UserPageUser

    let entityListsByType = this.createEntityListsByType(user)

    return (
      <div>
        <Header />
        <div className={styles.pagePadding}>
          <div className={styles.pageTitle}>
            {/* TODO avatar goes here */}
            {user.name}
          </div>
          <div className='flex-ns mv3'>
            <div className='mr3-ns mb3 mb0-ns'> {/* Side panel */}
              <div className={styles.borderedSection + ' mb3'}>
                <UserMetadataPanel
                  agentId={user.id}
                  />
              </div>
              <div className={styles.borderedSection}>
                [ActionNeedePanel]
              </div>
            </div>
            <div className='flex-auto'>
              <div className={styles.borderedSection + ' mb3'}>
                {/* TODO users should have bios */}
                I am a user bio. Look at all the things I have to say.
              </div>
              <div className={styles.borderedSection}> {/* Main content */}
                <SortableEntityList
                  lists={entityListsByType}
                  />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  createEntityListsByType = function(user) {
    const listsByType= {}

    // TODO divide authorships into articles and op-eds
    if (user.authorships) {
      listsByType['Articles'] = (
        user.authorships.map((authorship) => authorship.article))
    }
    if (user.commentsPosted) {
      listsByType['Comments'] = user.commentsPosted
    }
    if (user.requestsMade) {
      listsByType['Requests'] = user.requestsMade
    }
    if (user.articlesEndorsed) {
      // TODO this should be user.articlesEndorsed, change when fake data fixed
      listsByType['Endorsements'] = listsByType['Articles'].slice(4)
    }

    return listsByType
  }
}

// TODO: bio, imageUrl
const UserPageUser = gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      expunged
      active
      name
      authorships {
        id
        article {
          id
        }
      }
      requestsMade {
        id
      }
      articlesEndorsed {
        id
      }
      commentsPosted {
        id
      }
    }
  }
`
const UserPageWithGraphQL = graphql(UserPageUser, {
  name: 'UserPageUser',
  options: ({match}) => ({
    variables: {
      id: match.params.id,
    },
  }),
})(UserPage)

export default withRouter(UserPageWithGraphQL)

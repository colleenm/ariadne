import React     from 'react'
import {graphql}     from 'react-apollo'
import gql           from 'graphql-tag'

import Loading       from './Loading'

class MetadataPanel extends React.Component {

  render() {
    if (this.props.MetadataArticle.loading) {
      return <Loading />
    }

    const {article} = this.props.MetadataArticle
    
    return (
      <div className='ba'>
        {/* For articles */}
        <div>
          {article.authoringGroups
              .map((group, i, a) => (
                <a href={'#' + group.id} key={group.id}>{group.name}</a>
              ))
              .reduce((prev, curr) => [prev, ', ', curr])
          }
        </div>
        <div>
          {article.authoringUsers
              .map((user) => (
                <a href={'#' + user.id} key={user.id}>{user.name}</a>
              ))
              .reduce((prev, curr) => [prev, ', ', curr])
          }
        </div>
        <div>[TODO(cmck) logic to get post date from history]</div>
      </div>
    )

  }
}

const MetadataArticle = gql`
  query article($id: ID!) {
    article(id: $id) {
      id
      expunged
      createdAt
      authoringUsers {
        id
        expunged
        active
        name
      }
      authoringGroups {
        id
        expunged
        active
        name
      }
      comments {
        id
      }
      endorsements {
        id
      }
      watchers {
        id
      }
    }
  }
`

//const Entity = gql`
//  query entity($id: ID!) {
//    entity(id: $id) {
//      ... on Article {
//        id
//      }
//    }
//  }
//`

const MetadataPanelWithGraphQL =  graphql(MetadataArticle, {
  name: 'MetadataArticle',
  options: (articleId) => ({
    variables: {
      id: articleId,
    },
  }),
})(MetadataPanel)

export default MetadataPanelWithGraphQL


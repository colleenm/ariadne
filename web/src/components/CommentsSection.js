import React         from 'react'
import {graphql}     from 'react-apollo'
import gql           from 'graphql-tag'

import Loading       from './Loading'

class CommentsSection extends React.Component {

  render() {
    if (this.props.CommentsSectionEntity.loading) {
      return <Loading />
    }

    // Replace 'article' with 'entity' below when we stop using fake data
    const entity = this.props.CommentsSectionEntity.article
    console.log(entity)

    return (
      <div>
        <div>Comments</div>
        <div>
          {entity.comments.length === 0 ? 'No comments yet' :
              entity.comments.map((comment) => (
                <div>
                  [comment goes here] {/* TODO */}
                </div>
              ))}
        </div>
      </div>
    )
  }
}

// TODO: When we stop using graphql-faker, this query should use the entity(id)
//       query, not the article(id) query.
const CommentsSectionEntity = gql`
  query CommentsSectionEntity($id: ID!) {
    article(id: $id) {
      id
      expunged
      comments {
        id
        expunged
        createdAt
        updatedAt
        content
        poster {
          id
          expunged
          active
          name
        }
        endorsements {
          id
        }
      }
    }
  }
`

const CommentsSectionWithGraphQL =  graphql(CommentsSectionEntity, {
  name: 'CommentsSectionEntity',
  options: (props) => ({
    variables: {
      id: props.entityId,
    },
  }),
})(CommentsSection)

export default CommentsSectionWithGraphQL


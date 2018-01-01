import React         from 'react'
import {graphql}     from 'react-apollo'
import gql           from 'graphql-tag'

import Loading       from './Loading'
import {styles}      from '../styles'

class CommentsSection extends React.Component {

  render() {
    if (this.props.CommentsSectionEntity.loading) {
      return <Loading />
    }

    // Replace 'article' with 'entity' below when we stop using fake data
    const entity = this.props.CommentsSectionEntity.article

    return (
      <div>
        <div className='flex mb1'>
          <div className={styles.sectionTitle + ' mr4'}>Comments</div>
          <div>
            <button className={styles.button}>Comment</button>
          </div>
        </div>
        <div>
          {entity.comments.length === 0 ?
              <span className='white-70 i'>No comments yet</span> :
              entity.comments.map((comment) => (
                <div>
                  [comment goes here] {/* TODO fill out comment data */}
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


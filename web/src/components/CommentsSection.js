import React         from 'react'
import {graphql}     from 'react-apollo'
import gql           from 'graphql-tag'

import Loading       from './Loading'
import {paths}       from '../constants/paths'
import {styles}      from '../styles'
import {utils}       from '../utils'

class CommentsSection extends React.Component {

  render() {
    if (this.props.CommentsSectionEntity.loading) {
      return <Loading />
    }

    // Replace 'article' with 'entity' below when we stop using fake data
    const entity = this.props.CommentsSectionEntity.article

    return (
      <div>
        <div className='flex'>
          <div className={styles.grayTitle + ' mr4'}>Comments</div>
          <div>
            <button className={styles.button}>Comment</button>
          </div>
        </div>
        <div>
          {entity.comments.length === 0 ?
              <span className='white-50 i'>No comments yet</span> :
              entity.comments.map((comment) => (
                <div className='ba b--white-70 pa2 mt3' key={comment.id}>
                  <div className='mb1'>
                    <a href={paths.user + comment.poster.id}>
                      {comment.poster.name}&nbsp;
                    </a>
                    <span className={styles.dullText + ' i'}>
                      {utils.formatDate(new Date(comment.createdAt))}
                    </span>
                  </div>
                  <div>
                    {comment.body}
                  </div>
                  {/* TODO threaded child comments */}
                </div>
              ))
          }
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
        body
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


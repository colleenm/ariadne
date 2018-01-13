import React     from 'react'
import {graphql} from 'react-apollo'
import gql       from 'graphql-tag'

import Loading   from './Loading'
import {paths}   from '../constants/paths'
import {styles}  from '../styles'
import {utils}   from '../utils'

class MetadataPanel extends React.Component {

  render() {
    if (this.props.MetadataEntity.loading) {
      return <Loading />
    }

    // TODO Replace 'article' with 'entity' below to support interfaces
    const entity = this.props.MetadataEntity.article

    const dates = this.formatDateSection(entity)
    const authorships = this.formatAuthorships(entity)
    const endorsements = utils.formatEndorsementCount(entity.endorsements)
    const comments = utils.formatCommentCount(entity.comments)

    return (
      <div className={styles.borderedSection}>
        {/* For article pages */}
        <div className='mb2'>
          <div>{authorships}</div>
        </div>
        <div className='mb2'>{dates}</div>
        <div className='white-70'>
          <div>{comments}</div>
          <div>{endorsements}</div>
        </div>
      </div>
    )
  }


  // TODO this only works for articles now, expand to cover other entities

  // Returns JSX displaying relevant date information (creation, editing,
  // completion) for the given entity.
  formatDateSection = function(entity) {
    const createdDateEl = (
      <div>Posted {utils.formatDate(new Date(entity.createdAt))}</div>
    )
    let lastEditDateEl = null
    // TODO use this block to check for an edit history once we add edit
    // history to the schema
    if (true) {
      // TODO lastEditDateString should be the date of the most recent edit,
      // once we store edit history
      lastEditDateEl = (
        <div>Last edited {utils.formatDate(new Date())}</div>)
    }
    return (
      <div className='white-70'>
        {createdDateEl}
        {lastEditDateEl}
      </div>
    )
  }

  // Given an entity, returns a list of authoring groups and their
  // constituent users, followed by users authoring as individuals.
  formatAuthorships = function(entity) {
    // TODO separate out authorships with no real group attached
    if (entity.authors) {
      return (
        <div>
          {entity.authors.map((authorship) => (
            <div key={authorship.group.id} className='mb1'>
              <a href={paths.group + authorship.group.id}
                className={styles.linkedTitle}>
                {authorship.group.name}
              </a>
              <div>
                {authorship.users
                    .map((user) => (
                      <a href={paths.user + user.id} key={user.id} className='i'>
                        {user.name}
                      </a>
                    ))
                    .reduce((prev, curr) => [prev, ', ', curr])
                }
              </div>
            </div>
          ))}
        </div>
      )
    }
  }
}


// TODO: When we stop using graphql-faker, this query should use the entity(id)
//       query, not the article(id) query.
const MetadataEntity = gql`
  query MetadataEntity($id: ID!) {
    article(id: $id) {
      id
      expunged
      createdAt
      updatedAt
      authors {
        id
        users {
          id
          expunged
          active
          name
        }
        group {
          id
          expunged
          active
          name
        }
      }
      comments {
        id
      }
      endorsements {
        id
      }
    }
  }
`

const MetadataPanelWithGraphQL =  graphql(MetadataEntity, {
  name: 'MetadataEntity',
  options: ({articleId}) => ({
    variables: {
      id: articleId,
    },
  }),
})(MetadataPanel)

export default MetadataPanelWithGraphQL

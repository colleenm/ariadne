import React         from 'react'
import {graphql}     from 'react-apollo'
import gql           from 'graphql-tag'
import {utils}       from '../utils'

import Loading       from './Loading'

class MetadataPanel extends React.Component {

  render() {
    if (this.props.MetadataEntity.loading) {
      return <Loading />
    }

    // Replace 'article' with 'entity' below when we stop using graphql-faker
    const entity = this.props.MetadataEntity.article

    const dates = this.formatDateSection(entity)
    const authoringGroups = this.formatAuthoringGroups(entity)
    const authoringUsers = this.formatAuthoringUsers(entity)
    const endorsements = utils.formatEndorsementCount(entity.endorsements)
    const comments = utils.formatCommentCount(entity.comments)

    return (
      <div className='ba w5 mb2'> {/* TODO replace 'w5' with a flex-basis class */}
        {/* For article pages */}
        <div>{authoringGroups}</div>
        <div>{authoringUsers}</div>
        <div>{dates}</div>
        <div>
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
      <div>Posted {utils.formatDate(new Date(entity.createdAt))}</div>)
      //<div>Posted {this.formatDate(new Date(entity.createdAt))}</div>)
    let lastEditDateEl = null
    // TODO use this block to check for an edit history once we add edit
    // history to the schema
    if (true) {
      // TODO lastEditDateString should be the date of the most recent edit,
      // once we store edit history
      lastEditDateEl = (
        <div>Last edited on {utils.formatDate(new Date())}</div>)
    }
    return (
      <div>
        {createdDateEl}
        {lastEditDateEl}
      </div>
    )
  }

  // Given an entity with authoring groups, returns JSX for a list of groups'
  // names and member users
  formatAuthoringGroups = function(entity) {
    if (entity.authoringGroups) {
      return (
        <div>{entity.authoringGroups
          .map((group, i, a) => (
            <div key={group.id}>
              <a href={'/group/' + group.id} className='b'>
                {group.name}
              </a>
              <div>
                {group.members
                    .map((user) => (
                      <a href={'/user/' + user.id} key={user.id} className='i'>
                        {user.name}
                      </a>
                    ))
                    .reduce((prev, curr) => [prev, ', ', curr])
                }
              </div>
            </div>
          ))
        } </div>)
    }
    return null
  }

  // Given an entity with authoring users, returns JSX for a list of those
  // users, prefaced with "With" if the entity also has authoring groups
  formatAuthoringUsers = function(entity) {
    if (entity.authoringUsers && entity.authoringUsers.length > 0) {
      return (
        <div>{entity.authoringGroups ? 'With ' : ''}
          {entity.authoringUsers
          .map((user) => (
            <a href={'/user/' + user.id} key={user.id}>{user.name}</a>
          ))
          .reduce((prev, curr) => [prev, ', ', curr])
        }</div>)
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
        members {
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


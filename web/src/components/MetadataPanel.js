import React     from 'react'
import {graphql}     from 'react-apollo'
import gql           from 'graphql-tag'

import Loading       from './Loading'

class MetadataPanel extends React.Component {

  render() {
    if (this.props.MetadataEntity.loading) {
      return <Loading />
    }

    // Replace 'article' with 'entity' below when we stop using graphql-faker
    const entity = this.props.MetadataEntity.article
    
    let dates = this.formatDateSection(entity)
    let authoringGroups = this.formatAuthoringGroups(entity)
    let authoringUsers = this.formatAuthoringUsers(entity)
    let endorsements = this.formatEndorsements(entity)
    let comments = this.formatComments(entity)
 
    return (
      <div className='ba'>
        {/* For article pages */}
        <div>{authoringGroups}</div>
        <div>{authoringUsers}</div>
        <div>{dates}</div>
        <div>
          <div>{endorsements}</div>
          <div>{comments}</div>
        </div>
      </div>
    )
  }


  // TODO this only works for articles now, expand to cover other entities
  formatDateSection = function(entity) {
    let createdDateEl = (
      <div>Posted {this.formatDate(new Date(entity.createdAt))}</div>)
    let lastEditDateEl = null;
    // TODO use this block to check for an edit history once we add edit 
    // history to the schema
    if (true) {
      // TODO lastEditDateString should be the date of the most recent edit,
      // once we store edit history
      lastEditDateEl = (
        <div>Last edited on {this.formatDate(new Date())}</div>)
    }
    return (
      <div>
        {createdDateEl}
        {lastEditDateEl}
      </div>
    )
  }

  formatDate = function(date) {
    let dateOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      
    }
    let timeOptions = {
      timeZone: 'America/Los_Angeles',
      hour: 'numeric',
      minute: '2-digit'
    }
    return date.toLocaleDateString('en-GB', dateOptions) + ', ' + (
      date.toLocaleTimeString('en-US', timeOptions))
  }
  
  formatAuthoringGroups = function(entity) {
    if (entity.authoringGroups) {
      return (
        <div>{entity.authoringGroups
          .map((group, i, a) => (
            <div key={group.id}>
              <a href={'#' + group.id} className="b">
                {group.name}
              </a>
              <div>
                {group.members
                    .map((user) => (
                      <a href={'#' + user.id} key={user.id}>{user.name}</a>
                    ))
                    .reduce((prev, curr) => [prev, ', ', curr])
                }
              </div>
            </div>
          ))
        } </div>)
    }
    return null;
  }

  formatAuthoringUsers = function(entity) {
    if (entity.authoringUsers) {
      return (
        <div>{entity.authoringGroups ? 'With ' : ''}
          {entity.authoringUsers
          .map((user) => (
            <a href={'#' + user.id} key={user.id}>{user.name}</a>
          ))
          .reduce((prev, curr) => [prev, ', ', curr])
        }</div>)
    }
  }

  formatEndorsements = function(entity) {
    if (entity.endorsements) {
      return (
        <div>
          {entity.endorsements.length}&nbsp;
          {entity.endorsements.length === 1 ? 'endorsement' : 'endorsements'}
        </div>)
    }
    return null
  }

  formatComments= function(entity) {
    if (entity && entity.comments) {
      return (
        <div>
          {entity.comments.length}&nbsp;
          {entity.comments.length === 1 ? 'comment' : 'comments'}
        </div>)
    }
    return null
  }
}

// TODO: When we stop using graphql-faker, this query should use the entity(id)
//       query, not the article(id) query.
const MetadataEntity = gql`
  query article($id: ID!) {
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
      watchers {
        id
      }
    }
  }
`

const MetadataPanelWithGraphQL =  graphql(MetadataEntity, {
  name: 'MetadataEntity',
  options: (articleId) => ({
    variables: {
      id: articleId,
    },
  }),
})(MetadataPanel)

export default MetadataPanelWithGraphQL


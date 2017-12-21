import React         from 'react'

const utils = {
  // Given a Date object, returns a human-readable version that looks like:
  // 27 November 2017, 3:45 PM
  'formatDate': function(date) {
    const dateOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }
    const timeOptions = {
      timeZone: 'America/Los_Angeles',
      hour: 'numeric',
      minute: '2-digit'
    }
    return date.toLocaleDateString('en-GB', dateOptions) + ', ' + (
      date.toLocaleTimeString('en-US', timeOptions))
  },

  // Given a list of endorsements, returns JSX for a labeled count of its
  // endorsements
  'formatEndorsementCount': function(endorsements) {
    if (endorsements) {
      return (
        <div>
          {endorsements.length}&nbsp;
          {endorsements.length === 1 ? 'endorsement' : 'endorsements'}
        </div>)
    }
    return null
  },

  // Given a list of comments, returns JSX for a labeled count of its
  // comments
  'formatCommentCount': function(comments) {
    if (comments) {
      return (
        <div>
          {comments.length}&nbsp;
          {comments.length === 1 ? 'comment' : 'comments'}
        </div>)
    }
    return null
  },
}

export {utils}


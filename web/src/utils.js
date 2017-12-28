// Utility functions shared between components.
// Formatting functions should return strings, not JSX, when possible.

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
      return endorsements.length +
          (endorsements.length === 1 ? ' endorsement' : ' endorsements')
    }
    return null
  },

  // Given a list of comments, returns JSX for a labeled count of its
  // comments
  'formatCommentCount': function(comments) {
    if (comments) {
      return comments.length +
          (comments.length === 1 ? ' comment' : ' comments')
    }
    return null
  },
}

export {utils}


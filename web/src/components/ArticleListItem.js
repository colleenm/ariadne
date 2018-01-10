import React         from 'react'
import {graphql}     from 'react-apollo'
import gql           from 'graphql-tag'

import Loading       from './Loading'
import {paths}       from '../constants/paths'
import {styles}      from '../styles'
import {utils}       from '../utils'

class ArticleListItem extends React.Component {

  render() {
    if (this.props.ArticleListItemArticle.loading) {
      return <Loading />
    }

    const article = this.props.ArticleListItemArticle.article

    const authors = this.formatAuthorships(article.authors)

    let snippet = ''
    if (this.props.showSnippet) {
      snippet = article.abstract
    }

    return (
      <div className='mb2'>
        <a href={paths.article + article.id} key={article.id}
          className='db f5'>
          {article.title}
        </a>
        <div className='mb1 f6'>{authors}</div>
        <div className={styles.dullText + ' f6'}>
          <div className='mb1'>
            <div>Posted {utils.formatDate(new Date(article.createdAt))}</div>
            {/* TODO get date updated from history, note from updatedAt */}
            <div>Last edited {utils.formatDate(new Date(article.updatedAt))}
            </div>
          </div>
          <div className='flex mb1'>
            <div>{utils.formatCommentCount(article.comments)}</div>
            <div className='mh2'>&bull;</div>
            <div>{utils.formatEndorsementCount(article.endorsements)}</div>
          </div>
          <div>{snippet}</div>
        </div>
      </div>
    )
  }

  formatAuthorships = function(authorships) {
    // TODO don't show the group containing all users; if only individual users
    // are authors, show a list of usernames instead of group names.
    return (
      <div>
        {authorships
            .map((authorship) => (
              <a href={paths.group + authorship.group.id}
                key={authorship.group.id}
                className='white'>
                {authorship.group.name}
              </a>
            ))
            .reduce((prev, curr) => [prev, ', ', curr])
        }
      </div>
    )
  }
}

const ArticleListItemArticle = gql`
  query ArticleListItemArticle($id: ID!) {
    article(id: $id) {
      id
      expunged
      createdAt
      updatedAt
      title
      abstract
      authors {
       id
       group {
         id
         name
       }
       users {
         id
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

const ArticleListItemWithGraphQL =  graphql(ArticleListItemArticle, {
  name: 'ArticleListItemArticle',
  options: (props) => ({
    variables: {
      id: props.articleId,
    },
  }),
})(ArticleListItem)

export default ArticleListItemWithGraphQL


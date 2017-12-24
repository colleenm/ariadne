import React         from 'react'
import {graphql}     from 'react-apollo'
import gql           from 'graphql-tag'
import {utils}       from '../utils'

import Loading       from './Loading'

class ArticleListItem extends React.Component {

  render() {
    if (this.props.ArticleListItemArticle.loading) {
      return <Loading />
    }

    const article = this.props.ArticleListItemArticle.article

    let snippet = ''
    if (this.props.showSnippet) {
      snippet = article.abstract
    }

    return (
      <div>
        <a href={'/article/' + article.id} key={article.id} className='db'>
          {article.title}
        </a>
        {/* TODO date posted/updated */}
        {/* TODO authoring groups, authoring users */}
        <div>{utils.formatCommentCount(article.comments)}</div>
        <div>{utils.formatEndorsementCount(article.endorsements)}</div>
        <div>{snippet}</div>
      </div>
    )
  }
}

// TODO also pull & display Authorships, dates
const ArticleListItemArticle = gql`
  query ArticleListItemArticle($id: ID!) {
    article(id: $id) {
      id
      expunged
      title
      abstract
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


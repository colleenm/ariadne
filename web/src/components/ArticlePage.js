import React                from 'react'
import {graphql}            from 'react-apollo'
import {withRouter}         from 'react-router-dom'
import gql                  from 'graphql-tag'

import Loading              from './Loading'
import MetadataPanel        from './MetadataPanel'
import RelatedArticlesPanel from './RelatedArticlesPanel'

class ArticlePage extends React.Component {

  render() {
    if (this.props.ArticlePageArticle.loading) {
      return <Loading />
    }

    const {article} = this.props.ArticlePageArticle

    return (
      <div> {/* Article Page */}
        <div>{article.title}</div>
        <div>
          <button>Follow</button>
        </div>
        <div className='flex'>
          <div> {/* Side Content */}
            <MetadataPanel
              articleId={article.id}
            />
            <RelatedArticlesPanel
              articleId={article.id}
            />
          </div>
          <div className='ba'> {/* Article Body */}
            <div>{article.abstract}</div>
            <div>{article.content}</div>
          </div>
        </div>
      </div>
    )
  }
}

const ArticlePageArticle = gql`
  query ArticlePageArticle($id: ID!) {
    article(id: $id) {
      id
      expunged
      title
      abstract
      body
    }
  }
`

const ArticlePageWithGraphQL = graphql(ArticlePageArticle, {
  name: 'ArticlePageArticle',
  options: ({match}) => ({
    variables: {
      id: match.params.id,
    },
  }),
})(ArticlePage)

export default withRouter(ArticlePageWithGraphQL)


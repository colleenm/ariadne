import React                from 'react'
import {graphql}            from 'react-apollo'
import {withRouter}         from 'react-router-dom'
import gql                  from 'graphql-tag'

import CommentsSection      from './CommentsSection'
import EndorsementsSection  from './EndorsementsSection'
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
      <div>
        <div className='mb2'>{article.title}</div>
        <div>
          <button>Follow</button>
        </div>
        <div className='flex mv2'>
          <div className='mr2'> {/* Side Content */}
            <MetadataPanel
              articleId={article.id}
            />
            <RelatedArticlesPanel
              articleId={article.id}
            />
          </div>
          <div className='ba'> {/* Article Body */}
            <div>{article.abstract}</div>
            <div>{article.body}</div>
            <EndorsementsSection
              entityId={article.id}
              />
            <CommentsSection
              entityId={article.id}
              />
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


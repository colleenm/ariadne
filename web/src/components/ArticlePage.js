import React                from 'react'
import {graphql}            from 'react-apollo'
import {withRouter}         from 'react-router-dom'
import gql                  from 'graphql-tag'

import CommentsSection      from './CommentsSection'
import EndorsementsSection  from './EndorsementsSection'
import Loading              from './Loading'
import MetadataPanel        from './MetadataPanel'
import RelatedArticlesPanel from './RelatedArticlesPanel'
import {styles}             from '../styles'

class ArticlePage extends React.Component {

  render() {
    if (this.props.ArticlePageArticle.loading) {
      return <Loading />
    }

    const {article} = this.props.ArticlePageArticle

    // TODO figure out when/how to show abstracts
    return (
      <div>
        <div>
          [header]
        </div>
        <div className={styles.pagePadding}>
          <div className={styles.pageTitle}>{article.title}</div>
          <div>
            <button>Follow</button>
          </div>
          <div className='flex-ns mv3'>
            <div className='mr3 w-100 w-30-ns fl-ns'> {/* Side Content */}
              <div className='mb3-ns mb2'>
                <MetadataPanel
                  articleId={article.id}
                  />
              </div>
              <div className='mb0-ns mb2'>
                <RelatedArticlesPanel
                  articleId={article.id}
                  />
              </div>
            </div>
            {/* Article Body */}
            <div className={styles.borderedSection + ' fl-ns w-70-ns'}>
              <div>{article.abstract}</div>
              <div className='mb3'>{article.body}</div>
              <div className='mb3'>
                <EndorsementsSection
                  entityId={article.id}
                  />
              </div>
              <CommentsSection
                entityId={article.id}
                />
            </div>
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


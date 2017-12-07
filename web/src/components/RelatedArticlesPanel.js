import React         from 'react'
import {graphql}     from 'react-apollo'
import gql           from 'graphql-tag'

import Loading       from './Loading'

class RelatedArticlesPanel extends React.Component {

  render() {
    if (this.props.RelatedArticles.loading) {
      return <Loading />
    }

    const {article} = this.props.RelatedArticles

    return (
      <div className='ba'>
        <div>Related articles</div>
        <div>
          {article.relatedArticles
              .map((recommendation) => (
                <div key={recommendation.id}>
                  <a href={'#' + recommendation.article.id}
                     key={recommendation.article.id}>
                    {recommendation.article.title}
                  </a>
                </div>
              ))
          }
        </div>
      </div>
    )
  }

}

const RelatedArticles = gql`
  query RelatedArticles($id: ID!) {
    article(id: $id) {
      id
      expunged
      relatedArticles {
        id
        expunged
        article {
          id
          title
        }
      }
    }
  }
`

const RelatedArticlesPanelWithGraphQL =  graphql(RelatedArticles, {
  name: 'RelatedArticles',
  options: ({articleId}) => ({
    variables: {
      id: articleId,
    },
  }),
})(RelatedArticlesPanel)

export default RelatedArticlesPanelWithGraphQL


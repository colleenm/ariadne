import React           from 'react'
import {graphql}       from 'react-apollo'
import gql             from 'graphql-tag'

import Loading         from './Loading'
import ArticleListItem from './ArticleListItem'

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
          {article.related
              .map((item) => (
                <ArticleListItem
                  articleId={item.id}
                  showSnippet={false}
                  key={item.id}
                  />
              ))}
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
      related {
        id
        expunged
        createdAt
        title
        authoringGroups {
          id
          name
          expunged
          active
        }
        authoringUsers {
          id
          name
          expunged
          active
        }
        endorsements {
          id
        }
        comments {
          id
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


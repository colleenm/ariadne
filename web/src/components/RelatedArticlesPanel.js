import React           from 'react'
import {graphql}       from 'react-apollo'
import gql             from 'graphql-tag'

import Loading         from './Loading'
import ArticleListItem from './ArticleListItem'
import {styles}        from '../styles'

class RelatedArticlesPanel extends React.Component {

  render() {
    if (this.props.RelatedArticles.loading) {
      return <Loading />
    }

    const {article} = this.props.RelatedArticles

    return (
      <div className={styles.borderedSection}>
        <div className={styles.grayTitle +
            ' mb2 w-80 tc center bb b--white-70'}>
          Related articles
        </div>
        <div className='mb3'>
          {article.related
              .map((item) => (
                <ArticleListItem
                  articleId={item.id}
                  showSnippet={false}
                  key={item.id}
                  />
              ))}
        </div>
        <div>
          <button className={styles.button}>Add article</button>
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


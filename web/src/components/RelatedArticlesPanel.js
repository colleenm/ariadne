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

    // TODO: display authoring users as well as authoring groups
    // TODO: add date posted, # comments, and # endorsements to this blurb
    return (
      <div className='ba'>
        <div>Related articles</div>
        <div>
          {article.related
              .map((article) => (
                <div key={article.id}>
                  <a href={'/article/' + article.id}
                     key={article.id} className='db'>
                    {article.title}
                  </a>
                  {article.authoringGroups
                    .map((group, i, a) => (
                      <a href={'/group/' + group.id}
                         key={article.id + '.' + group.id}
                         className='db'>
                        {group.name}
                      </a>
                    ))}
                  </div>
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


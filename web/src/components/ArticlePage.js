import React         from 'react'
import {graphql}     from 'react-apollo'
import {withRouter}  from 'react-router-dom'
import gql           from 'graphql-tag'

import Loading       from './Loading'
import MetadataPanel from './MetadataPanel'

class ArticlePage extends React.Component {

  render() {
    if (this.props.Article.loading) {
      return <Loading />
    }

    const {article} = this.props.Article

    let abstract;
    if (article.abstract) {
      abstract = <div>
                   <div>Abstract</div>
                   <div>{article.abstract}</div>
                 </div>
    }

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
          </div>
          <div className="ba"> {/* Article Body */}
            {abstract}
            <div>{article.content}</div>
          </div>
        </div>
      </div>
    )
  }
}

const Article = gql`
  query article($id: ID!) {
    article(id: $id) {
      id
      expunged
      title
      abstract
      content
      comments {
        id
        expunged
        createdAt
        updatedAt
        content
        poster {
          id
          expunged
          active
          name
        }
        endorsements {
          id
          name
        }
      }
    }
  }
`

const ArticlePageWithGraphQL = graphql(Article, {
  name: 'Article',
  options: ({match}) => ({
    variables: {
      id: match.params.id,
    },
  }),
})(ArticlePage)

export default withRouter(ArticlePageWithGraphQL)


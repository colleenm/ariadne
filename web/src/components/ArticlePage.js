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
    
    return (
      <div> {/* Article Page */}
        <div>{article.title}</div>
        <div>
          <button>Follow</button>
        </div>
        <div className='flex'>
          <div> {/* Side Content */}
            <MetadataPanel
              authoringUsers={article.authoringUsers}
              authoringGroups={article.authoringGroups}
              articleHistory={article.history}
              endorsements={article.endorsements}
              comments={article.comments}
            />
            <div>
              Related articles go here
            </div>
          </div>
          <div> {/* Article Body */}
            {article.content}
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
      createdAt
      updatedAt
      title
      abstract
      content
      authoringUsers {
        id
        expunged
        active
        name
      }
      authoringGroups {
        id
        expunged
        active
        name
      }
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
      endorsements {
        id
        name
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


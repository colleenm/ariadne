import React         from 'react'
import {graphql}     from 'react-apollo'
import gql           from 'graphql-tag'
import {utils}       from '../utils'

import Loading       from './Loading'
import {styles}      from '../styles'

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
      <div className='mb2'>
        <a href={'/article/' + article.id} key={article.id}
          className='db f5'>
          {article.title}
        </a>
        {/* TODO real authoring groups, authoring users */}
        <div className='mb1 f6'>
          <a className='white'>Uncertainty Cult</a>,&nbsp;
          <a>imaginarybob</a>
        </div>
        <div className={styles.dullText + ' f6'}>
          <div className='mb1'>
            {/* TODO real date posted/updated */}
            <div>Posted 16 December 2017, 1:37 PM</div>
            <div>Last edited on 17 December 2017, 11:57 AM</div>
          </div>
          <div className='flex mb1'>
            <div>{utils.formatCommentCount(article.comments)}</div>
            <div className='mh2'>&bull;</div>
            <div>{utils.formatEndorsementCount(article.endorsements)}</div>
          </div>
          <div>{snippet}</div>
        </div>
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


import React     from 'react'
import {graphql} from 'react-apollo'
import gql       from 'graphql-tag'

import Loading   from './Loading'
import {paths}   from '../constants/paths'
import {styles}  from '../styles'

class EndorsementsSection extends React.Component {

  render() {
    if (this.props.EndorsementsSectionEntity.loading) {
      return <Loading />
    }

    // Replace 'article' with 'entity' below when we stop using fake data
    const entity = this.props.EndorsementsSectionEntity.Article

    return (
      <div>
        <div className='flex mb1'>
          <div className={styles.grayTitle + ' mr3'}>Endorsements</div>
          <div>
            <button className={styles.button}>Endorse</button>
          </div>
        </div>
        <div>
          {entity.endorsements.length === 0 ? 'No endorsements yet' :
              entity.endorsements.map((endorser) => (
                <a href={paths.user + endorser.id} key={endorser.id}>
                  {endorser.name}
                </a>
              ))
              .reduce((prev, curr) => [prev, ', ', curr])
          }
        </div>
      </div>
    )
  }
}

// TODO: When we stop using graphql-faker, this query should use the entity(id)
//       query, not the article(id) query.
const EndorsementsSectionEntity = gql`
  query EndorsementsSectionEntity($id: ID!) {
    Article(id: $id) {
      id
      expunged
      endorsements {
        id
        name
      }
    }
  }
`

const EndorsementsSectionWithGraphQL =  graphql(EndorsementsSectionEntity, {
  name: 'EndorsementsSectionEntity',
  options: (props) => ({
    variables: {
      id: props.entityId,
    },
  }),
})(EndorsementsSection)

export default EndorsementsSectionWithGraphQL

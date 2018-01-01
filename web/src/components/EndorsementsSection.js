import React         from 'react'
import {graphql}     from 'react-apollo'
import gql           from 'graphql-tag'

import Loading       from './Loading'
import {styles}      from '../styles'

class EndorsementsSection extends React.Component {

  render() {
    if (this.props.EndorsementsSectionEntity.loading) {
      return <Loading />
    }

    // Replace 'article' with 'entity' below when we stop using fake data
    const entity = this.props.EndorsementsSectionEntity.article

    return (
      <div>
        <div className='flex mb1'>
          <div className={styles.sectionTitle + ' mr3'}>Endorsements</div>
          <div>
            <button className={styles.button}>Endorse</button>
          </div>
        </div>
        <div>
          {entity.endorsements.length === 0 ? 'No endorsements yet' :
              entity.endorsements.map((endorser) => (
                <a href={'/user/' + endorser.id} key={endorser.id}>{endorser.name}</a>
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
    article(id: $id) {
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


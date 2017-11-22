import React        from 'react'
import {graphql}    from 'react-apollo'
import Modal        from 'react-modal'
import {withRouter} from 'react-router-dom'
import gql          from 'graphql-tag'

import Loading      from './Loading'
import modalStyle   from '../constants/modalStyle'

const detailModalStyle = {
  overlay: modalStyle.overlay,
  content: {
    ...modalStyle.content,
    height: 761,
  },
}

class UserDetailPage extends React.Component {

  render() {
    if (this.props.userQuery.loading) {
      return <Loading/>
    }

    const {user} = this.props.userQuery

    return (
      <Modal
        isOpen
        style={detailModalStyle}
        onRequestClose={this.props.history.goBack}
      >
        <a
          className='close fixed right-0 top-0 pointer'
          onClick={this.props.history.goBack}
        >
          <i className='material-icons ma5 o-60'>close</i>
        </a>
        <div
          className='bg-white detail flex flex-column no-underline br2 h-100'
        >
          <div
            className='image'
            style={{
              backgroundImage: `url(${user.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              paddingBottom: '100%',
            }}
          />
          <div className='flex justify-between items-center'>
            <div className='flex black-80 f2 fw3 pa3'>
              {user.name}
            </div>
            <div className='flex black-80 f3 fw3 pa3'>
              {user.location}
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

const UserQuery = gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      name
      location
      imageUrl
    }
  }
`
const UserDetailPageWithGraphQL = graphql(UserQuery, {
  name: 'userQuery',
  options: ({match}) => ({
    variables: {
      id: match.params.id,
    },
  }),
})(UserDetailPage)

export default withRouter(UserDetailPageWithGraphQL)

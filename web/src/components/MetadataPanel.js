import React     from 'react'

class MetadataPanel extends React.Component {

  render() {

    return (
      <div className='ba'>
        {/* For articles */}
        <div>
          {this.props.authoringGroups
              .map((group, i, a) => (
                <a href={'#' + group.id} key={group.id}>{group.name}</a>
              ))
              .reduce((prev, curr) => [prev, ', ', curr])
          }
        </div>
        <div>
          {this.props.authoringUsers
              .map((user) => (
                <a href={'#' + user.id} key={user.id}>{user.name}</a>
              ))
              .reduce((prev, curr) => [prev, ', ', curr])
          }
        </div>
        <div>[TODO(cmck) logic to get post date from history]</div>
      </div>
    )

  }
}

export default MetadataPanel

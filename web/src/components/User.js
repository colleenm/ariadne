import React  from 'react'
import {Link} from 'react-router-dom'

export default class User extends React.Component {

  render() {
    return (
      <Link
        to={`/user/${this.props.user.id}`}
        className='bg-white ma3 flex flex-column no-underline br2'
        style={{
          width: `350px`,
          height: '425px',
        }}
        >
        <div
          className='image'
          style={{
            backgroundImage: `url(${this.props.user.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            paddingBottom: '100%',
          }}
          />
        <div className='flex items-center black-80 f3 fw3 pa4'>
          {this.props.user.name}
        </div>
      </Link>
    )
  }

}

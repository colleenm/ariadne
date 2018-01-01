import React         from 'react'
import {graphql}     from 'react-apollo'
import gql           from 'graphql-tag'

import Loading       from './Loading'
import SearchBar     from './SearchBar'

import articlesIcon  from '../assets/article-icon.png'
import avatar        from '../assets/avatar.png'
import bulletinIcon  from '../assets/bulletin-icon.png'
import labyrinthLogo from '../assets/labyrinth.svg'
import menuIcon      from '../assets/menu-icon.png'

class Header extends React.Component {

  render() {
    if (this.props.HeaderData.loading) {
      return <Loading />
    }

    const {user} = this.props.HeaderData

    return (
      <div className='bb b--white-70'>
        <div className='flex justify-between'>
          <div className='dib flex'> {/* Left-justified content */}
            <div className='dib self-center'>
              <img src={labyrinthLogo} alt='labyrinth logo'
                className='ma2 ml3 h2 h2-5-ns' />
            </div>
            <div className='dib bellefair f3 ttu tracked-mega self-center ma2'>
              ariadne
            </div>
          </div>

          <div className='dn dib-l self-center mb1'> {/* Center search bar */}
            <SearchBar />
          </div>

          <div className='dib self-center mr2'> {/* Right-justified content */}
            {user.active === false ? '' :
                <div className='dib'>
                  <a href='/articles/' className='dn dib-l ma2 v-mid'>
                    <img src={articlesIcon} alt='link to articles page' />
                  </a>
                  <a href='/bulletin/'
                    className='dn dib-l ma2 v-mid'>
                    <img src={bulletinIcon} alt='link to bulletin page' />
                  </a>
                </div>
            }
            {/* TODO add alerts widget in v1 */}
            <div className='dn dib-l ma2 v-mid'>
              <a href={'/user/' + user.id}>
                {/* TODO use real avatar */}
                <img src={avatar} alt='user avatar' height='40px'/>
              </a>
            </div>
            <div className='dib dn-l ma2 v-mid'>
              {/* TODO menu should open right-side drawer panel on mobile */}
              <img src={menuIcon} alt='menu icon' />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const HeaderData = gql`
  query HeaderData ($id: ID!) {
    user(id: $id) {
      id
      expunged
      active
    }
  }
`

const HeaderWithGraphQL =  graphql(HeaderData, {
  name: 'HeaderData',
  options: () => ({
    variables: {
      id: '0x1',  // TODO get current user ID
    },
  }),
})(Header)

export default HeaderWithGraphQL


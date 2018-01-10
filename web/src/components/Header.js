import React           from 'react'
import {graphql}       from 'react-apollo'
import gql             from 'graphql-tag'
import {slide as Menu} from 'react-burger-menu'

import Loading         from './Loading'
import SearchBar       from './SearchBar'
import {paths}         from '../constants/paths'
import {styles}        from '../styles'

import articlesIcon    from '../assets/article-icon.png'
import avatar          from '../assets/avatar.png'
import bulletinIcon    from '../assets/bulletin-icon.png'
import labyrinthLogo   from '../assets/labyrinth.svg'
import menuIcon        from '../assets/menu-icon.png'

class Header extends React.Component {

  render() {
    if (this.props.HeaderData.loading) {
      return <Loading />
    }

    const {user} = this.props.HeaderData

    const mobileMenuStyles = {
      'bmBurgerButton': {
        'position': 'fixed',
        'width': '24px',
        'height': '24px',
        'right': '16px',
        'top': '12px',
      },
      'bmCross': {
        'backgroundColor': '#eeeeee',
      },
      'bmMenu': {
        'backgroundColor': '#000',
        'border': '1px solid #eee',
      },
      'bmOverlay': {
        'backgroundColor': 'rgba(0, 0, 0, 0.5)',
        'left': '0',
      },
    }

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
                  <a href={paths.allArticles} className='dn dib-l ma2 v-mid'>
                    <img src={articlesIcon} alt='link to articles page' />
                  </a>
                  <a href={paths.bulletin}
                    className='dn dib-l ma2 v-mid'>
                    <img src={bulletinIcon} alt='link to bulletin page' />
                  </a>
                </div>
            }
            {/* TODO add alerts widget in v1 */}
            <div className='dn dib-l ma2 v-mid'>
              <a href={paths.user + user.id}>
                {/* TODO use real avatar */}
                <img src={avatar} alt='user avatar' height='40px'/>
              </a>
            </div>
          </div>

          <div className='dn-l'>
            <Menu right styles={mobileMenuStyles}
              customBurgerIcon={<img src={menuIcon} className='v-mid' alt='menu icon' />} >
              <div className='pa3'>
                <div>
                  <a href={paths.user + user.id}>
                    {/* TODO use real avatar */}
                    <img src={avatar} alt='user avatar' className='v-mid' height='40px'/>
                    <span className={styles.linkedTitle + ' ml3'}>{user.name}</span>
                  </a>
                </div>
                <div className='mv4'>
                  <a className={styles.linkedTitle + ' menu-item db mb3'}
                    href={paths.allArticles}>All articles</a>
                  <a className={styles.linkedTitle + ' menu-item db mb3'}
                    href={paths.bulletin}>Bulletin</a>
                </div>
                <SearchBar />
                <div className='mv4'>
                  <div className={styles.grayTitle + ' mb2'}>Groups</div>
                  <div className='ml2'>
                    {user.currentGroups.map((group) => (
                      <a href={paths.group + group.id} key={group.id}
                        className={styles.linkedTitle + ' db mb3'}>
                        {group.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Menu>
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
      name
      currentGroups {
        id
        name
      }
    }
  }
`

const HeaderWithGraphQL =  graphql(HeaderData, {
  name: 'HeaderData',
  options: () => ({
    variables: {
      id: process.env.REACT_APP_CURRENT_USER_ID,  // TODO get current user ID
    },
  }),
})(Header)

export default HeaderWithGraphQL


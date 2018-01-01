import React         from 'react'

import searchIcon    from '../assets/search-icon.png'

class SearchBar extends React.Component {

  render() {
    return (
      <div className='bb flex'>
        <input type='text' className='bn w5 pr1 alegreya-300' placeholder='Search'></input>
        {/* TODO make search button submit query based on input */}
        <img src={searchIcon} alt='search button' className='v-btm' />
      </div>
    )
  }
}

export default SearchBar


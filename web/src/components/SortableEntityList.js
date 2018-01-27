import React           from 'react'

import ArticleListItem from './ArticleListItem'
import {styles}        from '../styles'

class SortableEntityList extends React.Component {

  constructor(props) {
    super(props)
    if (Object.keys(this.props.lists).length > 0) {
      this.state = {
        selected: Object.keys(this.props.lists)[0]
      }
    }
  }

  render() {
    const menu = this.formatMenu(this.props.lists)

    return (
      <div>
        {menu}
        <div>
          <div className={styles.dullText + 'i dn db-ns mb2'}>
            {this.formatListLength(this.props.lists[this.state.selected])}
          </div>
          {this.props.lists[this.state.selected].map((item) => {
            let itemEl
            // TODO list items for comments and requests
            if (item.__typename === 'Article') {
              itemEl = <ArticleListItem articleId={item.id} />
            }
            return <div className='mb2' key={item.id}>{itemEl}</div>
          })}
        </div>
      </div>
    )
  }

  // Handles a click on a (desktop) tab label and displays the corresponding
  // list of entities.
  onTabClick = function(typename) {
    this.setState({selected: typename})
  }

  // Handles selection of a (mobile) menu item and displays the corresponding
  // list of entities.
  onMenuSelect = function() {
    this.setState({selected: this.refs.dropdown.value})
  }

  // Returns a label for the length of the given list.
  formatListLength = function(list) {
    return (list.length === 0 ? 'No' : list.length) + ' ' +
      // TODO more robust handling of singular/plural types
      (list.length === 1 ? this.state.selected.toLowerCase().slice(0, -1) :
        this.state.selected.toLowerCase())
  }

  // Returns a menu of entity types available to select from.
  // TODO correct formatting, add dropdown menu to show on mobile
  formatMenu = function(lists) {
    const typeOptions = Object.keys(lists)
    return (
      <div>
        <div className='dn mb2 flex-ns justify-around'> {/* Desktop/tablet tabs */}
          {typeOptions.map((typename) => {
            return (
              <a className={'dib ' + (typename === this.state.selected ?
                  styles.grayTitle : styles.linkedTitle + ' pointer')}
                  onClick={this.onTabClick.bind(this, typename)}
                  key={typename}>
                  {typename}
              </a>
            )
          })}
        </div>

        <div className='flex dn-ns justify-between mb3'> {/* Mobile dropdown */}
          <select onChange={this.onMenuSelect.bind(this)} ref='dropdown'>
            {typeOptions.map((typename) => {
              return (
                <option value={typename} key={typename}>{typename}</option>
              )
            })}
            </select>
            <div className='i'>
              {this.formatListLength(lists[this.state.selected])}
            </div>
          </div>
        </div>
    )
  }
}

export default SortableEntityList

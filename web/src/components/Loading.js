import React       from 'react'
import {BarLoader} from 'react-spinners'

export default class Loading extends React.Component {
  render() {
    return (
      <div className='flex w-100 h-100 items-center justify-center pt7'>
        <BarLoader/>
      </div>
    )
  }
}

import React from 'react'

export default ({ range }) => (
  <div className='header'>
    <div className='header-item'></div>
    { range.map(date => (
        <div
          className='header-item'
          key={date.toString()}>
          {date.toString()}
        </div>
      ))
    }
  </div>
)

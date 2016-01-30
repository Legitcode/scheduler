// Vendor Libraries
import React from 'react'

// Styles
import { chartHeader } from './styles'

export default ({ range }) => (
  <div className='header-wrapper' style={{ display: 'flex', width: '100%' }}>
    <div className='header-placeholder' style={{ width: '5%' }}></div>
    <div className='header-cell-holder' style={{ width: '95%', display: 'flex' }}>
      { range.map(date => (
          <div
            className='header-cell'
            key={date.toRef()}
            style={chartHeader}>
            {date.toCal()}
          </div>
        ))
      }
      </div>
  </div>
)

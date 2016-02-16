// Vendor Libraries
import React from 'react'

// Styles
import { chartHeader } from './styles'

export default ({ range, width }) => (
  <div className='header-wrapper' style={{ display: 'flex', width: width }}>
    <div className='header-placeholder' style={{ width: `${width * 0.05}px` }}></div>
    <div className='header-cell-holder' style={{ width: `${width * 0.95}px`, display: 'flex' }}>
      { range.map(date => (
          <div
            className='header-cell'
            key={date.toRef()}
            style={Object.assign({ width: `${(width * 0.95) / 29 + .99}px` }, chartHeader)}>
            {date.toCal()}
          </div>
        ))
      }
      </div>
  </div>
)

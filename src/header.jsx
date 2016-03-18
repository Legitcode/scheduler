// Vendor Libraries
import React from 'react'

// Styles
import { headerWrapper, chartHeader } from './styles'

export default ({ range, width }) => (
  <div className='header-wrapper' style={Object.assign({ width: width }, headerWrapper)}>
    <div className='header-cell-holder' style={{ marginLeft: `${width * 0.05}px`, width: `${width * 0.95}px`, display: 'flex' }}>
      { range.map(date => (
          <div
            className='header-cell'
            key={date.toRef()}
            style={Object.assign({ width: `${(width * 0.95 / range.daysInRange()) + 1}px` }, chartHeader) }>
            {date.toCal()}
          </div>
        ))
      }
      </div>
  </div>
)

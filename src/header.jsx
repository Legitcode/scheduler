// Vendor Libraries
import React from 'react'

// Styles
import { chartHeader } from './styles'

export default ({ range }) => (
  <div style={{ display: 'flex', width: '100%' }}>
    <div style={{ width: '5%' }}></div>
    <div style={{ width: '95%', display: 'flex' }}>
      { range.map(date => (
          <div
            key={date.toRef()}
            style={chartHeader}>
            {date.toCal()}
          </div>
        ))
      }
      </div>
  </div>
)

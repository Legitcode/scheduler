// Vendor Libraries
import React from 'react'

// Styles
import { resourceSideBar } from './styles'

export default ({ resources, height }) => (
  <div style={{ display: 'flex', flexDirection: 'column', width: '5%' }}>
    { resources.map(resource => (
        <div
          key={resource}
          style={Object.assign({ height, lineHeight: `${height}px` }, resourceSideBar)}>
          {resource}
        </div>
      ))
    }
  </div>
)

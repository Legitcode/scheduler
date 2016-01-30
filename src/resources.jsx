// Vendor Libraries
import React from 'react'

// Styles
import { resourceWrapper, resourceSideBar } from './styles'

export default ({ resources, height }) => (
  <div className='resource-wrapper' style={resourceWrapper}>
    { resources.map(resource => (
        <div
          className='resource-cell'
          key={resource}
          style={Object.assign({ height, lineHeight: `${height}px` }, resourceSideBar)}>
          {resource}
        </div>
      ))
    }
  </div>
)

import React from 'react'

export default ({ resources }) => (
  <div className='resources'>
    {
      resources.map(resource => (
        <div
          className='resource'
          key={resource}>
          {resource}
        </div>
      ))
    }
  </div>
)

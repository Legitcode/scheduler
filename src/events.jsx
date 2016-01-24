import React from 'react'

export default ({ events }) => (
  events.map(event => (
    <div
      key={event.i}
      _grid={event}>
      {event.title}
    </div>
  ))
)

import React from 'react'

export default ({ event }) => (
  <div
    key={event.i}
    _grid={event}>
    {event.title}
  </div>
)

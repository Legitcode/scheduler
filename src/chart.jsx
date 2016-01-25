// Vendor Libraries
import React from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

// Local Libraries
import Event from './event'
import Cell from './cell'

@DragDropContext(HTML5Backend)
export default class Chart extends React.Component {
  renderEvent(resource, date) {
    const currentEvent = this.props.events.find(event => (
      event.resource === resource && event.startDate === date
    ))

    if (currentEvent) return <Event {...currentEvent} />
  }

  renderCell(resource, date) {
    return (
      <div style={{ width: '7.14%', height: '40px' }}>
        <Cell resource={resource} date={date}>
          { this.renderEvent(resource, date) }
        </Cell>
      </div>
    )
  }

  render() {
    const { resources, range } = this.props
    const cells = []

    resources.forEach(resource => {
      range.forEach(date => cells.push(this.renderCell(resource, date.toRef())))
    })

    return (
      <div className='chart'>
        { cells }
      </div>
    )
  }
}

// Vendor Libraries
import React from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

// Local Libraries
import Event from './event'
import Cell from './cell'

// Styles
const cellWrapperStyles = {
  width: '3.66%',
  margin: '0 -1px -1px 0'
}

@DragDropContext(HTML5Backend)
export default class Chart extends React.Component {
  static propTypes = {
    events: React.PropTypes.array.isRequired,
    resources: React.PropTypes.array.isRequired,
    range: React.PropTypes.object.isRequired,
    eventChanged: React.PropTypes.func.isRequired,
    eventResized: React.PropTypes.func.isRequired
  }

  renderEvent(resource, date) {
    const { rowHeight, eventChanged, eventResized } = this.props
    const currentEvent = this.props.events.find(event => {
      return event.resource === resource && event.startDate === date
    })

    if (currentEvent) return (
      <Event
        {...currentEvent}
        rowHeight={rowHeight}
        eventChanged={eventChanged}
        eventResized={eventResized}
      />
    )
  }

  renderCell(resource, date) {
    return (
      <div key={`${resource}${date}`} style={ Object.assign({ height: this.props.rowHeight }, cellWrapperStyles) }>
        <Cell resource={resource} date={date}>
          { this.renderEvent(resource, date) }
        </Cell>
      </div>
    )
  }

  createCells() {
    const { resources, range } = this.props
    const cells = []

    resources.forEach(resource => {
      range.forEach(date => cells.push(this.renderCell(resource, date.toRef())))
    })

    return cells
  }

  render() {
    return (
      <div className='chart' style={{ flexBasis: '95%', overflow: 'hidden', borderBottom: 'solid 1px darkgrey' }}>
        { this.createCells() }
      </div>
    )
  }
}

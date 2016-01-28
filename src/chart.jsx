// Vendor Libraries
import React from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

// Local Libraries
import EventBox from './event_box'
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
    range: React.PropTypes.object.isRequired
  }

  renderEvent(resource, date) {
    const currentEvent = this.props.events.find(event => (
      event.resource === resource && event.startDate === date
    ))

    if (currentEvent) return (
      <EventBox {...currentEvent} rowHeight={this.props.rowHeight}>
        <Event {...currentEvent} />
      </EventBox>
    )
  }

  renderCell(resource, date) {
    return (
      <div style={ Object.assign({ height: this.props.rowHeight }, cellWrapperStyles) }>
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
      <div className='chart' style={{ flexBasis: '95%', overflow: 'hidden', borderBottom: 'solid 1px darkgrey' }}>
        { cells }
      </div>
    )
  }
}

// Vendor Libraries
import React, { PropTypes, Component } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

// Local Libraries
import Event from './event'
import PartialEvent from './partial_event'
import Cell from './cell'
import RangeDate from './range_date'

// Styles
import { chart, cellWrapper } from './styles'

@DragDropContext(HTML5Backend)
export default class Chart extends Component {
  static propTypes = {
    events: PropTypes.array.isRequired,
    resources: PropTypes.array.isRequired,
    range: PropTypes.object.isRequired,
    cells: PropTypes.object.isRequired,
    eventChanged: PropTypes.func.isRequired,
    eventResized: PropTypes.func.isRequired,
    eventClicked: PropTypes.func.isRequired,
    cellClicked: PropTypes.func.isRequired,
    rowHeight: PropTypes.number.isRequired
  }

  renderEvent(resource, date) {
    const { rowHeight, eventChanged, eventResized, eventClicked } = this.props
    const currentEvent = this.props.events.find(event => {
      return event.resource === resource && event.startDate === date
    })

    if (currentEvent) {
      return (
        <Event
          {...currentEvent}
          rowHeight={rowHeight}
          eventChanged={eventChanged}
          eventResized={eventResized}
          eventClicked={eventClicked}
        />
      )
    } else {
      const partialEvent = this.props.events.find(event => {
        let eventEnd = new RangeDate(event.startDate).advance('days', event.duration),
            from = this.props.range.from.value().setHours(0, 0, 0, 0),
            eventStart = (new Date(event.startDate)).setHours(0, 0, 0, 0)

        return (
          eventEnd.toRef() === date &&
          from.valueOf() > eventStart.valueOf() &&
          event.resource === resource
        )
      })

      if (partialEvent) return (
        <PartialEvent
          {...partialEvent}
          rowHeight={rowHeight}
        />
      )
    }
  }

  cellClicked(ev, resource, date) {
    ev.stopPropagation()
    const targetClass = ev.target.attributes[0].value
    if (targetClass !== 'resizer') {
      this.props.cellClicked(resource, date)
    }
  }

  renderCell(resource, date) {
    return (
      <div
        className='cell-wrapper'
        key={`${resource}${date}`}
        style={ Object.assign({ height: this.props.rowHeight }, cellWrapper) }>
        <Cell
          resource={resource}
          date={date}
          onClick={(ev) => ::this.cellClicked(ev, resource, date)}>
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
      <div className='chart' style={chart}>
        { this.createCells() }
      </div>
    )
  }
}

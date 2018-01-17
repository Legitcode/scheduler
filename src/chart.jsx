// Vendor Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import 'legit-rubyfill/array/each_slice';
import 'legit-rubyfill/array/equals';

// Local Libraries
import Event from './event';
import PartialEvent from './partial_event';
import Cell from './cell';
import RangeDate from './range_date';

// Styles
import { chart, cellWrapper } from './styles';

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
    rowHeight: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
  }

  shouldComponentUpdate(nextProps, nextState) {
    let shouldUpdate = true;

    // First test to see if the resources are exactly the same
    if (nextProps.resources.equals(this.props.resources)) { shouldUpdate = false }

    // Now let's look at the events and see if they are different
    nextProps.events.forEach((event, idx) => {
      if (!this.areObjectsEqual(event, this.props.events[idx])) { shouldUpdate = true }
    })

    return shouldUpdate;
  }

  areObjectsEqual(first, second) {
    return Object.keys(first).reduce((prev, curr) => {
      if (first[curr] !== second[curr]) { return false }
    }, true);
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
            from = this.props.range.from.date,
            eventStart = new RangeDate(event.startDate).date

        return (
          eventEnd.toRef() === date &&
          from.isAfter(eventStart, 'day') &&
          event.resource === resource
        )
      })

      if (partialEvent) return (
        <PartialEvent
          {...partialEvent}
          rowHeight={rowHeight}
          eventClicked={eventClicked}
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
    const { width, range } = this.props

    return (
      <div
        className='cell-wrapper'
        key={`${resource}${date}`}
        style={ Object.assign({ width: `${(width * 0.95 / range.daysInRange()) + 1}px`, height: this.props.rowHeight }, cellWrapper) }>
        <Cell
          resource={resource}
          date={date}
          onClick={(ev) => ::this.cellClicked(ev, resource, date)}>
          { this.renderEvent(resource, date) }
        </Cell>
      </div>
    )
  }

  renderRow(resource, idx) {
    const { range, width } = this.props

    return (
      <div key={idx} className='row-wrapper' style={{ width: `${width * 0.95}px`, display: 'flex' }}>
        { range.map(date => this.renderCell(resource, date.toRef())) }
      </div>
    )
  }

  createCells() {
    const { resources } = this.props,
          rows = []

    resources.forEach((resource, idx) => {
      rows.push(this.renderRow(resource, idx))
    })

    return rows
  }

  render() {
    const { width } = this.props

    return (
      <div className='chart' style={Object.assign({ width: `${width * 0.95}px` }, chart) }>
        { this.createCells() }
      </div>
    )
  }
}

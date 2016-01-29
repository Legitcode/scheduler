// Vendor Libraries
import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { fromJS } from 'immutable'

// Local Libraries
import RangeDate from './range_date'
import DateRange from './date_range'
import Layout from './layout'
import reducer from './reducer'

// Styles
const selectorStyles = {
  textAlign: 'center',
  margin: '25px 0'
}

const leftButtonStyle = {
  position: 'relative',
  marginRight: '10px',
  display: 'inline-block',
  width: '2em',
  height: '2em',
  border: '0.25em solid darkgrey',
  borderRadius: '50%',
  verticalAlign: 'middle'
}

const leftButtonAfter = {
  position: 'absolute',
  display: 'inline-block',
  top: '0.4em',
  left: '0.5em',
  width: '0.7em',
  height: '0.7em',
  borderTop: '0.25em solid darkgrey',
  borderRight: '0.25em solid darkgrey',
  transform: 'rotate(-135deg)'
}

const rightButtonStyle = {
  position: 'relative',
  marginLeft: '10px',
  display: 'inline-block',
  width: '2em',
  height: '2em',
  border: '0.25em solid darkgrey',
  borderRadius: '50%',
  verticalAlign: 'middle'
}

const rightButtonAfter = {
  position: 'absolute',
  display: 'inline-block',
  top: '0.4em',
  right: '0.5em',
  width: '0.7em',
  height: '0.7em',
  borderTop: '0.25em solid darkgrey',
  borderLeft: '0.25em solid darkgrey',
  transform: 'rotate(135deg)'
}

export default class Scheduler extends React.Component {
  static propTypes = {
    resources: React.PropTypes.array.isRequired,
    events: React.PropTypes.array.isRequired,
    from: React.PropTypes.string,
    to: React.PropTypes.string,
    range: React.PropTypes.object,
    rowHeight: React.PropTypes.number,
  }

  static defaultProps = {
    from: new RangeDate().toString(),
    to: new RangeDate().advance('weeks', 4).toString(),
    rowHeight: 30
  }

  constructor(props) {
    super(props)

    const range = new DateRange(props.from, props.to),
          { events, resources } = props

    let cells = {}

    resources.forEach(resource => {
      range.forEach(date => cells[`${resource}${date.toRef()}`] = { resource, date: date.toRef() })
    })

    this.state = { range: new DateRange(props.from, props.to) }
    this.store = createStore(reducer, fromJS({ events, resources, cells }))
  }

  previousClicked = (ev) => {
    ev.preventDefault()
    this.changeRange({ 'weeks': -4 })
  }

  nextClicked = (ev) => {
    ev.preventDefault()
    this.changeRange({ 'weeks': 4 })
  }

  changeRange(props) {
    let increment = Object.keys(props)[0],
        amount = props[increment],
        range = this.state.range.advance(increment, amount)

    this.setState({ range })
  }

  addLeftHover = () => {
    this.setState({ leftCursor: 'pointer' })
  }

  addRightHover = () => {
    this.setState({ rightCursor: 'pointer' })
  }

  removeLeftHover = () => {
    this.setState({ leftCursor: 'arrow' })
  }

  removeRightHover = () => {
    this.setState({ rightCursor: 'arrow' })
  }

  fireEventChanged = (props) => {
    const { onEventChanged } = this.props,
          { id, title, startDate, duration, resource, disabled } = props
    if (onEventChanged) onEventChanged({ id, title, startDate, duration, resource, disabled })
  }

  fireEventResized = (props) => {
    const { onEventResized } = this.props,
          { id, title, startDate, duration, resource, disabled } = props
    if (onEventResized) onEventResized({ id, title, startDate, duration, resource, disabled })
  }

  fireEventClicked = (props) => {
    const { onEventClicked } = this.props,
          { id, title, startDate, duration, resource, disabled } = props
    if (onEventClicked) onEventClicked({ id, title, startDate, duration, resource, disabled })
  }

  render() {
    const { range, leftCursor, rightCursor } = this.state,
          mergedLeftButtonStyle = Object.assign({ cursor: leftCursor }, leftButtonStyle),
          mergedRightButtonStyle = Object.assign({ cursor: rightCursor }, rightButtonStyle)

    return (
      <Provider store={this.store}>
        <div>
          <div style={selectorStyles}>
            <div style={mergedLeftButtonStyle} onClick={this.previousClicked} onMouseOver={this.addLeftHover} onMouseLeave={this.removeLeftHover}>
              <div style={leftButtonAfter}></div>
            </div>
            { range.toString() }
            <div style={mergedRightButtonStyle} onClick={this.nextClicked} onMouseOver={this.addRightHover} onMouseLeave={this.removeRightHover}>
              <div style={rightButtonAfter}></div>
            </div>
          </div>
          <Layout
            {...this.props}
            range={range}
            eventChanged={this.fireEventChanged}
            eventResized={this.fireEventResized}
            eventClicked={this.fireEventClicked}
          />
        </div>
      </Provider>
    )
  }
}

// Vendor Libraries
import React, { PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import { DragSource } from 'react-dnd'
import { connect } from 'react-redux'

// Local Libraries
import { ItemTypes } from './constants'
import { moveEvent } from './actions'

const eventSource = {
  beginDrag(props) {
    return {
      resource: props.resource,
      date: props.startDate
    }
  },
  endDrag(props, monitor, component) {
    component.props.dispatch(
      moveEvent(props, monitor.getDropResult())
    )
  },
  canDrag(props) {
    return !props.disabled
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

@DragSource(ItemTypes.EVENT, eventSource, collect)
class Event extends React.Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    resource: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)

    this.state = { cellWidth: 0 }
  }

  componentDidMount() {
    const cellWidth = findDOMNode(this).getBoundingClientRect().width

    this.setState({ cellWidth: cellWidth })
  }

  render() {
    const { connectDragSource, isDragging, title, duration } = this.props,
          { cellWidth } = this.state,
          width = (duration * cellWidth) === 0 ? '100%' : `${duration * cellWidth + (duration * 2) - 2}px`,
          opacity = isDragging ? 0 : 1

    return (
      isDragging ? null :
        connectDragSource(
          <div className='event' style={{ width: width, position: 'relative', top: 0, left: 0, opacity }}>{title}</div>
        )
    )
  }
}

export default connect()(Event)

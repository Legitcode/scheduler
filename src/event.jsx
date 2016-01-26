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
    resource: PropTypes.string.isRequired,
    width: PropTypes.number
  }

  render() {
    const { connectDragSource, isDragging, title, duration, width } = this.props,
          opacity = isDragging ? 0 : 1

    console.log(width)
    return (
      isDragging ? null :
        connectDragSource(
          <div className='event' style={{ width: width, position: 'relative', top: 0, left: 0 }}>
            {title}
          </div>
        )
    )
  }
}

export default connect()(Event)

// Vendor Libraries
import React, { PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import { DragSource } from 'react-dnd'
import { connect } from 'react-redux'

// Local Libraries
import { ItemTypes } from './constants'
import { moveEvent } from './actions'

// Styles
const eventStyles = {
  position: 'relative',
  top: 0,
  left: '4px',
  borderRadius: '3px',
  padding: '2px 5px'
}

const eventSource = {
  beginDrag(props) {
    return {
      resource: props.resource,
      date: props.startDate
    }
  },
  endDrag(props, monitor, component) {
    console.log("FOO")
    console.log(monitor.getSourceClientOffset())
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

    return (
      isDragging ? null :
        connectDragSource(
          <div className='event' style={ Object.assign({ width }, eventStyles) }>
            {title}
          </div>
        )
    )
  }
}

export default connect()(Event)

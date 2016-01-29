// Vendor Libraries
import React, { PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import { DragSource } from 'react-dnd'
import { connect } from 'react-redux'

// Local Libraries
import { resetResizeDispatcher, moveEvent, updateEventDuration } from './actions'
import { ItemTypes } from './constants'

// Styles
const eventStyles = {
  position: 'relative',
  top: 0,
  left: '4px',
  borderRadius: '3px',
  padding: '2px 5px'
}

const resizerStyles = {
  top: 0,
  right: 0,
  width: '5px',
  display: 'inline-block',
  position: 'absolute'
}

const boxStyles = {
  position: 'relative',
  borderRadius: '3px'
}

const eventSource = {
  beginDrag(props, monitor) {
    return {
      resource: props.resource,
      date: props.startDate,
      id: props.id
    }
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) return

    component.props.dispatch(
      moveEvent(props, monitor.getDropResult(), component.state.offset)
    )
  },
  canDrag(props) {
    return !props.disabled
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    pointerOffset: monitor.getInitialClientOffset()
  }
}

@DragSource(ItemTypes.EVENT, eventSource, collect)
class Event extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    resource: PropTypes.string.isRequired,
    dispatch: PropTypes.func,
    eventChanged: PropTypes.func.isRequired,
    eventResized: PropTypes.func.isRequired,
    eventClicked: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {}
  }

  componentWillMount() {
    this.mounted = false
    if (this.props.dispatchChange) this.dispatchChange(this.props)
  }

  componentWillUnmount() {
    this.mounted = false
    document.documentElement.removeEventListener('mousemove', this.doDrag, false)
    document.documentElement.removeEventListener('mouseup', this.stopDrag, false)
  }

  componentDidMount() {
    const { duration, cellWidth } = this.props,
          width = (duration * cellWidth) === 0 ? cellWidth : (duration * cellWidth) - duration - 9

    this.mounted = true
    this.setState({ cellWidth, width, startWidth: width })
    this.refs.resizer.addEventListener('mousedown', this.initDrag, false)
  }

  componentWillReceiveProps(nextProps) {
    const { dispatchResize, pointerOffset, cellLeft, duration, cellWidth } = nextProps,
          width = (duration * cellWidth) === 0 ? cellWidth : duration * cellWidth - duration - 9,
          offset = pointerOffset ? (pointerOffset.x - cellLeft) : 0

    this.setState({ duration, width, startWidth: width })
    if (offset > 0) this.setState({ offset })
    if (dispatchResize) this.dispatchResize(nextProps)
  }

  initDrag = (ev) => {
    const { width } = this.state

    this.setState({
      startX: ev.clientX
    })

    document.documentElement.addEventListener('mousemove', this.doDrag, false)
    document.documentElement.addEventListener('mouseup', this.stopDrag, false)
  }

  doDrag = (ev) => {
    if (this.mounted) {
      const { startWidth, startX } = this.state,
            newWidth = (startWidth + ev.clientX - startX)

      this.setState({ width: newWidth })
    }
  }

  stopDrag = (ev) => {
    const { disabled, dispatch, id, title, startDate, resource, styles } = this.props,
          { width } = this.state,
          newDuration = this.roundToNearest(width)

    dispatch(updateEventDuration({ disabled, id, title, startDate, resource, styles }, newDuration))

    document.documentElement.removeEventListener('mousemove', this.doDrag, false)
    document.documentElement.removeEventListener('mouseup', this.stopDrag, false)
  }

  roundToNearest(numToRound) {
    return Math.ceil(numToRound / this.props.cellWidth)
  }

  dispatchChange(props) {
    this.props.eventChanged(props)
  }

  dispatchResize(props) {
    const { eventResized, dispatch } = this.props,
          { disabled, id, title, startDate, resource, duration, styles } = props
    eventResized(props)
    dispatch(resetResizeDispatcher({ disabled, id, title, startDate, resource, duration, styles }))
  }

  dispatchEventClick(props) {
    this.props.eventClicked(this.props)
  }

  render() {
    const { styles, isDragging, connectDragSource, id, title, children, rowHeight, ...rest } = this.props,
          { width } = this.state,
          boxStyleMerge = Object.assign({ width }, boxStyles),
          resizerStyleMerge = Object.assign({ height: '100%' }, resizerStyles),
          defaultStyles = { color: '#000', backgroundColor: 'darkgrey' },
          eventStyleMerge = Object.assign({ width }, styles || defaultStyles, eventStyles)

    return (
      isDragging ? null :
        <div className='event-box' style={boxStyleMerge} >
          { connectDragSource(
            <div key={id} className='event' style={eventStyleMerge} onClick={::this.dispatchEventClick}>
              {title}
            </div>
          )}
          <span className='resizer' style={resizerStyleMerge} ref='resizer'></span>
        </div>
    )
  }
}

export default connect()(Event)

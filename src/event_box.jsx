// Vendor Libraries
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

// Local Libraries
import { updateEventDuration } from './actions'

// Styles
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

export default class EventBox extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    resource: PropTypes.string.isRequired,
    dispatch: PropTypes.func
  }

  constructor(props) {
    super(props)

    this.state = {}
  }

  componentWillMount() {
    this.mounted = false
  }

  componentWillUnmount() {
    this.mounted = false
    document.documentElement.removeEventListener('mousemove', this.doDrag, false)
    document.documentElement.removeEventListener('mouseup', this.stopDrag, false)
  }

  componentDidMount() {
    const { duration, cellWidth } = this.props,
          width = (duration * cellWidth) === 0 ? cellWidth : (duration * cellWidth) - duration - 8

    console.log(cellWidth)
    this.mounted = true
    this.setState({ cellWidth, width, startWidth: width })
    this.refs.resizer.addEventListener('mousedown', this.initDrag, false)
  }

  componentWillReceiveProps(nextProps) {
    const { duration, cellWidth } = nextProps,
          width = (duration * cellWidth) === 0 ? cellWidth : duration * cellWidth - duration - 8

    this.setState({ duration, width, startWidth: width })
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
    const { disabled, dispatch, id, title, startDate, resource } = this.props,
          { width } = this.state,
          newDuration = this.roundToNearest(width)

    dispatch(updateEventDuration({ disabled, id, title, startDate, resource }, newDuration))

    document.documentElement.removeEventListener('mousemove', this.doDrag, false)
    document.documentElement.removeEventListener('mouseup', this.stopDrag, false)
  }

  roundToNearest(numToRound) {
    return Math.ceil(numToRound / this.props.cellWidth)
  }

  render() {
    const { children, rowHeight, ...rest } = this.props,
      { width } = this.state,
      boxStyleMerge = Object.assign({ width }, boxStyles),
      resizerStyleMerge = Object.assign({ height: '100%' }, resizerStyles)

    return (
      <div className='event-box' style={boxStyleMerge}>
        { React.Children.map(children, child => React.cloneElement(child, { width, ...rest })) }
        <span className='resizer' style={resizerStyleMerge} ref='resizer'></span>
      </div>
    )
  }
}

export default connect()(EventBox)

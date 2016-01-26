// Vendor Libraries
import React, { PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'

// Local Libraries
import { updateEventDuration } from './actions'

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

  componentDidMount() {
    const { duration } = this.props,
          node = findDOMNode(this),
          cellWidth = node.getBoundingClientRect().width,
          width = (duration * cellWidth) === 0 ? cellWidth : duration * cellWidth + (duration * 2) - 7

    this.setState({ cellWidth, width, startWidth: width })
    this.refs.resizer.addEventListener('mousedown', this.initDrag, false)
  }

  componentWillReceiveProps(nextProps) {
    const { duration } = nextProps,
          { cellWidth } = this.state,
          width = (duration * cellWidth) === 0 ? cellWidth : duration * cellWidth + (duration * 2) - 7

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
    const { startWidth, startX } = this.state,
          newWidth = (startWidth + ev.clientX - startX)

    this.setState({ width: newWidth })
  }

  stopDrag = (ev) => {
    const { dispatch, id, title, startDate, resource } = this.props,
          { width } = this.state,
          newDuration = this.roundToNearest(width)

    dispatch(updateEventDuration({ id, title, startDate, resource }, newDuration))

    document.documentElement.removeEventListener('mousemove', this.doDrag, false)
    document.documentElement.removeEventListener('mouseup', this.stopDrag, false)
  }

  roundToNearest(numToRound) {
    return Math.ceil(numToRound / this.state.cellWidth)
  }

  render() {
    const { children, key, ...rest } = this.props,
          { width } = this.state

    let divWidth = width + 5

    return (
      <div className='event-box' key={key} style={{ width, position: 'relative' }}>
        { React.Children.map(children, child => React.cloneElement(child, { width, ...rest })) }
        <span className='resizer' style={{ top: 0, right: 0, width: '5px', height: '20px', display: 'inline-block', backgroundColor: 'black', position: 'absolute' }} ref='resizer'></span>
      </div>
    )
  }
}

export default connect()(EventBox)

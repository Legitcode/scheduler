// Vendor Libraries
import React  from 'react'
import PropTypes from 'prop-types';

// Styles
import { partialEventStyles, boxStyles } from './styles'

export default class PartialEvent extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    resource: PropTypes.string.isRequired,
    dispatch: PropTypes.func,
    cellWidth: PropTypes.number,
    disabled: PropTypes.bool,
    id: PropTypes.string.isRequired,
    styles: PropTypes.object,
    rowHeight: PropTypes.number.isRequired,
    children: PropTypes.node,
    eventClicked: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    const { duration, cellWidth } = this.props,
          width = (duration * cellWidth) === 0 ? cellWidth : (duration * cellWidth) - duration - 9

    this.setState({ cellWidth, width, startWidth: width })
  }

  componentWillReceiveProps(nextProps) {
    const { duration, cellWidth } = nextProps,
          width = (duration * cellWidth) === 0 ? cellWidth : duration * cellWidth - duration - 9

    this.setState({ duration, width, startWidth: width })
  }

  dispatchEventClick(ev) {
    ev.stopPropagation()
    this.props.eventClicked(this.props)
  }

  render() {
    const { styles, id, title, children, rowHeight, ...rest } = this.props,
          { width } = this.state,
          defaultStyles = { color: '#000', backgroundColor: 'darkgrey' },
          eventStyleMerge = Object.assign({ width }, styles || defaultStyles, partialEventStyles),
          boxStyleMerge = Object.assign({ height: '100%', top: '2px', width }, boxStyles)

    return (
      <div className='event-box' style={boxStyleMerge}>
        <div className='event' style={eventStyleMerge} onClick={::this.dispatchEventClick}>
          {title}
        </div>
      </div>
    )
  }
}

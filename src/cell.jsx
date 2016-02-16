// Vendor Libraries
import React, { PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import { DropTarget } from 'react-dnd'

// Local LIbraries
import { ItemTypes } from './constants'

// Styles
import { cell } from './styles'

const cellTarget = {
  drop(props, monitor, component) {
    return Object.assign(component.state, props)
  },
  canDrop(props) {
    return !props.children
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

@DropTarget(ItemTypes.EVENT, cellTarget, collect)
export default class Cell extends React.Component {
  static propTypes = {
    resource: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
    this.state = { cellWidth: 0 }
  }

  componentDidMount() {
    const node = findDOMNode(this),
          rect = node.getBoundingClientRect(),
          cellWidth = rect.width

    this.setState({ cellWidth })
  }

  render() {
    const { children, connectDropTarget, onClick } = this.props

    return (
      connectDropTarget(
        <div className='cell' style={cell} onClick={onClick}>
          { React.Children.map(children, child => React.cloneElement(child, this.state)) }
        </div>
      )
    )
  }
}

// Vendor Libraries
import React, { PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import { DropTarget } from 'react-dnd'

// Local LIbraries
import { ItemTypes } from './constants'

const cellTarget = {
  drop(props) {
    return props
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
    this.state = {}
  }

  componentDidMount() {
    const node = findDOMNode(this),
          cellWidth = node.getBoundingClientRect().width

    this.setState({ cellWidth })
  }

  render() {
    const { children, connectDropTarget } = this.props

    return (
      connectDropTarget(
        <div className='cell'>
          { React.Children.map(children, child => React.cloneElement(child, { cellWidth: this.state.cellWidth })) }
        </div>
      )
    )
  }
}

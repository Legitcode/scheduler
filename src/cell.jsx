// Vendor Libraries
import React, { PropTypes } from 'react'
import { DropTarget } from 'react-dnd'

// Local LIbraries
import { ItemTypes } from './constants'

const cellTarget = {
  drop(props, monitor) {
    return props
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

  render() {
    const { children, connectDropTarget, isOver } = this.props

    return (
      connectDropTarget(
        <div className='cell'>
          { children }
        </div>
      )
    )
  }
}

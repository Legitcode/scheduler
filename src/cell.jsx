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
    super(props);
    this.state = { cellWidth: 0 };
  }

  componentDidMount() {
    const node = findDOMNode(this);
    const rect = node.getBoundingClientRect();
    const cellWidth = rect.width + 2;

    this.setState({ cellWidth });
  }

  shouldComponentUpdate(nextProps, nextState) {
    //if (this.state.cellWidth !== nextState.cellWidth) { shouldUpdate = true }
    //if (nextProps.resource !== this.props.resource) { shouldUpdate = true }
    //if (nextProps.date !== this.props.date) { shouldUpdate = true }
    //if (nextProps.children && !this.props.children) { shouldUpdate = true }

    if (!this.areObjectsEqual(this.props.children, nextProps.children)) { return true }

    return false;
  }

  areObjectsEqual(first = {}, second = {}) {
    return Object.keys(first).reduce((prev, curr) => {
      if (first[curr] !== second[curr]) { return false }
    }, true);
  }

  render() {
    const { children, connectDropTarget, onClick } = this.props;

    return (
      connectDropTarget(
        <div className='cell' style={cell} onClick={onClick}>
          { React.Children.map(children, child => React.cloneElement(child, this.state)) }
        </div>
      )
    )
  }
}

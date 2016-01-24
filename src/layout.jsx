// Vendor Libraries
import React from 'react'
import { findDOMNode } from 'react-dom'
import Draggable from 'react-draggable'
import ReactGridLayout from 'react-grid-layout'

// Local Libraries
import Header from './header'
import Resources from './resources'

export default class Layout extends React.Component {
  static propTypes = {
    resources: React.PropTypes.array.isRequired,
    range: React.PropTypes.object.isRequired,
    events: React.PropTypes.array.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    let bounds = this.refs.body.getBoundingClientRect()

    this.setState({
      bounds: {
        top: bounds.top,
        left: bounds.left,
        right: bounds.right,
        bottom: bounds.bottom,
        height: bounds.height,
        width: bounds.width
      }
    })
  }

  renderDraggable = () => (
    <Draggable grid={[79, 47]} bounds={this.state}><div>{`${"foo"} Drag`}</div></Draggable>
  )

  render() {
    const { events, range, resources } = this.props

    console.log(this.state)
    return (
      <div className='scheduler'>
        <table>
          <thead>
            <tr>
              <td></td>
              { range.map(date => (
                  <td key={date.toString()}>{date.toString()}</td>
                ))
              }
            </tr>
          </thead>
          <tbody ref='body'>
            { resources.map(resource => (
                <tr key={resource}>
                  <td>{resource}</td>
                  {(new Array(14)).fill((<td></td>))}
                </tr>
              ))
            }
          </tbody>
        </table>
        <Draggable grid={[79,47]} start={{ x: 50, y: 50 }}><div>Drag Me</div></Draggable>
      </div>
    )
  }
}

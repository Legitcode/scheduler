// Vendor Libraries
import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

// Local Libraries
import Chart from './chart'
import Header from './header'
import Resources from './resources'

class Layout extends Component {
  static propTypes = {
    resources: PropTypes.array.isRequired,
    range: PropTypes.object.isRequired,
    events: PropTypes.array.isRequired,
    eventChanged: PropTypes.func.isRequired,
    eventResized: PropTypes.func.isRequired,
    eventClicked: PropTypes.func.isRequired,
    cellClicked: PropTypes.func.isRequired,
    width: PropTypes.number.isRequired
  }

  render() {
    const { width, range, resources, rowHeight } = this.props

    return (
      <div style={{ width: width }}>
        <Header range={range} width={width} />
        <div style={{ display: 'flex', width: width }}>
          <Resources height={rowHeight} resources={resources} />
          <Chart {...this.props} />
        </div>
      </div>
    )
  }
}

export default connect(state => {
  const { range } = state.range.toJS()
  const { resources, events } = state.event.toJS()
  return { range, resources, events }
})(Layout)

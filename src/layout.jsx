// Vendor Libraries
import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

// Local Libraries
import Chart from './chart'
import Header from './header'
import Resources from './resources'
import RangeSelector from './range_selector'

class Layout extends Component {
  static propTypes = {
    resources: PropTypes.array.isRequired,
    range: PropTypes.object.isRequired,
    events: PropTypes.array.isRequired,
    cells: PropTypes.object.isRequired,
    eventChanged: PropTypes.func.isRequired,
    eventResized: PropTypes.func.isRequired,
    eventClicked: PropTypes.func.isRequired,
    cellClicked: PropTypes.func.isRequired,
    rangeChanged: PropTypes.func.isRequired,
    rangeDidChange: PropTypes.bool.isRequired,
    width: PropTypes.number.isRequired,
    rowHeight: PropTypes.number.isRequired
  }

  render() {
    const { rangeDidChange, rangeChanged, width, range, resources, rowHeight } = this.props

    return (
      <div style={{ width: width }}>
        <RangeSelector range={range} rangeChanged={rangeChanged} rangeDidChange={rangeDidChange} />
        <div className='layout-wrapper' style={{ width: width }}>
          <Header range={range} width={width} />
          <div className='chart-wrapper' style={{ display: 'flex', width: width }}>
            <Resources height={rowHeight} resources={resources} />
            <Chart {...this.props} />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => {
  const { rangeDidChange, range } = state.range.toJS()
  const { resources, events } = state.event.toJS()
  const { cells } = state.cells.toJS()
  return { rangeDidChange, cells, range, resources, events }
})(Layout)

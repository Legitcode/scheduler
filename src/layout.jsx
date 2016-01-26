// Vendor Libraries
import React from 'react'
import { connect } from 'react-redux'

// Local Libraries
import Chart from './chart'

class Layout extends React.Component {
  static propTypes = {
    resources: React.PropTypes.array.isRequired,
    range: React.PropTypes.object.isRequired,
    events: React.PropTypes.array.isRequired
  }

  render() {
    const { range } = this.props

    return (
      <div>
        <div style={{ display: 'flex' }}>
          { range.map(date => (
              <div
                style={{ width: '7.14%', border: 'solid 1px darkgrey' }}>
                {date.toString()}
              </div>
            ))
          }
        </div>
        <Chart {...this.props} />
      </div>
    )
  }
}

export default connect((props) => props.toJS())(Layout)

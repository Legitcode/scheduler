// Vendor Libraries
import React from 'react'
import { connect } from 'react-redux'

// Local Libraries
import Chart from './chart'

// Styles
const headerStyles = {
  width: '3.66%',
  border: 'solid 1px darkgrey',
  margin: '0 -1px -1px 0',
  padding: '0 4px',
}

const resourceStyles = {
  border: 'solid 1px darkgrey',
  margin: '0 -1px -1px 0',
  textAlign: 'center'
}

class Layout extends React.Component {
  static propTypes = {
    resources: React.PropTypes.array.isRequired,
    range: React.PropTypes.object.isRequired,
    events: React.PropTypes.array.isRequired,
    eventChanged: React.PropTypes.func.isRequired,
    eventResized: React.PropTypes.func.isRequired
  }

  render() {
    const { range, resources, rowHeight } = this.props,
          mergedResourceStyle = Object.assign({ height: rowHeight, lineHeight: `${rowHeight}px` }, resourceStyles)

    return (
      <div>
        <div style={{ display: 'flex' }}>
          <div style={{ flexBasis: '5%' }}></div>
          <div style={{ flexBasis: '95%', display: 'flex' }}>
            { range.map(date => (
                <div
                  key={date.toRef()}
                  style={headerStyles}>
                  {date.toCal()}
                </div>
              ))
            }
            </div>
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex', flexDirection: 'column', flexBasis: '5%' }}>
            { resources.map(resource => (
                <div
                  key={resource}
                  style={mergedResourceStyle}>
                  {resource}
                </div>
              ))
            }
          </div>
          <Chart {...this.props} />
        </div>
      </div>
    )
  }
}

export default connect((props) => props.toJS())(Layout)

// Vendor Libraries
import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

// Actions
import { advanceRange, retardRange } from './actions/range'

// Styles
import { selectors, leftButton, leftButtonAfter, rightButton, rightButtonAfter } from './styles'

class RangeSelector extends Component {
  static propTypes = {
    leftCursor: PropTypes.string,
    rightCursor: PropTypes.string,
    range: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  static defaultProps = {
    leftCursor: 'arrow',
    rightCursor: 'arrow'
  }

  constructor(props) {
    super(props)

    this.state = {}
  }

  addLeftHover = () => {
    this.setState({ leftCursor: 'pointer' })
  }

  addRightHover = () => {
    this.setState({ rightCursor: 'pointer' })
  }

  removeLeftHover = () => {
    this.setState({ leftCursor: 'arrow' })
  }

  removeRightHover = () => {
    this.setState({ rightCursor: 'arrow' })
  }

  previousClicked() {
    this.props.dispatch(retardRange())
  }

  nextClicked() {
    this.props.dispatch(advanceRange())
  }

  render() {
    const { leftCursor, rightCursor } = this.state,
          { range } = this.props,
          mergedLeftButtonStyle = Object.assign({ cursor: leftCursor }, leftButton),
          mergedRightButtonStyle = Object.assign({ cursor: rightCursor }, rightButton)

    return (
      <div className='selector-holder' style={selectors}>
        <div
          className='selector-left'
          style={mergedLeftButtonStyle}
          onClick={::this.previousClicked}
          onMouseOver={this.addLeftHover}
          onMouseLeave={this.removeLeftHover}>
          <div style={leftButtonAfter}></div>
        </div>
        <div className='selector-range' style={{ display: 'inline-block' }}>
          { range.toString() }
        </div>
        <div
          className='selector-right'
          style={mergedRightButtonStyle}
          onClick={::this.nextClicked}
          onMouseOver={this.addRightHover}
          onMouseLeave={this.removeRightHover}>
          <div style={rightButtonAfter}></div>
        </div>
      </div>
    )
  }
}

export default connect(state => state.range.toJS())(RangeSelector)

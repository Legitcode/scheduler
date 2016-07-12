// Vendor Libraries
import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

// Actions
import { advanceRange, retardRange, clearRangeFlag } from './actions/range'

// Styles
import { selectors, leftButton, leftButtonAfter, rightButton, rightButtonAfter } from './styles'

class RangeSelector extends Component {
  static propTypes = {
    range: PropTypes.object.isRequired,
    rangeDidChange: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    rangeChanged: PropTypes.func.isRequired,
    leftCursor: PropTypes.string,
    rightCursor: PropTypes.string
  }

  constructor(props) {
    super(props)

    this.state = {}
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.rightCursor === nextState.rightCursor) {
      return false;
    }

    if (this.state.leftCursor === nextState.leftCursor) {
      return false;
    }

    return true;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.rangeDidChange) {
      this.props.dispatch(clearRangeFlag())
      this.props.rangeChanged(nextProps.range)
    }
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

export default connect()(RangeSelector)

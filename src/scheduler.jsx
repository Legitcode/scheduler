// Vendor Libraries
import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { fromJS } from 'immutable'

// Local Libraries
import RangeDate from './range_date'
import DateRange from './date_range'
import Layout from './layout'
import reducer from './reducer'

export default class Scheduler extends React.Component {
  static propTypes = {
    resources: React.PropTypes.array.isRequired,
    events: React.PropTypes.array.isRequired,
    from: React.PropTypes.string,
    to: React.PropTypes.string
  }

  static defaultProps = {
    from: new RangeDate().toString(),
    to: new RangeDate().advance('weeks', 2).toString()
  }

  constructor(props) {
    super(props)
    this.state = { range: new DateRange(props.from, props.to) }
    this.store = createStore(reducer, fromJS({ events: props.events }))
  }

  previousClicked = (ev) => {
    ev.preventDefault()
    this.changeRange({ 'weeks': -2 })
  }

  nextClicked = (ev) => {
    ev.preventDefault()
    this.changeRange({ 'weeks': 2 })
  }

  changeRange(props) {
    let increment = Object.keys(props)[0],
        amount = props[increment],
        range = this.state.range.advance(increment, amount)

    this.setState({ range })
  }

  render() {
    const { range } = this.state,
          { resources, events } = this.props

    return (
      <Provider store={this.store}>
        <div>
          <button onClick={this.previousClicked}>&lsaquo;</button>
          { range.toString() }
          <button onClick={this.nextClicked}>&rsaquo;</button>
          <Layout resources={resources} range={range} events={events} />
        </div>
      </Provider>
    )
  }
}

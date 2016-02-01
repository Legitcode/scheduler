// Vendor Libraries
import React, { PropTypes, Component } from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

// Local Libraries
import RangeDate from './range_date'
import DateRange from './date_range'
import RangeSelector from './range_selector'
import Layout from './layout'
import reducers from './reducers'

// Actions
import { createCells } from './actions/cells'
import { replaceResources, replaceEvents } from './actions/events'
import { setRange } from './actions/range'

// Create the store
const store = createStore(reducers)

export default class Scheduler extends Component {
  static propTypes = {
    resources: PropTypes.array.isRequired,
    events: PropTypes.array.isRequired,
    from: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    to: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    rowHeight: PropTypes.number,
    width: PropTypes.number.isRequired
  }

  static defaultProps = {
    from: new RangeDate(),
    to: new RangeDate().advance('weeks', 4),
    rowHeight: 30,
    selectorStyles: {},
    chartStyles: {}
  }

  componentWillMount() {
    const { resources, from, to } = this.props,
          range = new DateRange(from, to)

    this.initializeStore(this.props)
    store.dispatch(createCells(resources, range))
  }

  componentWillReceiveProps(nextProps) {
    this.initializeStore(nextProps)
  }

  initializeStore(props) {
    const { dispatch, resources, events, from, to } = props,
          range = new DateRange(from, to)

    store.dispatch(setRange(range))
    store.dispatch(replaceResources(resources))
    store.dispatch(replaceEvents(events))
  }

  fireEventChanged = (props) => {
    const { onEventChanged } = this.props,
          { id, title, startDate, duration, resource, disabled } = props
    if (onEventChanged) onEventChanged({ id, title, startDate, duration, resource, disabled })
  }

  fireEventResized = (props) => {
    const { onEventResized } = this.props,
          { id, title, startDate, duration, resource, disabled } = props
    if (onEventResized) onEventResized({ id, title, startDate, duration, resource, disabled })
  }

  fireEventClicked = (props) => {
    const { onEventClicked } = this.props,
          { id, title, startDate, duration, resource, disabled } = props
    if (onEventClicked) onEventClicked({ id, title, startDate, duration, resource, disabled })
  }

  fireCellClicked = (resource, date) => {
    const { onCellClicked } = this.props
    if (onCellClicked) onCellClicked(resource, date)
  }

  render() {
    const { range, selectorStyles, width } = this.props

    return (
      <Provider store={store}>
        <div style={{ width: width }}>
          <RangeSelector selectorStyles={selectorStyles} />
          <Layout
            {...this.props}
            eventChanged={this.fireEventChanged}
            eventResized={this.fireEventResized}
            eventClicked={this.fireEventClicked}
            cellClicked={this.fireCellClicked}
          />
        </div>
      </Provider>
    )
  }
}

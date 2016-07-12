// Vendor Libraries
import React, { PropTypes, Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { batchActions, enableBatching } from 'redux-batched-actions'

// Local Libraries
import RangeDate from './range_date'
import DateRange from './date_range'
import Layout from './layout'
import reducers from './reducers'

// Actions
import { createCells } from './actions/cells'
import { replaceResources, replaceEvents } from './actions/events'
import { setRange } from './actions/range'

// Promise Middleware
const promiseMiddleware = store => next => action => {
  const { callback, nextAction, type, ...rest } = action
  if (!nextAction && !callback) {
    return next(action)
  }

  var p = new Promise((resolve) => {
    next({ ...rest, type: type })
    resolve(store.getState())
  })

  p.then(state => {
    if (nextAction) {
      next({ ...rest, type: action.nextAction, range: state.range.toJS().range, resources: state.event.toJS().resources })
    } else {
      let id = action.event.id;
      let index = state.event.get('events').findIndex(i => i.get('id') === id);

      callback(state.event.getIn(['events', index]).toJS());
    }
  }).
  catch(ex => {
    next({ ...rest, ex, type: type + '_FAILURE' })
    throw new Error(ex)
  })
}

// Create the store
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore)
const store = createStoreWithMiddleware(enableBatching(reducers))

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
    width: PropTypes.number.isRequired,
    onEventChanged: PropTypes.func,
    onEventResized: PropTypes.func,
    onEventClicked: PropTypes.func,
    onCellClicked: PropTypes.func,
    onRangeChanged: PropTypes.func
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
    const { resources, events, from, to } = props,
          range = new DateRange(from, to)

    store.dispatch(batchActions([
      setRange(range),
      replaceResources(resources),
      replaceEvents(events)
    ]))
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

  fireRangeChanged = (range) => {
    const { onRangeChanged } = this.props
    if (onRangeChanged) onRangeChanged(range)
  }

  render() {
    return (
      <Provider store={store}>
        <Layout
          {...this.props}
          rangeChanged={this.fireRangeChanged}
          eventChanged={this.fireEventChanged}
          eventResized={this.fireEventResized}
          eventClicked={this.fireEventClicked}
          cellClicked={this.fireCellClicked}
        />
      </Provider>
    )
  }
}

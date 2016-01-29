import { Map } from 'immutable'

import RangeDate from '../range_date'
import DateRange from '../date_range'

const from = new RangeDate()
const to = new RangeDate().advance('weeks', 4)
const defaultState = Map({
  range: new DateRange(from, to)
})

export default (state = defaultState, action) => {
  switch(action.type) {
    case 'setRange':
      return state.set('range', action.range)
    case 'advanceRange':
      const newRange = state.get('range').advance('weeks', 4)
      return state.set('range', newRange)
    case 'retardRange':
      const newRange = state.get('range').advance('weeks', -4)
      return state.set('range', newRange)
    default:
      return state
  }
}

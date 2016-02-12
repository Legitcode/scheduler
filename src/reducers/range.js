import { Map } from 'immutable'

import RangeDate from '../range_date'
import DateRange from '../date_range'

const from = new RangeDate()
const to = new RangeDate().advance('weeks', 4)

const defaultState = Map({
  range: new DateRange(from, to),
  rangeDidChange: false
})

export default (state = defaultState, action) => {
  let newRange

  switch(action.type) {
    case 'setRange':
      return state.setIn(['range'], action.range)
    case 'advanceRange':
      newRange = state.get('range').advance('weeks', 4)
      return state.withMutations(map => {
        map.set('range', newRange).
          set('rangeDidChange', true)
      })
    case 'retardRange':
      newRange = state.get('range').advance('weeks', -4)
      return state.withMutations(map => {
        map.set('range', newRange).
          set('rangeDidChange', true)
      })
    case 'clearRangeFlag':
      return state.setIn(['rangeDidChange'], false)
    default:
      return state
  }
}

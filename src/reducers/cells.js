import { Map, fromJS } from 'immutable'

const defaultState = Map({
  cells: Map({})
})

export default (state = defaultState, action) => {
  switch(action.type) {
    case 'createCells':
      const { range, resources } = action
      let cells = Map({})

      resources.forEach(resource => {
        range.forEach(date => {
          cells = cells.setIn([`${resource}${date.toRef()}`], Map({ resource: resource, date: date.toRef()}))
        })
      })

      return fromJS({ cells: cells })
    default:
      return state
  }
}

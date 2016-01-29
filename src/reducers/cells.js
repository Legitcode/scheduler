import { Map, fromJS } from 'immutable'

const defaultState = Map({
  cells: {}
})

export default (state = defaultState, action) => {
  switch(action.type) {
    case 'updateCell':
      return state.withMutations(map => {
        map.setIn(['cells', action.key, 'cellTop'], action.cellTop).
          setIn(['cells', action.key, 'cellLeft'], action.cellLeft).
          setIn(['cells', action.key, 'cellWidth'], action.cellWidth).
          setIn(['cells', action.key, 'cellRight'], action.cellRight)
      })
    case 'createCells':
      const { range, resources } = action
      let cells = {}

      resources.forEach(resource => {
        range.forEach(date => cells[`${resource}${date.toRef()}`] = { resource, date: date.toRef() })
      })

      return fromJS({ cells: cells })
    default:
      return state
  }
}

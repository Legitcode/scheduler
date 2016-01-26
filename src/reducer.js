import { Map } from 'immutable'

let defaultState = Map({
  events: []
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'moveEvent':
      if (!action.cell) return state

      const newEvent = Map(action.event).withMutations(map => {
        map.set('startDate', action.cell.date).set('resource', action.cell.resource)
      })

      const index = state.get('events').findIndex(item => {
        return item.get('id') === action.event.id
      })

      return state.updateIn(['events'], events => (
        events.set(index, newEvent)
      ))
    default:
      return state
  }
}

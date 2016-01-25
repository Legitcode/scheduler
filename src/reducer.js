import { Map } from 'immutable'

let defaultState = Map({
  events: []
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'moveEvent':
      if (!action.cell) return state

      const index = state.get('events').findIndex(item => {
        return item.get('id') === action.event.id
      })

      const newEvent = Map(action.event).withMutations(map => {
        map.set('startDate', action.cell.date).set('resource', action.cell.resource)
      })

      let newEvents = state.get('events').set(index, newEvent)
      return Map({ events: newEvents })
    default:
      return state
  }
}

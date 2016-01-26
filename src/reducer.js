import { Map } from 'immutable'

let defaultState = Map({
  events: []
})

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'moveEvent':
      if (!action.cell) return state

      const newEvent = Map(action.event).withMutations(map => {
        map.set('startDate', action.cell.date).
          set('resource', action.cell.resource).
          set('uuid', guid())
      })

      const index = state.get('events').findIndex(item => {
        return item.get('id') === action.event.id
      })

      return state.updateIn(['events'], events => (
        events.set(index, newEvent)
      ))
    case 'updateEventDuration':
      const newEvent = Map(action.event).set('duration', action.duration)
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

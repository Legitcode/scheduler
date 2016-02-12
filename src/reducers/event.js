import { Map, fromJS } from 'immutable'

const defaultState = Map({
  events: [],
  resources: []
})

export default (state = defaultState, action) => {
  let index, newEvent

  switch (action.type) {
    case 'replaceResources':
      const resources = fromJS(action.resources)
      return state.setIn(['resources'], resources)
    case 'replaceEvents':
      const events = fromJS(action.events)
      return state.setIn(['events'], events)
    case 'moveEvent':
      newEvent = Map(action.event).withMutations(map => {
        map.set('startDate', action.cell.date).
          set('resource', action.cell.resource)
      }).filter((value, key) => ['styles', 'duration', 'id', 'resource', 'startDate', 'title'].includes(key))

      index = state.get('events').findIndex(item => {
        return item.get('id') === action.event.id
      })

      return state.setIn(['events', index], newEvent)
    case 'updateEventDuration':
      newEvent = Map(action.event).withMutations(map => {
        map.set('duration', action.duration)
      })
      index = state.get('events').findIndex(item => {
        return item.get('id') === action.event.id
      })

      return state.setIn(['events', index], newEvent)
    default:
      return state
  }
}

import { Map, fromJS } from 'immutable'

const defaultState = Map({
  events: [],
  resources: []
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'replaceResources':
      const resources = fromJS(action.resources)
      return state.setIn(['resources'], resources)
    case 'replaceEvents':
      const events = fromJS(action.events)
      return state.setIn(['events'], events)
    case 'moveEvent':
      const pointerDestination = action.cell.cellLeft - action.offset + action.cell.cellWidth
      const cells = fromJS(action.cells)
      const cell = cells.find(c => {
        return pointerDestination >= c.get('cellLeft') &&
          pointerDestination <= c.get('cellRight')
      })

      const newEvent = Map(action.event).withMutations(map => {
        map.set('startDate', cell.get('date')).
          set('resource', action.cell.resource).
          set('dispatchChange', true)
      }).filter((value, key) => ['styles', 'dispatchChange', 'duration', 'id', 'resource', 'startDate', 'title'].includes(key))

      const index = state.get('events').findIndex(item => {
        return item.get('id') === action.event.id
      })

      return state.updateIn(['events'], events => (
        events.set(index, newEvent)
      ))
    case 'updateEventDuration':
      const newEvent = Map(action.event).withMutations(map => {
        map.set('duration', action.duration).
          set('dispatchResize', true)
      })
      const index = state.get('events').findIndex(item => {
        return item.get('id') === action.event.id
      })

      return state.updateIn(['events'], events => (
        events.set(index, newEvent)
      ))
    case 'resetResizeDispatcher':
      const newEvent = Map(action.event).set('dispatchResize', false)
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

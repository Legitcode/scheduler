import { Map } from 'immutable'

let defaultState = Map({
  events: [],
  resources: [],
  cells: {}
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'moveEvent':
      const pointerDestination = action.cell.cellLeft - action.offset + action.cell.cellWidth

      const cell = state.get('cells').find(c => {
        return pointerDestination >= c.get('cellLeft') &&
          pointerDestination <= c.get('cellRight')
      })

      const newEvent = Map(action.event).withMutations(map => {
        map.set('startDate', cell.get('date')).
          set('resource', action.cell.resource).
          set('dispatchChange', true)
      }).filter((value, key) => ['dispatchChange', 'duration', 'id', 'resource', 'startDate', 'title'].includes(key))

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
    case 'updateCell':
      return state.withMutations(map => {
        map.setIn(['cells', action.key, 'cellTop'], action.cellTop).
          setIn(['cells', action.key, 'cellLeft'], action.cellLeft).
          setIn(['cells', action.key, 'cellWidth'], action.cellWidth).
          setIn(['cells', action.key, 'cellRight'], action.cellRight)
      })
    default:
      return state
  }
}

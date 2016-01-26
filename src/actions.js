export function moveEvent(event, cell) {
  return {
    type: 'moveEvent',
    event,
    cell
  }
}

export function updateEventDuration(event, duration) {
  return {
    type: 'updateEventDuration',
    event,
    duration
  }
}

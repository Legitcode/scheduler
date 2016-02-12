export function moveEvent(event, cell, callback) {
  return {
    type: 'moveEvent',
    callback,
    event,
    cell
  }
}

export function updateEventDuration(event, duration, callback) {
  return {
    type: 'updateEventDuration',
    callback,
    event,
    duration
  }
}

export function replaceResources(resources) {
  return {
    type: 'replaceResources',
    resources
  }
}

export function replaceEvents(events) {
  return {
    type: 'replaceEvents',
    events
  }
}

export function moveEvent(event, cell, offset, cells) {
  return {
    type: 'moveEvent',
    event,
    cell,
    offset,
    cells
  }
}

export function updateEventDuration(event, duration) {
  return {
    type: 'updateEventDuration',
    event,
    duration
  }
}

export function resetResizeDispatcher(event) {
  return {
    type: 'resetResizeDispatcher',
    event
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

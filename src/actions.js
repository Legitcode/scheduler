export function moveEvent(event, cell, offset) {
  return {
    type: 'moveEvent',
    event,
    cell,
    offset
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

export function updateCell(key, cellLeft, cellTop, cellWidth, cellRight) {
  return {
    type: 'updateCell',
    key,
    cellLeft,
    cellTop,
    cellWidth,
    cellRight
  }
}

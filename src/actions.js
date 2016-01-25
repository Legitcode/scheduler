export function moveEvent(event, cell) {
  return {
    type: 'moveEvent',
    event: event,
    cell: cell
  }
}

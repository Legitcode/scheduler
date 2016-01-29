'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.moveEvent = moveEvent;
exports.updateEventDuration = updateEventDuration;
exports.resetResizeDispatcher = resetResizeDispatcher;
exports.updateCell = updateCell;

function moveEvent(event, cell, offset) {
  return {
    type: 'moveEvent',
    event: event,
    cell: cell,
    offset: offset
  };
}

function updateEventDuration(event, duration) {
  return {
    type: 'updateEventDuration',
    event: event,
    duration: duration
  };
}

function resetResizeDispatcher(event) {
  return {
    type: 'resetResizeDispatcher',
    event: event
  };
}

function updateCell(key, cellLeft, cellTop, cellWidth, cellRight) {
  return {
    type: 'updateCell',
    key: key,
    cellLeft: cellLeft,
    cellTop: cellTop,
    cellWidth: cellWidth,
    cellRight: cellRight
  };
}
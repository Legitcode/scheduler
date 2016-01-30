'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.moveEvent = moveEvent;
exports.updateEventDuration = updateEventDuration;
exports.resetResizeDispatcher = resetResizeDispatcher;
exports.replaceResources = replaceResources;
exports.replaceEvents = replaceEvents;

function moveEvent(event, cell, offset, cells) {
  return {
    type: 'moveEvent',
    event: event,
    cell: cell,
    offset: offset,
    cells: cells
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

function replaceResources(resources) {
  return {
    type: 'replaceResources',
    resources: resources
  };
}

function replaceEvents(events) {
  return {
    type: 'replaceEvents',
    events: events
  };
}
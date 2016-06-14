'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.moveEvent = moveEvent;
exports.updateEventDuration = updateEventDuration;
exports.replaceResources = replaceResources;
exports.replaceEvents = replaceEvents;

function moveEvent(event, cell, callback) {
  return {
    type: 'moveEvent',
    callback: callback,
    event: event,
    cell: cell
  };
}

function updateEventDuration(event, duration, callback) {
  return {
    type: 'updateEventDuration',
    callback: callback,
    event: event,
    duration: duration
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
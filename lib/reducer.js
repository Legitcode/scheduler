'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _immutable = require('immutable');

var defaultState = (0, _immutable.Map)({
  events: [],
  resources: [],
  cells: {}
});

exports['default'] = function (_x, action) {
  var state = arguments[0] === undefined ? defaultState : arguments[0];

  switch (action.type) {
    case 'moveEvent':
      var pointerDestination = action.cell.cellLeft - action.offset + action.cell.cellWidth;

      var cell = state.get('cells').find(function (c) {
        return pointerDestination >= c.get('cellLeft') && pointerDestination <= c.get('cellRight');
      });

      var newEvent = (0, _immutable.Map)(action.event).withMutations(function (map) {
        map.set('startDate', cell.get('date')).set('resource', action.cell.resource).set('dispatchChange', true);
      }).filter(function (value, key) {
        return ['styles', 'dispatchChange', 'duration', 'id', 'resource', 'startDate', 'title'].includes(key);
      });

      var index = state.get('events').findIndex(function (item) {
        return item.get('id') === action.event.id;
      });

      return state.updateIn(['events'], function (events) {
        return events.set(index, newEvent);
      });
    case 'updateEventDuration':
      var newEvent = (0, _immutable.Map)(action.event).withMutations(function (map) {
        map.set('duration', action.duration).set('dispatchResize', true);
      });
      var index = state.get('events').findIndex(function (item) {
        return item.get('id') === action.event.id;
      });

      return state.updateIn(['events'], function (events) {
        return events.set(index, newEvent);
      });
    case 'resetResizeDispatcher':
      var newEvent = (0, _immutable.Map)(action.event).set('dispatchResize', false);
      var index = state.get('events').findIndex(function (item) {
        return item.get('id') === action.event.id;
      });

      return state.updateIn(['events'], function (events) {
        return events.set(index, newEvent);
      });
    case 'updateCell':
      return state.withMutations(function (map) {
        map.setIn(['cells', action.key, 'cellTop'], action.cellTop).setIn(['cells', action.key, 'cellLeft'], action.cellLeft).setIn(['cells', action.key, 'cellWidth'], action.cellWidth).setIn(['cells', action.key, 'cellRight'], action.cellRight);
      });
    default:
      return state;
  }
};

module.exports = exports['default'];
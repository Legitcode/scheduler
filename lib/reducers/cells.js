'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _immutable = require('immutable');

var defaultState = (0, _immutable.Map)({
  cells: {}
});

exports['default'] = function (_x, action) {
  var state = arguments[0] === undefined ? defaultState : arguments[0];

  switch (action.type) {
    case 'updateCell':
      return state.withMutations(function (map) {
        map.setIn(['cells', action.key, 'cellTop'], action.cellTop).setIn(['cells', action.key, 'cellLeft'], action.cellLeft).setIn(['cells', action.key, 'cellWidth'], action.cellWidth).setIn(['cells', action.key, 'cellRight'], action.cellRight);
      });
    case 'createCells':
      var range = action.range,
          resources = action.resources;

      var cells = {};

      resources.forEach(function (resource) {
        range.forEach(function (date) {
          return cells['' + resource + '' + date.toRef()] = { resource: resource, date: date.toRef() };
        });
      });

      return (0, _immutable.fromJS)({ cells: cells });
    default:
      return state;
  }
};

module.exports = exports['default'];
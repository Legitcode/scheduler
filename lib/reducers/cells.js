'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _immutable = require('immutable');

var defaultState = (0, _immutable.Map)({
  cells: (0, _immutable.Map)({})
});

exports['default'] = function (_x, action) {
  var state = arguments[0] === undefined ? defaultState : arguments[0];

  switch (action.type) {
    case 'createCells':
      var range = action.range,
          resources = action.resources;

      var cells = (0, _immutable.Map)({});

      resources.forEach(function (resource) {
        range.forEach(function (date) {
          cells = cells.setIn(['' + resource + '' + date.toRef()], (0, _immutable.Map)({ resource: resource, date: date.toRef() }));
        });
      });

      return (0, _immutable.fromJS)({ cells: cells });
    default:
      return state;
  }
};

module.exports = exports['default'];
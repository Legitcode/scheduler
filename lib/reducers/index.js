'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _redux = require('redux');

var _event = require('./event');

var _event2 = _interopRequireDefault(_event);

var _range = require('./range');

var _range2 = _interopRequireDefault(_range);

var _cells = require('./cells');

var _cells2 = _interopRequireDefault(_cells);

exports['default'] = (0, _redux.combineReducers)({
  event: _event2['default'],
  range: _range2['default'],
  cells: _cells2['default']
});
module.exports = exports['default'];
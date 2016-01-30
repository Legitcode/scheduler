'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _immutable = require('immutable');

var _range_date = require('../range_date');

var _range_date2 = _interopRequireDefault(_range_date);

var _date_range = require('../date_range');

var _date_range2 = _interopRequireDefault(_date_range);

var from = new _range_date2['default']();
var to = new _range_date2['default']().advance('weeks', 4);
var defaultState = (0, _immutable.Map)({
  range: new _date_range2['default'](from, to)
});

exports['default'] = function (_x, action) {
  var state = arguments[0] === undefined ? defaultState : arguments[0];

  switch (action.type) {
    case 'setRange':
      return state.set('range', action.range);
    case 'advanceRange':
      var newRange = state.get('range').advance('weeks', 4);
      return state.set('range', newRange);
    case 'retardRange':
      var newRange = state.get('range').advance('weeks', -4);
      return state.set('range', newRange);
    default:
      return state;
  }
};

module.exports = exports['default'];
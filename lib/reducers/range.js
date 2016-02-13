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
  range: new _date_range2['default'](from, to),
  rangeDidChange: false
});

exports['default'] = function (_x, action) {
  var state = arguments[0] === undefined ? defaultState : arguments[0];

  var newRange = undefined;

  switch (action.type) {
    case 'setRange':
      return state.setIn(['range'], action.range);
    case 'advanceRange':
      newRange = state.get('range').advance('weeks', 4);
      return state.withMutations(function (map) {
        map.set('range', newRange).set('rangeDidChange', true);
      });
    case 'retardRange':
      newRange = state.get('range').advance('weeks', -4);
      return state.withMutations(function (map) {
        map.set('range', newRange).set('rangeDidChange', true);
      });
    case 'clearRangeFlag':
      return state.setIn(['rangeDidChange'], false);
    default:
      return state;
  }
};

module.exports = exports['default'];
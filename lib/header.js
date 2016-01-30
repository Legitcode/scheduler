// Vendor Libraries
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

// Styles

var _styles = require('./styles');

exports['default'] = function (_ref) {
  var range = _ref.range;
  return _react2['default'].createElement(
    'div',
    { style: { display: 'flex', width: '100%' } },
    _react2['default'].createElement('div', { style: { width: '5%' } }),
    _react2['default'].createElement(
      'div',
      { style: { width: '95%', display: 'flex' } },
      range.map(function (date) {
        return _react2['default'].createElement(
          'div',
          {
            key: date.toRef(),
            style: _styles.chartHeader },
          date.toCal()
        );
      })
    )
  );
};

module.exports = exports['default'];
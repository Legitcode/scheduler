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
  var width = _ref.width;
  return _react2['default'].createElement(
    'div',
    { className: 'header-wrapper', style: Object.assign({ width: width }, _styles.headerWrapper) },
    _react2['default'].createElement(
      'div',
      { className: 'header-cell-holder', style: { marginLeft: '' + width * 0.05 + 'px', width: '' + width * 0.95 + 'px', display: 'flex' } },
      range.map(function (date) {
        return _react2['default'].createElement(
          'div',
          {
            className: 'header-cell',
            key: date.toRef(),
            style: Object.assign({ width: '' + (width * 0.95 / range.daysInRange() + 1) + 'px' }, _styles.chartHeader) },
          date.toCal()
        );
      })
    )
  );
};

module.exports = exports['default'];
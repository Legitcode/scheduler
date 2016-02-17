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
    { className: 'header-wrapper', style: { display: 'flex', width: width } },
    _react2['default'].createElement('div', { className: 'header-placeholder', style: { width: '' + width * 0.05 + 'px' } }),
    _react2['default'].createElement(
      'div',
      { className: 'header-cell-holder', style: { width: '' + width * 0.95 + 'px', display: 'flex' } },
      range.map(function (date) {
        return _react2['default'].createElement(
          'div',
          {
            className: 'header-cell',
            key: date.toRef(),
            style: Object.assign({ width: '' + (width * 0.95 / 29 + 0.99) + 'px' }, _styles.chartHeader) },
          date.toCal()
        );
      })
    )
  );
};

module.exports = exports['default'];
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
    { className: 'header-wrapper', style: { display: 'flex', width: '100%' } },
    _react2['default'].createElement('div', { className: 'header-placeholder', style: { width: '5%' } }),
    _react2['default'].createElement(
      'div',
      { className: 'header-cell-holder', style: { width: '95%', display: 'flex' } },
      range.map(function (date) {
        return _react2['default'].createElement(
          'div',
          {
            className: 'header-cell',
            key: date.toRef(),
            style: _styles.chartHeader },
          date.toCal()
        );
      })
    )
  );
};

module.exports = exports['default'];
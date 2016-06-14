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
  var width = _ref.width;
  var resources = _ref.resources;
  var height = _ref.height;
  return _react2['default'].createElement(
    'div',
    { className: 'resource-wrapper', style: Object.assign({ width: '' + width * 0.05 + 'px' }, _styles.resourceWrapper) },
    resources.map(function (resource) {
      return _react2['default'].createElement(
        'div',
        {
          className: 'resource-cell',
          key: resource,
          style: Object.assign({ height: height, lineHeight: '' + height + 'px' }, _styles.resourceSideBar) },
        resource
      );
    })
  );
};

module.exports = exports['default'];
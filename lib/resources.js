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
  var resources = _ref.resources;
  var height = _ref.height;
  return _react2['default'].createElement(
    'div',
    { style: { display: 'flex', flexDirection: 'column', width: '5%' } },
    resources.map(function (resource) {
      return _react2['default'].createElement(
        'div',
        {
          key: resource,
          style: Object.assign({ height: height, lineHeight: '' + height + 'px' }, _styles.resourceSideBar) },
        resource
      );
    })
  );
};

module.exports = exports['default'];
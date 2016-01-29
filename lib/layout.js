// Vendor Libraries
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

// Local Libraries

var _chart = require('./chart');

var _chart2 = _interopRequireDefault(_chart);

// Styles
var headerStyles = {
  width: '3.66%',
  border: 'solid 1px darkgrey',
  margin: '0 -1px -1px 0',
  padding: '0 4px' };

var resourceStyles = {
  border: 'solid 1px darkgrey',
  margin: '0 -1px -1px 0',
  textAlign: 'center'
};

var Layout = (function (_React$Component) {
  function Layout() {
    _classCallCheck(this, Layout);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(Layout, _React$Component);

  _createClass(Layout, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var range = _props.range;
      var resources = _props.resources;
      var rowHeight = _props.rowHeight;
      var mergedResourceStyle = Object.assign({ height: rowHeight, lineHeight: '' + rowHeight + 'px' }, resourceStyles);

      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          'div',
          { style: { display: 'flex' } },
          _react2['default'].createElement('div', { style: { flexBasis: '5%' } }),
          _react2['default'].createElement(
            'div',
            { style: { flexBasis: '95%', display: 'flex' } },
            range.map(function (date) {
              return _react2['default'].createElement(
                'div',
                {
                  key: date.toRef(),
                  style: headerStyles },
                date.toCal()
              );
            })
          )
        ),
        _react2['default'].createElement(
          'div',
          { style: { display: 'flex' } },
          _react2['default'].createElement(
            'div',
            { style: { display: 'flex', flexDirection: 'column', flexBasis: '5%' } },
            resources.map(function (resource) {
              return _react2['default'].createElement(
                'div',
                {
                  key: resource,
                  style: mergedResourceStyle },
                resource
              );
            })
          ),
          _react2['default'].createElement(_chart2['default'], this.props)
        )
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      resources: _react2['default'].PropTypes.array.isRequired,
      range: _react2['default'].PropTypes.object.isRequired,
      events: _react2['default'].PropTypes.array.isRequired,
      eventChanged: _react2['default'].PropTypes.func.isRequired,
      eventResized: _react2['default'].PropTypes.func.isRequired,
      eventClicked: _react2['default'].PropTypes.func.isRequired
    },
    enumerable: true
  }]);

  return Layout;
})(_react2['default'].Component);

exports['default'] = (0, _reactRedux.connect)(function (props) {
  return props.toJS();
})(Layout);
module.exports = exports['default'];
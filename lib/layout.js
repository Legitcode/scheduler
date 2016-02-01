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

var _header = require('./header');

var _header2 = _interopRequireDefault(_header);

var _resources = require('./resources');

var _resources2 = _interopRequireDefault(_resources);

var Layout = (function (_Component) {
  function Layout() {
    _classCallCheck(this, Layout);

    if (_Component != null) {
      _Component.apply(this, arguments);
    }
  }

  _inherits(Layout, _Component);

  _createClass(Layout, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var width = _props.width;
      var range = _props.range;
      var resources = _props.resources;
      var rowHeight = _props.rowHeight;

      return _react2['default'].createElement(
        'div',
        { className: 'layout-wrapper', style: { width: width } },
        _react2['default'].createElement(_header2['default'], { range: range, width: width }),
        _react2['default'].createElement(
          'div',
          { className: 'chart-wrapper', style: { display: 'flex', width: width } },
          _react2['default'].createElement(_resources2['default'], { height: rowHeight, resources: resources }),
          _react2['default'].createElement(_chart2['default'], this.props)
        )
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      resources: _react.PropTypes.array.isRequired,
      range: _react.PropTypes.object.isRequired,
      events: _react.PropTypes.array.isRequired,
      eventChanged: _react.PropTypes.func.isRequired,
      eventResized: _react.PropTypes.func.isRequired,
      eventClicked: _react.PropTypes.func.isRequired,
      cellClicked: _react.PropTypes.func.isRequired,
      width: _react.PropTypes.number.isRequired
    },
    enumerable: true
  }]);

  return Layout;
})(_react.Component);

exports['default'] = (0, _reactRedux.connect)(function (state) {
  var _state$range$toJS = state.range.toJS();

  var range = _state$range$toJS.range;

  var _state$event$toJS = state.event.toJS();

  var resources = _state$event$toJS.resources;
  var events = _state$event$toJS.events;

  return { range: range, resources: resources, events: events };
})(Layout);
module.exports = exports['default'];
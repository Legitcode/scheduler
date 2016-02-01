// Vendor Libraries
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

// Local Libraries

var _range_date = require('./range_date');

var _range_date2 = _interopRequireDefault(_range_date);

var _date_range = require('./date_range');

var _date_range2 = _interopRequireDefault(_date_range);

var _range_selector = require('./range_selector');

var _range_selector2 = _interopRequireDefault(_range_selector);

var _layout = require('./layout');

var _layout2 = _interopRequireDefault(_layout);

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

// Actions

var _actionsCells = require('./actions/cells');

var _actionsEvents = require('./actions/events');

var _actionsRange = require('./actions/range');

// Create the store
var store = (0, _redux.createStore)(_reducers2['default']);

var Scheduler = (function (_Component) {
  function Scheduler() {
    var _this = this;

    _classCallCheck(this, Scheduler);

    if (_Component != null) {
      _Component.apply(this, arguments);
    }

    this.fireEventChanged = function (props) {
      var onEventChanged = _this.props.onEventChanged;var id = props.id;
      var title = props.title;
      var startDate = props.startDate;
      var duration = props.duration;
      var resource = props.resource;
      var disabled = props.disabled;

      if (onEventChanged) onEventChanged({ id: id, title: title, startDate: startDate, duration: duration, resource: resource, disabled: disabled });
    };

    this.fireEventResized = function (props) {
      var onEventResized = _this.props.onEventResized;var id = props.id;
      var title = props.title;
      var startDate = props.startDate;
      var duration = props.duration;
      var resource = props.resource;
      var disabled = props.disabled;

      if (onEventResized) onEventResized({ id: id, title: title, startDate: startDate, duration: duration, resource: resource, disabled: disabled });
    };

    this.fireEventClicked = function (props) {
      var onEventClicked = _this.props.onEventClicked;var id = props.id;
      var title = props.title;
      var startDate = props.startDate;
      var duration = props.duration;
      var resource = props.resource;
      var disabled = props.disabled;

      if (onEventClicked) onEventClicked({ id: id, title: title, startDate: startDate, duration: duration, resource: resource, disabled: disabled });
    };

    this.fireCellClicked = function (resource, date) {
      var onCellClicked = _this.props.onCellClicked;

      if (onCellClicked) onCellClicked(resource, date);
    };
  }

  _inherits(Scheduler, _Component);

  _createClass(Scheduler, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props;
      var resources = _props.resources;
      var from = _props.from;
      var to = _props.to;
      var range = new _date_range2['default'](from, to);

      this.initializeStore(this.props);
      store.dispatch((0, _actionsCells.createCells)(resources, range));
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.initializeStore(nextProps);
    }
  }, {
    key: 'initializeStore',
    value: function initializeStore(props) {
      var dispatch = props.dispatch;
      var resources = props.resources;
      var events = props.events;
      var from = props.from;
      var to = props.to;
      var range = new _date_range2['default'](from, to);

      store.dispatch((0, _actionsRange.setRange)(range));
      store.dispatch((0, _actionsEvents.replaceResources)(resources));
      store.dispatch((0, _actionsEvents.replaceEvents)(events));
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var range = _props2.range;
      var selectorStyles = _props2.selectorStyles;
      var width = _props2.width;

      return _react2['default'].createElement(
        _reactRedux.Provider,
        { store: store },
        _react2['default'].createElement(
          'div',
          { style: { width: width } },
          _react2['default'].createElement(_range_selector2['default'], { selectorStyles: selectorStyles }),
          _react2['default'].createElement(_layout2['default'], _extends({}, this.props, {
            eventChanged: this.fireEventChanged,
            eventResized: this.fireEventResized,
            eventClicked: this.fireEventClicked,
            cellClicked: this.fireCellClicked
          }))
        )
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      resources: _react.PropTypes.array.isRequired,
      events: _react.PropTypes.array.isRequired,
      from: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.object]),
      to: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.object]),
      rowHeight: _react.PropTypes.number,
      width: _react.PropTypes.number.isRequired
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      from: new _range_date2['default'](),
      to: new _range_date2['default']().advance('weeks', 4),
      rowHeight: 30,
      selectorStyles: {},
      chartStyles: {}
    },
    enumerable: true
  }]);

  return Scheduler;
})(_react.Component);

exports['default'] = Scheduler;
module.exports = exports['default'];
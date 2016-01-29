// Vendor Libraries
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _immutable = require('immutable');

// Local Libraries

var _range_date = require('./range_date');

var _range_date2 = _interopRequireDefault(_range_date);

var _date_range = require('./date_range');

var _date_range2 = _interopRequireDefault(_date_range);

var _layout = require('./layout');

var _layout2 = _interopRequireDefault(_layout);

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

// Styles
var selectorStyles = {
  textAlign: 'center',
  margin: '25px 0'
};

var leftButtonStyle = {
  position: 'relative',
  marginRight: '10px',
  display: 'inline-block',
  width: '2em',
  height: '2em',
  border: '0.25em solid darkgrey',
  borderRadius: '50%',
  verticalAlign: 'middle'
};

var leftButtonAfter = {
  position: 'absolute',
  display: 'inline-block',
  top: '0.4em',
  left: '0.5em',
  width: '0.7em',
  height: '0.7em',
  borderTop: '0.25em solid darkgrey',
  borderRight: '0.25em solid darkgrey',
  transform: 'rotate(-135deg)'
};

var rightButtonStyle = {
  position: 'relative',
  marginLeft: '10px',
  display: 'inline-block',
  width: '2em',
  height: '2em',
  border: '0.25em solid darkgrey',
  borderRadius: '50%',
  verticalAlign: 'middle'
};

var rightButtonAfter = {
  position: 'absolute',
  display: 'inline-block',
  top: '0.4em',
  right: '0.5em',
  width: '0.7em',
  height: '0.7em',
  borderTop: '0.25em solid darkgrey',
  borderLeft: '0.25em solid darkgrey',
  transform: 'rotate(135deg)'
};

var Scheduler = (function (_React$Component) {
  function Scheduler(props) {
    var _this = this;

    _classCallCheck(this, Scheduler);

    _get(Object.getPrototypeOf(Scheduler.prototype), 'constructor', this).call(this, props);

    this.previousClicked = function (ev) {
      ev.preventDefault();
      _this.changeRange({ 'weeks': -4 });
    };

    this.nextClicked = function (ev) {
      ev.preventDefault();
      _this.changeRange({ 'weeks': 4 });
    };

    this.addLeftHover = function () {
      _this.setState({ leftCursor: 'pointer' });
    };

    this.addRightHover = function () {
      _this.setState({ rightCursor: 'pointer' });
    };

    this.removeLeftHover = function () {
      _this.setState({ leftCursor: 'arrow' });
    };

    this.removeRightHover = function () {
      _this.setState({ rightCursor: 'arrow' });
    };

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

    var range = new _date_range2['default'](props.from, props.to);var events = props.events;
    var resources = props.resources;

    var cells = {};

    resources.forEach(function (resource) {
      range.forEach(function (date) {
        return cells['' + resource + '' + date.toRef()] = { resource: resource, date: date.toRef() };
      });
    });

    this.state = { range: new _date_range2['default'](props.from, props.to) };
    this.store = (0, _redux.createStore)(_reducer2['default'], (0, _immutable.fromJS)({ events: events, resources: resources, cells: cells }));
  }

  _inherits(Scheduler, _React$Component);

  _createClass(Scheduler, [{
    key: 'changeRange',
    value: function changeRange(props) {
      var increment = Object.keys(props)[0],
          amount = props[increment],
          range = this.state.range.advance(increment, amount);

      this.setState({ range: range });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state;
      var range = _state.range;
      var leftCursor = _state.leftCursor;
      var rightCursor = _state.rightCursor;
      var mergedLeftButtonStyle = Object.assign({ cursor: leftCursor }, leftButtonStyle);
      var mergedRightButtonStyle = Object.assign({ cursor: rightCursor }, rightButtonStyle);

      return _react2['default'].createElement(
        _reactRedux.Provider,
        { store: this.store },
        _react2['default'].createElement(
          'div',
          null,
          _react2['default'].createElement(
            'div',
            { style: selectorStyles },
            _react2['default'].createElement(
              'div',
              { style: mergedLeftButtonStyle, onClick: this.previousClicked, onMouseOver: this.addLeftHover, onMouseLeave: this.removeLeftHover },
              _react2['default'].createElement('div', { style: leftButtonAfter })
            ),
            range.toString(),
            _react2['default'].createElement(
              'div',
              { style: mergedRightButtonStyle, onClick: this.nextClicked, onMouseOver: this.addRightHover, onMouseLeave: this.removeRightHover },
              _react2['default'].createElement('div', { style: rightButtonAfter })
            )
          ),
          _react2['default'].createElement(_layout2['default'], _extends({}, this.props, {
            range: range,
            eventChanged: this.fireEventChanged,
            eventResized: this.fireEventResized,
            eventClicked: this.fireEventClicked
          }))
        )
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      resources: _react2['default'].PropTypes.array.isRequired,
      events: _react2['default'].PropTypes.array.isRequired,
      from: _react2['default'].PropTypes.string,
      to: _react2['default'].PropTypes.string,
      range: _react2['default'].PropTypes.object,
      rowHeight: _react2['default'].PropTypes.number },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      from: new _range_date2['default']().toString(),
      to: new _range_date2['default']().advance('weeks', 4).toString(),
      rowHeight: 30
    },
    enumerable: true
  }]);

  return Scheduler;
})(_react2['default'].Component);

exports['default'] = Scheduler;
module.exports = exports['default'];
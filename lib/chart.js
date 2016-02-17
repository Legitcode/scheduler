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

var _reactDnd = require('react-dnd');

var _reactDndHtml5Backend = require('react-dnd-html5-backend');

var _reactDndHtml5Backend2 = _interopRequireDefault(_reactDndHtml5Backend);

// Local Libraries

var _event = require('./event');

var _event2 = _interopRequireDefault(_event);

var _partial_event = require('./partial_event');

var _partial_event2 = _interopRequireDefault(_partial_event);

var _cell = require('./cell');

var _cell2 = _interopRequireDefault(_cell);

var _range_date = require('./range_date');

var _range_date2 = _interopRequireDefault(_range_date);

// Styles

var _styles = require('./styles');

var Chart = (function (_Component) {
  function Chart() {
    _classCallCheck(this, _Chart);

    if (_Component != null) {
      _Component.apply(this, arguments);
    }
  }

  _inherits(Chart, _Component);

  var _Chart = Chart;

  _createClass(_Chart, [{
    key: 'renderEvent',
    value: function renderEvent(resource, date) {
      var _this = this;

      var _props = this.props;
      var rowHeight = _props.rowHeight;
      var eventChanged = _props.eventChanged;
      var eventResized = _props.eventResized;
      var eventClicked = _props.eventClicked;

      var currentEvent = this.props.events.find(function (event) {
        return event.resource === resource && event.startDate === date;
      });

      if (currentEvent) {
        return _react2['default'].createElement(_event2['default'], _extends({}, currentEvent, {
          rowHeight: rowHeight,
          eventChanged: eventChanged,
          eventResized: eventResized,
          eventClicked: eventClicked
        }));
      } else {
        var partialEvent = this.props.events.find(function (event) {
          var eventEnd = new _range_date2['default'](event.startDate).advance('days', event.duration),
              from = _this.props.range.from.date,
              eventStart = new _range_date2['default'](event.startDate).date;

          return eventEnd.toRef() === date && from.isAfter(eventStart, 'day') && event.resource === resource;
        });

        if (partialEvent) return _react2['default'].createElement(_partial_event2['default'], _extends({}, partialEvent, {
          rowHeight: rowHeight
        }));
      }
    }
  }, {
    key: 'cellClicked',
    value: function cellClicked(ev, resource, date) {
      ev.stopPropagation();
      var targetClass = ev.target.attributes[0].value;
      if (targetClass !== 'resizer') {
        this.props.cellClicked(resource, date);
      }
    }
  }, {
    key: 'renderCell',
    value: function renderCell(resource, date) {
      var _this2 = this;

      return _react2['default'].createElement(
        'div',
        {
          className: 'cell-wrapper',
          key: '' + resource + '' + date,
          style: Object.assign({ width: '' + (this.props.width * 0.95 / 29 + 0.99) + 'px', height: this.props.rowHeight }, _styles.cellWrapper) },
        _react2['default'].createElement(
          _cell2['default'],
          {
            resource: resource,
            date: date,
            onClick: function (ev) {
              return _this2.cellClicked.call(_this2, ev, resource, date);
            } },
          this.renderEvent(resource, date)
        )
      );
    }
  }, {
    key: 'createCells',
    value: function createCells() {
      var _this3 = this;

      var _props2 = this.props;
      var resources = _props2.resources;
      var range = _props2.range;

      var cells = [];

      resources.forEach(function (resource) {
        range.forEach(function (date) {
          return cells.push(_this3.renderCell(resource, date.toRef()));
        });
      });

      return cells;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: 'chart', style: _styles.chart },
        this.createCells()
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      events: _react.PropTypes.array.isRequired,
      resources: _react.PropTypes.array.isRequired,
      range: _react.PropTypes.object.isRequired,
      cells: _react.PropTypes.object.isRequired,
      eventChanged: _react.PropTypes.func.isRequired,
      eventResized: _react.PropTypes.func.isRequired,
      eventClicked: _react.PropTypes.func.isRequired,
      cellClicked: _react.PropTypes.func.isRequired,
      rowHeight: _react.PropTypes.number.isRequired
    },
    enumerable: true
  }]);

  Chart = (0, _reactDnd.DragDropContext)(_reactDndHtml5Backend2['default'])(Chart) || Chart;
  return Chart;
})(_react.Component);

exports['default'] = Chart;
module.exports = exports['default'];
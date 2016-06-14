// Vendor Libraries
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDnd = require('react-dnd');

var _reactRedux = require('react-redux');

// Local Libraries

var _actionsEvents = require('./actions/events');

var _constants = require('./constants');

// Styles

var _styles = require('./styles');

/* globals document */

var eventSource = {
  beginDrag: function beginDrag(props) {
    return {
      resource: props.resource,
      date: props.startDate,
      id: props.id
    };
  },
  endDrag: function endDrag(props, monitor, component) {
    if (!monitor.didDrop()) return;

    component.props.dispatch((0, _actionsEvents.moveEvent)(props, monitor.getDropResult(), props.eventChanged));
  },
  canDrag: function canDrag(props) {
    return !props.disabled;
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    connectDragPreview: connect.dragPreview()
  };
}

var Event = (function (_React$Component) {
  function Event(props) {
    var _this = this;

    _classCallCheck(this, _Event);

    _get(Object.getPrototypeOf(_Event.prototype), 'constructor', this).call(this, props);

    this.initDrag = function (ev) {
      ev.stopPropagation();

      _this.setState({
        startX: ev.clientX
      });

      document.documentElement.addEventListener('mousemove', _this.doDrag, false);
      document.documentElement.addEventListener('mouseup', _this.stopDrag, false);
    };

    this.doDrag = function (ev) {
      ev.stopPropagation();
      var _state = _this.state;
      var startWidth = _state.startWidth;
      var startX = _state.startX;
      var newWidth = startWidth + ev.clientX - startX;

      _this.setState({ width: newWidth });
    };

    this.stopDrag = function (ev) {
      ev.stopPropagation();
      var _props = _this.props;
      var eventResized = _props.eventResized;
      var disabled = _props.disabled;
      var dispatch = _props.dispatch;
      var id = _props.id;
      var title = _props.title;
      var startDate = _props.startDate;
      var resource = _props.resource;
      var styles = _props.styles;
      var width = _this.state.width;
      var newDuration = _this.roundToNearest(width);

      dispatch((0, _actionsEvents.updateEventDuration)({ disabled: disabled, id: id, title: title, startDate: startDate, resource: resource, styles: styles }, newDuration, eventResized));

      document.documentElement.removeEventListener('mousemove', _this.doDrag, false);
      document.documentElement.removeEventListener('mouseup', _this.stopDrag, false);
    };

    this.state = {};
  }

  _inherits(Event, _React$Component);

  var _Event = Event;

  _createClass(_Event, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props2 = this.props;
      var duration = _props2.duration;
      var cellWidth = _props2.cellWidth;
      var width = duration * cellWidth === 0 ? cellWidth : duration * cellWidth - duration - 9;

      this.setState({ cellWidth: cellWidth, width: width, startWidth: width });
      this.refs.resizer.addEventListener('mousedown', this.initDrag, false);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var duration = nextProps.duration;
      var cellWidth = nextProps.cellWidth;
      var width = duration * cellWidth === 0 ? cellWidth : duration * cellWidth - duration - 9;

      this.setState({ duration: duration, width: width, startWidth: width });
    }
  }, {
    key: 'roundToNearest',
    value: function roundToNearest(numToRound) {
      return Math.ceil(numToRound / this.props.cellWidth);
    }
  }, {
    key: 'dispatchEventClick',
    value: function dispatchEventClick(ev) {
      ev.stopPropagation();
      this.props.eventClicked(this.props);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props;
      var styles = _props3.styles;
      var isDragging = _props3.isDragging;
      var connectDragSource = _props3.connectDragSource;
      var connectDragPreview = _props3.connectDragPreview;
      var id = _props3.id;
      var title = _props3.title;
      var children = _props3.children;
      var rowHeight = _props3.rowHeight;
      var rest = _objectWithoutProperties(_props3, ['styles', 'isDragging', 'connectDragSource', 'connectDragPreview', 'id', 'title', 'children', 'rowHeight']);
      var width = this.state.width;
      var resizerStyleMerge = Object.assign({ height: '100%' }, _styles.resizerStyles);
      var defaultStyles = { color: '#000', backgroundColor: 'darkgrey' };
      var eventStyleMerge = Object.assign({ width: width }, styles || defaultStyles, _styles.eventStyles);
      var opacity = isDragging ? 0 : 1;
      var boxStyleMerge = Object.assign({ width: width, opacity: opacity }, _styles.boxStyles);

      return _react2['default'].createElement(
        'div',
        { className: 'event-box', style: boxStyleMerge },
        isDragging ? null : connectDragPreview(_react2['default'].createElement(
          'div',
          { key: id, className: 'event', style: eventStyleMerge, onClick: this.dispatchEventClick.bind(this) },
          connectDragSource(_react2['default'].createElement('span', { style: _styles.eventHandleStyles, className: 'event-handle' })),
          title
        )),
        _react2['default'].createElement('span', { className: 'resizer', style: resizerStyleMerge, ref: 'resizer' })
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      title: _react.PropTypes.string.isRequired,
      startDate: _react.PropTypes.string.isRequired,
      duration: _react.PropTypes.number.isRequired,
      resource: _react.PropTypes.string.isRequired,
      dispatch: _react.PropTypes.func,
      eventChanged: _react.PropTypes.func.isRequired,
      eventResized: _react.PropTypes.func.isRequired,
      eventClicked: _react.PropTypes.func.isRequired,
      cellWidth: _react.PropTypes.number,
      disabled: _react.PropTypes.bool,
      id: _react.PropTypes.string.isRequired,
      styles: _react.PropTypes.object,
      isDragging: _react.PropTypes.bool.isRequired,
      connectDragSource: _react.PropTypes.func.isRequired,
      connectDragPreview: _react.PropTypes.func.isRequired,
      rowHeight: _react.PropTypes.number.isRequired,
      children: _react.PropTypes.node
    },
    enumerable: true
  }]);

  Event = (0, _reactDnd.DragSource)(_constants.ItemTypes.EVENT, eventSource, collect)(Event) || Event;
  return Event;
})(_react2['default'].Component);

exports['default'] = (0, _reactRedux.connect)()(Event);
module.exports = exports['default'];
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

// Styles

var _styles = require('./styles');

var PartialEvent = (function (_React$Component) {
  function PartialEvent(props) {
    _classCallCheck(this, PartialEvent);

    _get(Object.getPrototypeOf(PartialEvent.prototype), 'constructor', this).call(this, props);

    this.state = {};
  }

  _inherits(PartialEvent, _React$Component);

  _createClass(PartialEvent, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props;
      var duration = _props.duration;
      var cellWidth = _props.cellWidth;
      var width = duration * cellWidth === 0 ? cellWidth : duration * cellWidth - duration - 9;

      this.setState({ cellWidth: cellWidth, width: width, startWidth: width });
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
    key: 'dispatchEventClick',
    value: function dispatchEventClick(ev) {
      ev.stopPropagation();
      this.props.eventClicked(this.props);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var styles = _props2.styles;
      var id = _props2.id;
      var title = _props2.title;
      var children = _props2.children;
      var rowHeight = _props2.rowHeight;
      var rest = _objectWithoutProperties(_props2, ['styles', 'id', 'title', 'children', 'rowHeight']);
      var width = this.state.width;
      var defaultStyles = { color: '#000', backgroundColor: 'darkgrey' };
      var eventStyleMerge = Object.assign({ width: width }, styles || defaultStyles, _styles.partialEventStyles);
      var boxStyleMerge = Object.assign({ height: '100%', top: '2px', width: width }, _styles.boxStyles);

      return _react2['default'].createElement(
        'div',
        { className: 'event-box', style: boxStyleMerge },
        _react2['default'].createElement(
          'div',
          { className: 'event', style: eventStyleMerge, onClick: this.dispatchEventClick.bind(this) },
          title
        )
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
      cellWidth: _react.PropTypes.number,
      disabled: _react.PropTypes.bool,
      id: _react.PropTypes.string.isRequired,
      styles: _react.PropTypes.object,
      rowHeight: _react.PropTypes.number.isRequired,
      children: _react.PropTypes.node,
      eventClicked: _react.PropTypes.func.isRequired
    },
    enumerable: true
  }]);

  return PartialEvent;
})(_react2['default'].Component);

exports['default'] = PartialEvent;
module.exports = exports['default'];
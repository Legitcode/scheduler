// Vendor Libraries
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDnd = require('react-dnd');

var _reactRedux = require('react-redux');

// Local LIbraries

var _constants = require('./constants');

var _actions = require('./actions');

var cellTarget = {
  drop: function drop(props, monitor, component) {
    return Object.assign(component.state, props);
  },
  canDrop: function canDrop(props) {
    return !props.children;
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

var Cell = (function (_React$Component) {
  function Cell(props) {
    _classCallCheck(this, _Cell);

    _get(Object.getPrototypeOf(_Cell.prototype), 'constructor', this).call(this, props);
    this.state = {};
  }

  _inherits(Cell, _React$Component);

  var _Cell = Cell;

  _createClass(_Cell, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var node = (0, _reactDom.findDOMNode)(this);
      var rect = node.getBoundingClientRect();
      var cellWidth = rect.width;
      var cellTop = rect.top;
      var cellLeft = rect.left;
      var cellRight = rect.right;var _props = this.props;
      var date = _props.date;
      var resource = _props.resource;
      var dispatch = _props.dispatch;

      this.setState({ cellWidth: cellWidth, cellTop: cellTop, cellLeft: cellLeft, cellRight: cellRight });
      this.props.dispatch((0, _actions.updateCell)('' + resource + '' + date, cellLeft, cellTop, cellWidth, cellRight));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var _props2 = this.props;
      var children = _props2.children;
      var connectDropTarget = _props2.connectDropTarget;

      return connectDropTarget(_react2['default'].createElement(
        'div',
        { className: 'cell' },
        _react2['default'].Children.map(children, function (child) {
          return _react2['default'].cloneElement(child, _this.state);
        })
      ));
    }
  }], [{
    key: 'propTypes',
    value: {
      resource: _react.PropTypes.string.isRequired,
      date: _react.PropTypes.string.isRequired
    },
    enumerable: true
  }]);

  Cell = (0, _reactDnd.DropTarget)(_constants.ItemTypes.EVENT, cellTarget, collect)(Cell) || Cell;
  return Cell;
})(_react2['default'].Component);

exports['default'] = (0, _reactRedux.connect)()(Cell);
module.exports = exports['default'];
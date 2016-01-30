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

var _reactRedux = require('react-redux');

// Actions

var _actionsRange = require('./actions/range');

// Styles

var _styles = require('./styles');

var RangeSelector = (function (_Component) {
  function RangeSelector(props) {
    var _this = this;

    _classCallCheck(this, RangeSelector);

    _get(Object.getPrototypeOf(RangeSelector.prototype), 'constructor', this).call(this, props);

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

    this.state = {};
  }

  _inherits(RangeSelector, _Component);

  _createClass(RangeSelector, [{
    key: 'previousClicked',
    value: function previousClicked() {
      this.props.dispatch((0, _actionsRange.retardRange)());
    }
  }, {
    key: 'nextClicked',
    value: function nextClicked() {
      this.props.dispatch((0, _actionsRange.advanceRange)());
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state;
      var leftCursor = _state.leftCursor;
      var rightCursor = _state.rightCursor;
      var range = this.props.range;
      var mergedLeftButtonStyle = Object.assign({ cursor: leftCursor }, _styles.leftButton);
      var mergedRightButtonStyle = Object.assign({ cursor: rightCursor }, _styles.rightButton);

      return _react2['default'].createElement(
        'div',
        { style: _styles.selectors },
        _react2['default'].createElement(
          'div',
          {
            style: mergedLeftButtonStyle,
            onClick: this.previousClicked.bind(this),
            onMouseOver: this.addLeftHover,
            onMouseLeave: this.removeLeftHover },
          _react2['default'].createElement('div', { style: _styles.leftButtonAfter })
        ),
        range.toString(),
        _react2['default'].createElement(
          'div',
          {
            style: mergedRightButtonStyle,
            onClick: this.nextClicked.bind(this),
            onMouseOver: this.addRightHover,
            onMouseLeave: this.removeRightHover },
          _react2['default'].createElement('div', { style: _styles.rightButtonAfter })
        )
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      leftCursor: _react.PropTypes.string,
      rightCursor: _react.PropTypes.string,
      range: _react.PropTypes.object.isRequired,
      dispatch: _react.PropTypes.func.isRequired
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      leftCursor: 'arrow',
      rightCursor: 'arrow'
    },
    enumerable: true
  }]);

  return RangeSelector;
})(_react.Component);

exports['default'] = (0, _reactRedux.connect)(function (state) {
  return state.range.toJS();
})(RangeSelector);
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _strftime = require('strftime');

var _strftime2 = _interopRequireDefault(_strftime);

var RangeDate = (function () {
  function RangeDate() {
    var date = arguments[0] === undefined ? null : arguments[0];

    _classCallCheck(this, RangeDate);

    if (date) {
      this.date = date instanceof RangeDate ? date.value() : new Date(date);
    } else {
      this.date = new Date();
    }
  }

  _createClass(RangeDate, [{
    key: 'toString',
    value: function toString() {
      return (0, _strftime2['default'])('%B %-d, %Y', this.date);
    }
  }, {
    key: 'toCal',
    value: function toCal() {
      return (0, _strftime2['default'])('%b\n%-m/%-d', this.date);
    }
  }, {
    key: 'toRef',
    value: function toRef() {
      return (0, _strftime2['default'])('%Y-%m-%d', this.date);
    }
  }, {
    key: 'value',
    value: function value() {
      return this.date;
    }
  }, {
    key: 'advance',
    value: function advance(increment, amount) {
      var copy = new Date(this.date),
          newDate = copy.setDate(copy.getDate() + RangeDate.incrementMap[increment] * amount);

      return new RangeDate(new Date(newDate));
    }
  }], [{
    key: 'incrementMap',
    value: {
      'days': 1,
      'weeks': 7,
      'months': 30
    },
    enumerable: true
  }]);

  return RangeDate;
})();

exports['default'] = RangeDate;
module.exports = exports['default'];
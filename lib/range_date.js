'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

var RangeDate = (function () {
  function RangeDate() {
    var date = arguments[0] === undefined ? null : arguments[0];

    _classCallCheck(this, RangeDate);

    if (date) {
      this.date = date instanceof RangeDate ? (0, _momentTimezone2['default'])(date.value()) : (0, _momentTimezone2['default'])(date);
    } else {
      this.date = (0, _momentTimezone2['default'])();
    }
  }

  _createClass(RangeDate, [{
    key: 'toString',
    value: function toString() {
      return this.date.format('MMMM D, YYYY');
    }
  }, {
    key: 'toCal',
    value: function toCal() {
      return this.date.format('MMM[\n]M/D');
    }
  }, {
    key: 'toRef',
    value: function toRef() {
      return this.date.format('YYYY-MM-DD');
    }
  }, {
    key: 'value',
    value: function value() {
      return this.date._d;
    }
  }, {
    key: 'advance',
    value: function advance(increment, amount) {
      return new RangeDate(this.date.clone().add(amount, increment));
    }
  }]);

  return RangeDate;
})();

exports['default'] = RangeDate;
module.exports = exports['default'];
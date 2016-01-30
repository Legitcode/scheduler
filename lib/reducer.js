'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _immutable = require('immutable');

var defaultState = (0, _immutable.Map)({
  events: [],
  resources: [],
  cells: {}
});

exports['default'] = function (_x, action) {
  var state = arguments[0] === undefined ? defaultState : arguments[0];

  switch (action.type) {}
};

module.exports = exports['default'];
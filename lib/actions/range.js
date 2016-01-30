'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.advanceRange = advanceRange;
exports.retardRange = retardRange;
exports.setRange = setRange;

function advanceRange() {
  return {
    type: 'advanceRange'
  };
}

function retardRange() {
  return {
    type: 'retardRange'
  };
}

function setRange(range) {
  return {
    type: 'setRange',
    range: range
  };
}
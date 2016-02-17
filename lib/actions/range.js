'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.advanceRange = advanceRange;
exports.retardRange = retardRange;
exports.setRange = setRange;
exports.clearRangeFlag = clearRangeFlag;

function advanceRange() {
  return {
    type: 'advanceRange',
    nextAction: 'createCells'
  };
}

function retardRange() {
  return {
    type: 'retardRange',
    nextAction: 'createCells'
  };
}

function setRange(range) {
  return {
    type: 'setRange',
    range: range
  };
}

function clearRangeFlag() {
  return {
    type: 'clearRangeFlag'
  };
}
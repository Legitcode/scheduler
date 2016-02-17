'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.createCells = createCells;

function createCells(resources, range) {
  return {
    type: 'createCells',
    range: range,
    resources: resources
  };
}
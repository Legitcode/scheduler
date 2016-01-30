'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.createCells = createCells;
exports.updateCell = updateCell;

function createCells(resources, range) {
  return {
    type: 'createCells',
    range: range,
    resources: resources
  };
}

function updateCell(key, cellLeft, cellTop, cellWidth, cellRight) {
  return {
    type: 'updateCell',
    key: key,
    cellLeft: cellLeft,
    cellTop: cellTop,
    cellWidth: cellWidth,
    cellRight: cellRight
  };
}
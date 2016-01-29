export function createCells(resources, range) {
  return {
    type: 'createCells',
    range,
    resources
  }
}

export function updateCell(key, cellLeft, cellTop, cellWidth, cellRight) {
  return {
    type: 'updateCell',
    key,
    cellLeft,
    cellTop,
    cellWidth,
    cellRight
  }
}

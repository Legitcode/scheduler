export function createCells(resources, range) {
  return {
    type: 'createCells',
    range,
    resources
  }
}

export function advanceRange() {
  return {
    type: 'advanceRange',
    nextAction: 'createCells'
  }
}

export function retardRange() {
  return {
    type: 'retardRange',
    nextAction: 'createCells'
  }
}

export function setRange(range) {
  return {
    type: 'setRange',
    range
  }
}

export function clearRangeFlag() {
  return {
    type: 'clearRangeFlag'
  }
}

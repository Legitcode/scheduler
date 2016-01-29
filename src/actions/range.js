export function advanceRange() {
  return {
    type: 'advanceRange'
  }
}

export function retardRange() {
  return {
    type: 'retardRange'
  }
}

export function setRange(range) {
  return {
    type: 'setRange',
    range
  }
}

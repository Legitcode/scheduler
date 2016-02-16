import RangeDate from './range_date'

export default class DateRange {
  constructor(...args) {
    let [ from, to ] = args

    this.from = new RangeDate(from)
    this.to = new RangeDate(to)
  }

  toString() {
    return `${this.from.toString()} - ${this.to.toString()}`
  }

  advance(increment, amount) {
    let from = this.from.advance(increment, amount),
        to = this.to.advance(increment, amount)

    return new DateRange(from, to)
  }

  map(func) {
    let current = this.from,
        dates = []

    while (current.value() <= this.to.value()) {
      dates.push(func(current))
      current = current.advance('days', 1)
    }

    return dates
  }

  forEach(func) {
    let current = this.from

    while (current.value() <= this.to.value()) {
      func(current)
      current = current.advance('days', 1)
    }
  }
}

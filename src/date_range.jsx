import RangeDate from './range_date'

export default class DateRange {
  constructor(...args) {
    let [ from, to ] = args

    this.from = new RangeDate(from)
    this.to = new RangeDate(to)
  }

  daysInRange() {
    return this.to.date.diff(this.from.date, 'days') + 1
  }

  toString() {
    return `${this.from.toString()} - ${this.to.toString()}`
  }

  advance(reverse = false) {
    const advanceAmount = reverse ? -this.daysInRange() : this.daysInRange(),
          from = this.from.advance('days', advanceAmount),
          to = this.to.advance('days', advanceAmount)

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

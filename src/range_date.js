import moment from 'moment-timezone'

export default class RangeDate {
  constructor(date = null) {
    if (date) {
      this.date = date instanceof RangeDate ? moment(date.value()) : moment(date)
    } else {
      this.date = moment()
    }
  }

  toString() {
    return this.date.format('MMMM D, YYYY')
  }

  toCal() {
    return this.date.format('MMM[\n]M/D')
  }

  toRef() {
    return this.date.format('YYYY-MM-DD')
  }

  value() {
    return this.date._d
  }

  advance(increment, amount) {
    return new RangeDate(
      this.date.clone().add(amount, increment)
    )
  }
}

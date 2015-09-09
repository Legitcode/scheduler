import RangeDate from './range_date';

export default class DateRange {
  constructor(...args) {
    let [ from, to ] = args;

    this.from = new RangeDate(from);
    this.to = new RangeDate(to);
  }

  toString() {
    return `${this.from.toString()} - ${this.to.toString()}`;
  }
}

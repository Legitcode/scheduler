import strftime from 'strftime';

export default class RangeDate {
  static incrementMap = {
    'days': 1,
    'weeks': 7,
    'months': 30
  }

  constructor(date = null) {
    if (date) {
      this.date = date instanceof RangeDate ? date.value() : new Date(date);
    } else {
      this.date = new Date();
    }
  }

  toString() {
    return strftime('%B %e, %Y', this.date);
  }

  value() {
    return this.date;
  }

  advance(increment, amount) {
    let copy = new Date(this.date),
        newDate = copy.setDate(copy.getDate() + (RangeDate.incrementMap[increment] * amount));

    return new Date(newDate);
  }
}

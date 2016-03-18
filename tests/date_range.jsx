import assert from 'assert'
import DateRange from '../src/date_range'
import RangeDate from '../src/range_date'

describe('DateRange', () => {
  describe('initialize', () => {
    it('should accept an instance of range date in the constructor', () => {
      let from = new RangeDate(2015, 8, 1),
          to = new RangeDate(2015, 9, 1),
          range = new DateRange(from, to)

      assert(range.from instanceof RangeDate)
      assert(range.to instanceof RangeDate)
    })
  })

  describe('#toString', () => {
    it('should convert the range to a formatted string', () => {
      let range = new DateRange(new Date(2015, 8, 1), new Date(2015, 9, 1))

      assert.equal("September 1, 2015 - October 1, 2015", range.toString())
    })
  })

  describe('#advance', () => {
    it('should advance the date range', () => {
      let range = new DateRange("2015-09-01", "2015-09-15")

      assert.equal("September 16, 2015 - September 30, 2015", range.advance().toString())
    })

    it('should advance the date range for the number of days in the range', () => {
      let range = new DateRange("2015-09-01", "2015-09-04")

      assert.equal("September 5, 2015 - September 8, 2015", range.advance().toString())
    })
  })

  describe('#daysInRange', () => {
    it('should return the number of days in the range', () => {
      let range = new DateRange("2016-01-01", "2016-01-03")

      assert.equal(3, range.daysInRange())
    })
  })
})

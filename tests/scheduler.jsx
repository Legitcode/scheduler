import Test from 'legit-tests'
import { expect } from 'chai'

import Scheduler from '../src/scheduler'
import RangeDate from '../src/range_date'

describe('Scheduler component', () => {
  describe('initialize', () => {
    it('should create a default range of the next two weeks if no range is defined', () => {
      let expectedFrom = new RangeDate(new Date()),
          expectedTo = expectedFrom.advance('weeks', 4)

      Test(<Scheduler resources={[]} events={[]} />).
      test(({ instance }) => {
        expect(instance.props.from.toString()).to.eq(expectedFrom.toString())
        expect(instance.props.to.toString()).to.eq(expectedTo.toString())
      })
    })
  })
})

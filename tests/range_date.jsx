import RangeDate from '../src/range_date';
import assert from 'assert';
import timekeeper from 'timekeeper';

describe('RangeDate', () => {
  describe('initialize', () => {
    it('should accept an instance of itself', () => {
      let date = new RangeDate(new Date(2015, 8, 1)),
          date2 = new RangeDate(date);

      assert(+(new Date(2015, 8, 1)) === +date2.value());
    });

    it('should set the date to now if undefined is passed in', () => {
      let now = new Date();
      timekeeper.freeze(now);    
      let date = new RangeDate();
      
      assert(+now === +date.value());
      timekeeper.reset();
    });

    it('should set the date to now if null is passed in', () => {
      let now = new Date();
      timekeeper.freeze(now);    
      let date = new RangeDate(null);
      
      assert(+now === +date.value());
      timekeeper.reset();
    });
  });

  describe('#toString', () => {
    let date = new RangeDate(new Date(2015, 8, 1));

    it('should convert the range date to a formatted string', () => {
      assert.equal("September  1, 2015", date.toString());
    });
  });

  describe('#advance', () => {
    it('should properly advance the date by days', () => {
      let date = new RangeDate(new Date(2015, 8, 1));
      assert.equal(+(new Date(2015, 8, 15)), +date.advance('days', 14).value());
    });

    it('should properly advance the date by weeks', () => {
      let date = new RangeDate(new Date(2015, 8, 1));
      assert.equal(+(new Date(2015, 8, 15)), +date.advance('weeks', 2).value());
    });

    it('should not mutate the original date value', () => {
      let date = new RangeDate(new Date(2015, 8, 1));

      date.advance('days', 1);

      assert.equal(+(new Date(2015, 8, 1)), +date.value());
    });
  }); 
});

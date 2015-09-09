import React from 'react/addons';
import assert from 'assert';

let { TestUtils } = React.addons,
    shallowRenderer = TestUtils.createRenderer();

import Scheduler from '../src/scheduler';
import RangeDate from '../src/range_date';

describe('Scheduler component', () => {
  describe('initialize', () => {
    it('should create a default range of the next two weeks if no range is defined', () => {
      shallowRenderer.render(React.createElement(Scheduler));

      let scheduler = shallowRenderer.getRenderOutput(),
          expectedFrom = new RangeDate(new Date()),
          expectedTo = expectedFrom.advance('weeks', 2);

      assert.equal(expectedFrom.toString(), scheduler.props.from);
      assert.equal(expectedTo.toString(), scheduler.props.to);
    });
  });
});

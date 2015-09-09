import React from 'react';
import Scheduler from '../src/scheduler';

export default class Basic extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Scheduler />
    );
  }
}

require('../src/css/default.scss');
React.render(<Basic />, document.getElementById('react'));

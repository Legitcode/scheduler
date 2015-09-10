import React from 'react';

export default class SchedulerWrapper extends React.Component {
  static propTypes = {
    range: React.PropTypes.object,
    ScheduleActions: React.PropTypes.object
  }

  previousClicked = (ev) => {
    ev.preventDefault();

    this.props.ScheduleActions.changeRange({ 'weeks': -2 });
  }

  nextClicked = (ev) => {
    ev.preventDefault();

    this.props.ScheduleActions.changeRange({ 'weeks': 2 });
  }

  render() {
    return (
      <div>
        <button onClick={this.previousClicked}>&lsaquo;</button>
        { this.props.range.toString() }
        <button onClick={this.nextClicked}>&rsaquo;</button> 
      </div>
    );
  }
}

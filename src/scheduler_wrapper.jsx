import React from 'react';

export default class SchedulerWrapper extends React.Component {
  static propTypes = {
    range: React.PropTypes.object
  }

  previousClicked = (ev) => {
    ev.preventDefault();

    this.props.ScheduleActions.changeRange({ 'weeks': -2 });
  }

  nextClicked = (ev) => {
    ev.preventDefault();

    this.props.ScheduleActions.changeRange({ 'weeks': 2 });
  }

  changeRange(props) {
    let increment = Object.keys(props)[0],
        amount = props[increment],
        range = this.state.get('range').advance(increment, amount),
        newProps = Immutable.fromJS({ range: range });

    this.setState(this.state.merge(newProps));
  }

  render() {
    return (
    );
  }
}

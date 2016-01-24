import alt from './alt';
import immutable from 'alt/utils/ImmutableUtil';
import Immutable from 'immutable';
import ScheduleActions from './schedule_actions';

@immutable
class ScheduleStore {
  constructor() {
    this.bindActions(ScheduleActions);
  }

  setInitialState(props) {
    this.setState(Immutable.fromJS(props));
  }

  changeRange(props) {
    let increment = Object.keys(props)[0],
        amount = props[increment],
        range = this.state.get('range').advance(increment, amount),
        newProps = Immutable.fromJS({ range: range });

    this.setState(this.state.merge(newProps));
  }
}

export default alt.createStore(ScheduleStore, 'ScheduleStore');

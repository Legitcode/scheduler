import alt from './alt';

class ScheduleActions {
  constructor() {
    this.generateActions(
      'setInitialState',
      'changeRange'
    );
  }
}

export default alt.createActions(ScheduleActions);

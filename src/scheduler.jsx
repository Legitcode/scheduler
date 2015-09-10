import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';
import AltContainer from 'alt/AltContainer';
import ScheduleStore from './schedule_store';
import ScheduleActions from './schedule_actions';
import SchedulerWrapper from './scheduler_wrapper';
import RangeDate from './range_date';
import DateRange from './date_range';

@DragDropContext(HTML5Backend)
export default class Scheduler extends React.Component {
  static propTypes = {
    resources: React.PropTypes.array,
    from: React.PropTypes.string,
    to: React.PropTypes.string
  }

  static defaultProps = {
    resources: [],
    from: new RangeDate().toString(),
    to: new RangeDate().advance('weeks', 2).toString()
  }

  componentWillMount() {
    ScheduleActions.setInitialState({ range: new DateRange(this.props.from, this.props.to) });
  }

  render() {
    return (
      <AltContainer
        stores={{ScheduleStore}}
        actions={{ScheduleActions}}
        transform={({ ScheduleStore, ScheduleActions }) => {
          var store = ScheduleStore.toJS();

          return {...store, ScheduleActions}
        }}>
        
        <SchedulerWrapper />
      </AltContainer>
    );
  }
}

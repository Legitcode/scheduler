import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';
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

  constructor(props) {
    super(props);

    this.range = new DateRange(this.props.from, this.props.to); 
  }

  render() {
    return (
      <div>
        <button onClick={this.previousClicked}>&lsaquo;</button>
        { this.range.toString() }
        <button onClick={this.nextClicked}>&rsaquo;</button> 
      </div>
    );
  }
}

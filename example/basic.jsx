import React from 'react'
import { render } from 'react-dom'
import Scheduler from '../src/scheduler'
import RangeDate from '../src/range_date'
import DateRange from '../src/date_range'
import Perf from 'react-addons-perf'
window.Perf = Perf

var resources = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'],
    today = new RangeDate(new Date()),
    events = [
      {
        id: 'foobar',
        title: 'Do this',
        startDate: today.advance('days', 1).toRef(),
        duration: 5,
        resource: 'One'
      },
      {
        id: 'barfoo',
        title: 'Do that',
        startDate: today.advance('days', 3).toRef(),
        duration: 4,
        resource: 'Two'
      },
      {
        id: 'barfoobaz',
        title: 'I am disabled',
        startDate: today.advance('days', 2).toRef(),
        duration: 7,
        resource: 'Three',
        disabled: true
      },
      {
        id: 'foobah',
        title: 'Do another thing',
        startDate: today.advance('days', 6).toRef(),
        duration: 14,
        resource: 'Seven'
      },
      {
        id: 'foobaz',
        title: 'Do another thing next month',
        startDate: today.advance('days', 36).toRef(),
        duration: 14,
        resource: 'Seven'
      }
    ]

class Basic extends React.Component {
  constructor(props) {
    super(props)
    let from = new RangeDate()
    let to = from.advance('weeks', 2)

    this.state = {
      events: props.events,
      range: new DateRange(from, to)
    }
  }

  eventChanged(props) {
    const index = this.state.events.findIndex(event => event.id === props.id)
    const newEvents = this.state.events
    newEvents[index] = props
    this.setState({ ...props, events: newEvents })
    console.log(props)
  }

  eventResized(props) {
    const index = this.state.events.findIndex(event => event.id === props.id)
    const newEvents = this.state.events
    newEvents[index] = props
    this.setState({ ...props, events: newEvents })
    console.log(props)
  }

  eventClicked(props) {
    alert(`${props.title} clicked!`)
    console.log(props)
  }

  cellClicked(resource, date) {
    alert(`You clicked on ${resource} - ${date}`)
    console.log(resource, date)
  }

  rangeChanged(range) {
    this.setState({ range: range })
  }

  render() {
    const { events, range, title, startDate, duration, resource } = this.state,
          { from, to } = range

    return (
      <div>
        <Scheduler
          from={from}
          to={to}
          resources={resources}
          events={events}
          width={1100}
          onEventChanged={::this.eventChanged}
          onEventResized={::this.eventResized}
          onEventClicked={::this.eventClicked}
          onCellClicked={::this.cellClicked}
          onRangeChanged={::this.rangeChanged}
        />
        <br />
        <div className='well' style={{ width: 1100 }}>
          <h3>Current Event</h3>
          <ul>
            <li>Title: {title}</li>
            <li>Start Date: {startDate}</li>
            <li>Duration: {duration} days</li>
            <li>Resource: {resource}</li>
          </ul>
        </div>
      </div>
    )
  }
}

require('../src/css/default.scss')
render(<Basic resources={resources} events={events} />, document.getElementById('react'))

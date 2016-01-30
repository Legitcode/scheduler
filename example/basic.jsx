import React from 'react'
import { render } from 'react-dom'
import Scheduler from '../src/scheduler'
import RangeDate from '../src/range_date'

var resources = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'],
    today = new RangeDate(new Date()),
    events = [
      {
        id: 'foobar',
        title: 'Do this',
        startDate: today.advance('days', 1).toRef(),
        duration: 5,
        resource: 'One',
        styles: {
          backgroundColor: 'red',
        }
      },
      {
        id: 'barfoo',
        title: 'Do that',
        startDate: today.advance('days', 3).toRef(),
        duration: 4,
        resource: 'Two',
        styles: {
          backgroundColor: 'blue',
          color: 'white'
        }
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
      }
    ]

class Basic extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      events: events
    }
  }

  eventChanged(props) {
    this.setState(props)
    console.log(props)
  }

  eventResized(props) {
    this.setState(props)
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

  render() {
    const { title, startDate, duration, resource } = this.state

    return (
      <div>
        <Scheduler
          resources={resources}
          events={events}
          width={1100}
          onEventChanged={::this.eventChanged}
          onEventResized={::this.eventResized}
          onEventClicked={::this.eventClicked}
          onCellClicked={::this.cellClicked}
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

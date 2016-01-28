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

function eventChanged(props) {
  console.log(props)
}

function eventResized(props) {
  console.log(props)
}

const Basic = ({ resources, events }) => (
  <Scheduler
    resources={resources}
    events={events}
    onEventChanged={eventChanged}
    onEventResized={eventResized}
  />
)

require('../src/css/default.scss')
render(<Basic resources={resources} events={events} />, document.getElementById('react'))

import React from 'react'
import { render } from 'react-dom'
import Scheduler from '../src/scheduler'
import RangeDate from '../src/range_date'

var resources = ['One', 'Two', 'Three', 'Four'],
    today = new RangeDate(new Date()),
    events = [
      {
        id: 'foobar',
        title: 'Do this',
        startDate: today.advance('days', 1).toRef(),
        duration: 5,
        resource: 'One',
        uuid: 'foobar'
      },
      {
        id: 'barfoo',
        title: 'Do that',
        startDate: today.advance('days', 3).toRef(),
        duration: 4,
        resource: 'Two',
        uuid: 'barfoo'
      },
      {
        id: 'barfoobaz',
        title: 'I am disabled',
        startDate: today.advance('days', 2).toRef(),
        duration: 7,
        resource: 'Three',
        disabled: true,
        uuid: 'barfoobaz'
      }
    ]

const Basic = ({ resources, events }) => (
  <Scheduler
    resources={resources}
    events={events}
  />
)

require('../src/css/default.scss')
render(<Basic resources={resources} events={events} />, document.getElementById('react'))

import React from 'react'
import { render } from 'react-dom'
import Scheduler from '../src/scheduler'

var resources = ['One', 'Two', 'Three', 'Four'],
    events = [
      {
        id: 'foobar',
        title: 'Do this',
        startDate: '2016-01-24',
        duration: 5,
        resource: 'One'
      },
      {
        id: 'barfoo',
        title: 'Do that',
        startDate: '2016-01-26',
        duration: 4,
        resource: 'Two'
      },
      {
        id: 'barfoobaz',
        title: 'I am disabled',
        startDate: '2016-01-27',
        duration: 7,
        resource: 'Three',
        disabled: true
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

import React from 'react'
import { render } from 'react-dom'
import Scheduler from '../src/scheduler'

var resources = ['One', 'Two', 'Three', 'Four'],
    events = [
      {
        id: 'foobar',
        title: 'Do this',
        startDate: '2016-01-25',
        duration: 5,
        resource: 'One',
        uuid: 'foobar'
      },
      {
        id: 'barfoo',
        title: 'Do that',
        startDate: '2016-01-26',
        duration: 4,
        resource: 'Two',
        uuid: 'barfoo'
      },
      {
        id: 'barfoobaz',
        title: 'I am disabled',
        startDate: '2016-01-27',
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

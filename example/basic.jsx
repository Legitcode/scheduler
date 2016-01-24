import React from 'react'
import { render } from 'react-dom'
import Scheduler from '../src/scheduler'

var resources = ['One', 'Two'],
    events = [
      {
        title: 'Do this',
        x: 2,
        y: 0,
        w: 2,
        h: 1,
        i: 0
      },
      {
        title: 'Do that',
        x: 0,
        y: 1,
        w: 2,
        h: 1,
        i: 1
      },
      {
        title: 'Static',
        x: 0,
        y: 0,
        w: 2,
        h: 1,
        i: 2,
        static: true
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

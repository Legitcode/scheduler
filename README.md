[![Codetree](https://codetree.com/images/managed-with-codetree.svg)](https://codetree.com/projects/Q6Rz)

# Legit Scheduler
A pure React implementation of a drag and drop scheduler

## Usage

Install it:
```bash
$ npm install --save legit-scheduler
```

Import it:
```js
import Scheduler from 'legit-scheduler'
```

The scheduler component has three required props:
`events`    - An array of event objects
`resources` - An array of resources
`width`     - The width of the scheduler container, in pixels. An integer.

The resources array is just strings:
```
['Resource 1', 'Resource 2', 'Resource 3']
```

The events array is an array of objects:
```
{
  title: 'A great event',  // Required: The title of the event
  startDate: '2016-01-24', // Required: The start date, must be in the format of "YYYY-MM-DD"
  duration: 4,             // Required: The duration of the event in days
  resource: 'Resource 1',  // Required: The name of the resource the event belongs to. Must match the resource name from the resources prop
  id: '3829-fds89',        // Required: A unique identifier. This can be anything you want as long as it's unique
  disabled: false,         // Optional: Whether or not this event can be moved (it can still be resized). Defaults to false.
  styles: {}               // Optional: An object of styles to apply to the event object
}
```

The scheduler component also takes four more optional props:

`onEventChanged` - A call back that is fired when the event is moved. It receives an object containing the new event props
`onEventResized` - A call back that is fired when the event is resized. It receives an object containing the new event props
`onEventClicked` - A call back that is fired when the event is clicked. It receives an object containing the event props
`onCellClicked`  - A call back that is fired when an empty cell on the scheduler is clicked. It receives the date and resource name as props
`onRangeChanged` - A call back that is fired when the date range is changed. It receives a `DateRange` object with the new range.

## Development
```bash
$ npm install
$ npm run example
```

Visit: `localhost:8080/example`

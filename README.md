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

Use it:
```
<Scheduler />
```

Ok, it's not THAT easy, there is a bit of configuration. You must give the
scheduler component an array of `resources` and `events` as props. The
resources are just strings that represent the name of the resources on the
left side of the scheduler.

```
['Resource 1', 'Resource 2', 'Resource 3']
```

The events is also an array, but it's an array of objects:
```
{
  title: 'A great event', // Required: The title of the event
  startDate: '2016-01-24', // Required: The start date, must be in the format of "YYYY-MM-DD"
  duration: 4, // Required: The duration of the event in days
  resource: 'Resource 1', // Required: The name of the resource the event belongs to. Must match the resource name from the resources prop
  id: '3829-fds89', // Required: A unique identifier. This can be anything you want as long as it's unique
  disabled: false // Optional: Whether or not this event can be moved (it can still be resized). Defaults to false.
}
```

The scheduler component also takes three more optional props:

`eventChanged` - A call back that is fired when the event is moved. It receives an object containing the new event props
`eventResized` - A call back that is fired when the event is resized. It receives an object containing the new event props
`eventClicked` - A call back that is fired when the event is clicked. It receives an object containing the event props

## Development
```bash
$ npm install
$ npm run example
```

Visit: `localhost:8080/example`

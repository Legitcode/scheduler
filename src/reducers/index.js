import { combineReducers } from 'redux'
import event from './event'
import range from './range'
import cells from './cells'

export default combineReducers({
  event,
  range,
  cells
})

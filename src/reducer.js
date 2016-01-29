import { Map } from 'immutable'

let defaultState = Map({
  events: [],
  resources: [],
  cells: {}
})

export default (state = defaultState, action) => {
  switch (action.type) {
  }
}

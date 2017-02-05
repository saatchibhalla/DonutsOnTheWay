import { FETCH_LOCATION } from '../actions/get_location';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_LOCATION:
    console.log(action.payload.data);
      return action.payload.data; //returns a new instance of state
  }
  return state;
}

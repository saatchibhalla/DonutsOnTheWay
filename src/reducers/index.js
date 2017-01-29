import { combineReducers } from 'redux';
import ReducerLocation from './reducer_location';

const rootReducer = combineReducers({
  location: ReducerLocation
});

export default rootReducer;

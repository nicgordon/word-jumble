import { combineReducers } from 'redux';
import score from './score';
import tiles from './tiles';
import time from './time';

const rootReducer = combineReducers({
  score,
  time,
  tiles,
});

export default rootReducer;
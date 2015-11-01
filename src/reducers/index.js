import { combineReducers } from 'redux';
import game from './game';
import score from './score';
import tiles from './tiles';
import time from './time';

const rootReducer = combineReducers({
  game,
  score,
  tiles,
  time,
});

export default rootReducer;
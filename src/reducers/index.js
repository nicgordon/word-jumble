import { combineReducers } from 'redux';
import game from './game';
import score from './score';
import tile from './tile';
import time from './time';

const rootReducer = combineReducers({
  game,
  score,
  tile,
  time,
});

export default rootReducer;
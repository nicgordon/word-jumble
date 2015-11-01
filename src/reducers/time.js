import {
  START_TIMER,
  STOP_TIMER,
  TIMER_TICK,
} from '../actions/action-types';
import { TIMER_STATE } from '../constants';

const initialState = {
  timeRemaining: 60,
  timerState: TIMER_STATE.OFF,
};

export default function time(state = initialState, action = {}) {
  const reducers = {
    [START_TIMER]: () => {
      return {
        ...state,
        timerState: TIMER_STATE.ON,
      };
    },
    [STOP_TIMER]: () => {
      return {
        ...state,
        timerState: TIMER_STATE.OFF,
      };
    },
    [TIMER_TICK]: () => {
      return {
        ...state,
        timeRemaining: state.timeRemaining - 1,
      };
    },
  };

  return reducers[action.type] ? reducers[action.type]() : state;
}

import { START_TIMER, STOP_TIMER, TIMER_TICK } from '../actions/action-types';

function startTimer() {
  return {
    type: START_TIMER,
  };
}

function stopTimer() {
  return {
    type: STOP_TIMER,
  };
}

function timerTick() {
  return {
    type: TIMER_TICK,
  }
}

export default {
  startTimer,
  stopTimer,
  timerTick,
};

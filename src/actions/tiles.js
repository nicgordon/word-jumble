import { TOUCH_TILE, CLEAR_ATTEMPT, SUBMIT_ATTEMPT } from '../actions/action-types';

function touchTile(tileIndex, tileMovement) {
  return {
    type: TOUCH_TILE,
    index: tileIndex,
    movement: tileMovement,
  };
}

function clearAttempt() {
  return {
    type: CLEAR_ATTEMPT,
  };
}

function submitAttempt(submission) {
  return {
    type: SUBMIT_ATTEMPT,
    submission,
  }
}

export default {
  touchTile,
  clearAttempt,
  submitAttempt,
};

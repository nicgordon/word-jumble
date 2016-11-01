import { CHANGE_GAME_STATE } from '../actions/action-types';

function changeGameState(newState) {
  return {
    type: CHANGE_GAME_STATE,
    newState,
  };
}

export default {
  changeGameState,
};

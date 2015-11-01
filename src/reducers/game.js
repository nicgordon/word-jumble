import {
  CHANGE_GAME_STATE,
} from '../actions/action-types';
import { GAME_STATE } from '../constants';

const initialState = {
  state: GAME_STATE.PRE_GAME,
};

export default function game(state = initialState, action = {}) {
  const reducers = {
    [CHANGE_GAME_STATE]: () => {
      return {
        ...state,
        state: action.newState,
      };
    },
  };

  return reducers[action.type] ? reducers[action.type]() : state;
}

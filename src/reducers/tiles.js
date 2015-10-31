import { TOUCH_TILE, CLEAR_ATTEMPT, SUBMIT_ATTEMPT } from '../actions/action-types';
import { TILE_MOVEMENT } from '../constants';

const initialState = {
  jumble: [
    { value: 'c' },
    { value: 'h' },
    { value: 'i' },
    { value: 'c' },
    { value: 'k' },
    { value: 'e' },
    { value: 'n' },
  ],
  attempt: [],
};

const tilePlaceholder = { value: '' };

function returnAllTilesToJumble(attempt, jumble) {
  attempt.forEach(tile => {
    returnTileToJumble(tile, jumble);
  });
  attempt = [];
}

function returnTileToJumble(tile, jumble) {
  // Loop through the jumble until we find a placeholder and replace it with the tile
  for (let i = 0, len = jumble.length; i < len; i++) {
    const jumbleTile = jumble[i];

    if (jumbleTile.value === '') {
      jumble.splice(i, 1, touchedTile);
      break;
    }
  }
}

export default function time(state = initialState, action = {}) {
  const reducers = {
    [TOUCH_TILE]: () => {
      const newState = { ...state };
      if (action.movement === TILE_MOVEMENT.ADD_TO_ATTEMPT) {
        // Grab the touched tile from the jumble and replace it with a placeholder
        const touchedTile = newState.jumble.splice(action.index, 1, { ...tilePlaceholder })[0];
        // Append the touched tile to the attempt
        newState.attempt.push(touchedTile);
      } else {
        // Grab the touched tile from the attempt
        const touchedTile = newState.attempt.splice(action.index, 1)[0];
        returnTileToJumble(touchedTile, newState.jumble);
      }

      return newState;
    },
    [CLEAR_ATTEMPT]: () => {
      const newState = { ...state };
      returnAllTilesToJumble(newState.attempt, newState.jumble);
      return newState;
    },
    [SUBMIT_ATTEMPT]: () => {
      const newState = { ...state };
      returnAllTilesToJumble(newState.attempt, newState.jumble);
      return newState;
    },
  };

  return reducers[action.type] ? reducers[action.type]() : state;
}

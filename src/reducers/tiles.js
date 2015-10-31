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
  // Empty array whilst maintaining reference to the same array
  attempt.splice(0, attempt.length);
}

function returnTileToJumble(tile, jumble) {
  // Loop through the jumble until we find a placeholder and replace it with the tile
  for (let i = 0, len = jumble.length; i < len; i++) {
    const jumbleTile = jumble[i];

    if (jumbleTile.value === '') {
      jumble.splice(i, 1, tile);
      break;
    }
  }
}

export default function tiles(state = initialState, action = {}) {
  const reducers = {
    [TOUCH_TILE]: () => {
      const newState = { ...state };
      const attempt = newState.attempt.slice();
      const jumble = newState.jumble.slice();

      if (action.movement === TILE_MOVEMENT.ADD_TO_ATTEMPT) {
        // Grab the touched tile from the jumble and replace it with a placeholder
        const touchedTile = jumble.splice(action.index, 1, { ...tilePlaceholder })[0];
        // Append the touched tile to the attempt
        attempt.push(touchedTile);
      } else {
        // Grab the touched tile from the attempt
        const touchedTile = attempt.splice(action.index, 1)[0];
        returnTileToJumble(touchedTile, jumble);
      }

      newState.attempt = attempt;
      newState.jumble = jumble;
      return newState;
    },
    [CLEAR_ATTEMPT]: () => {
      const newState = { ...state };
      const attempt = newState.attempt.slice();
      const jumble = newState.jumble.slice();

      returnAllTilesToJumble(attempt, jumble);

      newState.attempt = attempt;
      newState.jumble = jumble;
      return newState;
    },
    [SUBMIT_ATTEMPT]: () => {
      const newState = { ...state };
      const attempt = newState.attempt.slice();
      const jumble = newState.jumble.slice();

      returnAllTilesToJumble(attempt, jumble);

      newState.attempt = attempt;
      newState.jumble = jumble;
      return newState;
    },
  };

  return reducers[action.type] ? reducers[action.type]() : state;
}

import { CLEAR_SELECTED } from '../actions/action-types';

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
  solution: [],
};

export default function todos(state = initialState, action) {
  switch (action.type) {
    case CLEAR_SELECTED:
      return state;
    default:
      return state;
  }
}
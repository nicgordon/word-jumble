import { CLEAR_SELECTED } from '../actions/action-types';

const initialState = {
  collection: [],
  selected: [],
};

export default function todos(state = initialState, action) {
  switch (action.type) {
    case CLEAR_SELECTED:
      return state;
    default:
      return state;
  }
}
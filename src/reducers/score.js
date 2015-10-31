import {
  SUBMIT_ATTEMPT,
} from '../actions/action-types';

const initialState = {
  error: null,
  score: 0,
  wordList: [],
};

// TODO: Remove this, it is obviously temporary
const validAttempts = [
  'check',
  'checks',
  'chi',
  'chic',
  'chick',
  'chicken',
  'chickens',
  'chicks',
  'chin',
  'chine',
  'chink',
  'chinks',
  'chins',
  'cinch',
  'cine',
  'cines',
  'eh',
  'en',
  'he',
  'hen',
  'hens',
  'hi',
  'hick',
  'hie',
  'hies',
  'hike',
  'hikes',
  'hin',
  'hins',
  'his',
  'i',
  'ice',
  'ices',
  'in',
  'inch',
  'inches',
  'ink',
  'inks',
  'is',
  'ken',
  'kens',
  'kin',
  'kine',
  'neck',
  'necks',
  'nice',
  'niche',
  'nick',
  'nicks',
  'scenic',
  'sec',
  'sen',
  'sh',
  'she',
  'sheik',
  'shin',
  'shine',
  'si',
  'sic',
  'sick',
  'sicken',
  'sike',
  'sin',
  'since',
  'sine',
  'sink',
  'skein',
  'ski',
  'skin',
  'sneck',
  'snick'
];

function getScore(word) {
  function factorial(n) {
    if (n === 0) {
      return 1;
    }

    return n * factorial(n - 1);
  }

  return factorial(word.length);
}

export default function score(state = initialState, action = {}) {
  const reducers = {
    [SUBMIT_ATTEMPT]: () => {
      if (!action.submission) {
        return state;
      }

      const newState = { ...state };
      if (validAttempts.indexOf(action.submission) > -1) {
        newState.score += getScore(action.submission);
      }

      return newState;
    },
  };

  return reducers[action.type] ? reducers[action.type]() : state;
}

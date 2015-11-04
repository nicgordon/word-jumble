import _ from 'lodash';
import wordList from '../data/en-words.txt';

const cache = {
  jumbles: [], // 8 letter words
  solutions: { a: [], b: [], c: [], d: [], e: [], f: [], g: [], h: [], i: [], j: [], k: [], l: [], m: [], n: [], o: [], p: [], q: [], r: [], s: [], t: [], u: [], v: [], w: [], x: [], y: [], z: [] }, // All words grouped by first letter
};

// Checks to make sure that a word does not contain the same letter too many times
function hasValidLetterRepititions(maxRepititions, word) {
  // Loop through each letter
  function validateLetters(letters) {
     // Only maxReps letters left, even if they are the same letter it cannot be invalid
    if (letters.length <= maxRepititions) {
      return true;
    }

    // Get the first letter
    let letter = letters.splice(0, 1);
    let i = letters.length;
    // Loop through the word extracting any letters that are the same
    while (i--) {
      if (letters[i] === letter[0]) {
        letter = letter.concat(letters.splice(i, 1));
      }
    }

    // If this letter is repeated too many times then we can return false
    if (letter.length > maxRepititions) {
      return false;
    }

    return validateLetters(letters);
  }

  return validateLetters(word.split(''));
}

const dictionary = {
  loadWords: () => {
    const words = wordList.split('\n');

    for (let i = 0, len = words.length; i < len; i++) {
      const word = words[i];
      if (word.length) {
        if (word.length === 8 && hasValidLetterRepititions(2, word)) {
          cache.jumbles.push(word);
        }

        cache.solutions[word.slice(0, 1)].push(word);
      }
    }
  },
};

export default dictionary;

var jumbleDisplay = document.getElementById('jumble');
var timeDisplay = document.getElementById('timer');
var solution = document.getElementsByName('solution')[0];
var score = document.getElementById('score');
var submitButton = document.getElementsByName('submit')[0];
var clearButton = document.getElementsByName('clear')[0];
var wordList = document.getElementById('word-list');
var overallScore = 0;
var timeRemaining = 120;
var timer = null;

var theJumble = 'chickens';
var acceptableSolutions = generateAcceptableSolutions();

// Print the jumble to the page
printJumble(theJumble);

function printJumble(jumble) {
  var shuffled = jumble;
  while (shuffled == jumble) {
    shuffled = theJumble
      .split('')
      .sort(function(){return 0.5-Math.random()})
      .join(' ')
      .toUpperCase();
  }
  jumbleDisplay.textContent = shuffled;
}

function isSubAnagram(word, jumble) {
/*  loop thru each letter in the word
  match it with a letter from the jumble
  remove letter from jumble
*/
  jumble = jumble.split('');
  
  for(var i = 0, len = word.length; i < len; i++) {
    var letter = word[i];
    var letterPositionInJumble = jumble.indexOf(letter);
    
    if (letterPositionInJumble < 0) {
      return false;
    }
    
    jumble.splice(letterPositionInJumble, 1);
  }
  
  return true;
}

function isInWordList(word) {
  for (var i = 0, len = wordList.children.length; i < len; i++) {
    var wordListWord = wordList.children[i].textContent;
    
    if (wordListWord === word) {
      return true;
    }
  }
  
  return false;
}

function isInAcceptableSolutions(word) {
  return acceptableSolutions.indexOf(word) > -1;
}

function isValidSolution(word) {
  /*var inWordList = isInWordList(word);
  var isASubAnagram = isSubAnagram(word, theJumble);
  var isAcceptable = isInAcceptableSolutions(word);
  
  console.log('is in word list', inWordList);
  console.log('is sub anagram', isASubAnagram);
  console.log('is acceptable', isAcceptable);
  
  return !inWordList && isASubAnagram && isAcceptable; */
  return !isInWordList(word) && isSubAnagram(word, theJumble) && isInAcceptableSolutions(word);
}

function updateScore(word) {
  var wordScore = word.length * 2 - 1;
  overallScore += wordScore;
  
  score.textContent = overallScore;
}

function submitSolution() {
  var word = solution.value.toLowerCase();
  
  if (isValidSolution(word)) {
    var wordListItem = document.createElement('li');
    var wordListItemTextNode = document.createTextNode(word);
    wordListItem.appendChild(wordListItemTextNode);
    wordList.insertBefore(wordListItem, wordList.firstChild);
    
    updateScore(word);
    
    solution.value = '';
    solution.focus();
    
    if (timer === null) {
      timer = window.setInterval(function() {
        timeRemaining--;
        if (timeRemaining === 0) {
          solution.disabled = true;
          submitButton.disabled = true;
        }
        timeDisplay.textContent = timeRemaining;
      }, 1000)
    }
  }
}

clearButton.addEventListener('click', function() {
  solution.value = '';
});

submitButton.addEventListener('click', submitSolution);

solution.addEventListener('keypress', function(e) {
  var key = e.which || e.keyCode;
  if (key === 13) { // 13 is enter
    submitSolution();
  }
});

function generateAcceptableSolutions() {
  return [
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
}
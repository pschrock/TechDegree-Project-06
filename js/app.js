const startButton = document.getElementsByClassName('btn__reset')[0];
const overlay = document.getElementById('overlay');

const qwerty = document.getElementById('qwerty');
const keyrow = document.getElementsByClassName('keyrow');
const qwertyButton = document.getElementsByTagName('button');

const phrases = ['takes one to know one', 'we are the champions', 'penny for your thoughts', 'walk in the park', 'best of both worlds'];
// const phrase = document.getElementById('phrase');

const scoreboard = document.getElementById('scoreboard');
const triesLi = document.getElementsByClassName('#scoreboard tries');

let missed = 0;

function getRandomPhraseAsArray(arr){
  let randomPhrase = arr[Math.floor(Math.random() * arr.length)];
  let phraseCharArray = randomPhrase.split('');
  return phraseCharArray;
}

function addPhrasetoDisplay(arr){
  // do stuff any arr that is passed in, and add to `#phrase ul`
  for (let i = 0; i < arr.length; ++i) {
    const ul = document.getElementsByTagName('ul')[0];
    const li = document.createElement('li');
    li.textContent = arr[i];
    if (arr[i] == " ") {
      li.className = 'space';
    } else {
      li.className = 'letter';
    }
    ul.appendChild(li);
  }
}

const phraseLetters = document.getElementsByClassName('letter');
let letterFound = null;

startButton.addEventListener('click', () => {
    overlay.style.display = 'none';
});

const phraseArray = getRandomPhraseAsArray(phrases);
addPhrasetoDisplay(phraseArray);

qwerty.addEventListener('click', function checkLetter (event) {
  let letterOfSelection = event.target.textContent;
  let i = 0;
  do {
    if (letterOfSelection == phraseLetters[i].textContent) {
      phraseLetters[i].className += ' show';
      letterFound = phraseLetters[i].innerHTML;
      break;
    }
    ++i;
  } while (i < phraseLetters.length)
  console.log(letterFound);
});

window.addEventListener('keypress', function checkLetter (event) {
  let letterOfSelection = event.key;
  console.log(letterOfSelection);
  let i = 0;
  do {
    if (letterOfSelection == phraseLetters[i].textContent) {
      phraseLetters[i].className += ' show';
      letterFound = phraseLetters[i].innerHTML;
      break;
    }
    ++i;
  } while (i < phraseLetters.length)
  console.log(letterFound);
});

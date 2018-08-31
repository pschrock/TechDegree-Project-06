const overlayButton = document.querySelector('.btn__reset');
const overlay = document.querySelector('#overlay');
//Get the element with the ID of phrase
const phrase = document.getElementById('phrase');
//Get the element with the ID of qwerty
const qwerty = document.getElementById('qwerty');
const qwertyButton = document.querySelectorAll('.keyrow button');
//get all of the elements with a class of “letter”
const letter = document.getElementsByClassName('letter');
const show = document.getElementsByClassName('show');
const tries = document.querySelectorAll('#scoreboard li');
const hearts = document.querySelectorAll('#scoreboard img')
//Create a phrases array that contains at least 5 different phrases as strings
const phrases = [
  'takes one to know one',
  'we are the champions',
  'penny for your thoughts',
  'walk in the park',
  'best of both worlds'
];
//Create a missed variable, initialized to 0
let missed = 0;

//Create a getRandomPhraseAsArray function
function getRandomPhraseAsArray(arr){
  // randomly choose a phrase from phrases array
  let randomPhrase = arr[Math.floor(Math.random() * arr.length)];
  //split that phrase into a new array of characters
  let phraseCharArray = randomPhrase.split('');
  //return the new character array
  return phraseCharArray;
}

//Create an addPhraseToDisplay function
function addPhrasetoDisplay(arr){
  //loops through an array of characters
  for (let i = 0; i < arr.length; ++i) {
    //create a list item, put the character inside of the list item
    const ul = document.querySelector('#phrase ul');
    const li = document.createElement('li');
    li.textContent = arr[i];
    //If character is letter not space,
    //add class “letter” to list item
    if (arr[i] == " ") {
      li.className = 'space';
    } else {
      li.className = 'letter';
    }
    //append that list item to the #phrase ul
    ul.appendChild(li);
  }
}

//Create a checkLetter function
//should have one parameter: the button the player has clicked
function checkLetter (parameter) {
  let selectedLetter = parameter.target.textContent;
  //match wasn’t found should return null
  let attemptedLetter = null;
  //loop over the letters and check if they match the letter in the button
  for (let i = 0; i < letter.length; ++i) {
    let phraseLetter = letter[i].textContent;
    if (phraseLetter == selectedLetter) {
      //match should add the “show” class to the list item
      letter[i].classList.add('show');
      //store the matching letter inside of a variable
      attemptedLetter = selectedLetter;
    }
  }
  //return that letter.
  return attemptedLetter;
}

//Create a checkWin function
function checkWin () {
  const message = document.createElement('p');
  message.style.fontSize = '3em';
  //check number of letters with class “show” equal number of letters with class “letters”
  if (show.length == letter.length) {
    //win -- overlay screen with “win” class and appropriate text.
    overlay.style.display = 'flex';
    overlay.className = 'win';
    overlayButton.textContent = 'Play Again';
    message.textContent = 'Congratulations, You Win!'
    if (overlayButton.nextElementSibling === null) {
      overlay.appendChild(message);
    }
  } else if (missed == 5) {
    //lose -- overlay screen with the “lose” class and appropriate text.
    overlay.style.display = 'flex';
    overlay.className = 'lose';
    overlayButton.textContent = 'Try Again';
    message.textContent = 'Sorry, You Ran Out of Hearts!'
    if (overlayButton.nextElementSibling === null) {
      overlay.appendChild(message);
    }
  }
}

function reset() {
  window.location.reload(true);
}

overlayButton.addEventListener('click', (event) => {
  let button = event.target.textContent;
  if (button == 'Start Game') {
    overlay.style.display = 'none';
    //Resets the game with a new phrase
  } else if (button == 'Play Again') {
    reset();
    //Resets the game with the same phrase
  } else if (button == 'Try Again') {
    const overlayP = document.querySelector('#overlay p');
    missed = 0;
    for (let i = 0; i < qwertyButton.length; ++i) {
      qwertyButton[i].classList.remove('chosen');
      qwertyButton[i].removeAttribute('style');
      qwertyButton[i].removeAttribute('disabled');
    }
    for (let i = 0; i < letter.length; ++i) {
      letter[i].classList.remove('show');
    }
    for (let i = 0; i < tries.length; ++i) {
      tries[i].classList.add('tries');
      hearts[i].setAttribute('src', 'images/liveHeart.png');
    }
    overlay.style.display = 'none';
  }
});

//Use event delegation to listen only to button events from the keyboard
qwerty.addEventListener('click', (event) => {
    const selectedButton = event.target;
    //only tag 'BUTTON' will respond
    if (selectedButton.tagName === 'BUTTON') {
      //chosen letter adds the “chosen” class
      selectedButton.classList.add('chosen');
      //button can’t be chosen twice with attribute “disabled”
      selectedButton.setAttribute("disabled", true);
      //checkLetter function will be used inside of the event listener
      //Pass the button to the checkLetter function
      //store the letter returned inside of a variable called letterFound
      let letterFound = checkLetter(event);
      //If the checkLetter function returns a null value, the player has guessed the wrong letter.
      if (letterFound === null) {
        //remove one of the tries from the scoreboard
        tries[missed].classList.remove('tries');
        hearts[missed].setAttribute('src', 'images/lostHeart.png');
        selectedButton.style.backgroundColor = '#ad4c4c';
        //make sure to increase the missed count by 1
        ++missed;
      }
    }
    checkWin();
});

//getRandomPhrasesArray, save it to a variable,
//pass to addPhraseToDisplay as argument
const phraseArray = getRandomPhraseAsArray(phrases);
addPhrasetoDisplay(phraseArray);

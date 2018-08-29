
// start button hides overlay
const startButton = document.getElementsByClassName('btn__reset')[0];
const overlay = document.getElementById('overlay');

startButton.addEventListener('mouseup', () => {
    overlay.style.display = 'none';
});


// array of 5 phrases
const phrasesArray = ['takes one to know one', 'we are the champions', 'penny for your thoughts', 'walk in the park', 'best of both worlds'];
const ul = document.getElementsByTagName('ul')[0];

let randomPhrase = phrasesArray[Math.floor(Math.random() * phrasesArray.length)];
let phraseLetters;

for (let i = 0; i < randomPhrase.length; i += 1) {
  let li = document.createElement('li');
  li.textContent = randomPhrase[i];
  if (randomPhrase[i] == " ") {
    li.className = 'space';
  } else {
    li.className = 'letter';
  }
  ul.appendChild(li);
}


//qwerty selection

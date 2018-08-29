
// start button hides overlay
const startButton = document.getElementsByClassName('btn__reset')[0];
const overlay = document.getElementById('overlay');

startButton.addEventListener('click', () => {
    overlay.style.display = 'none';
});


// array of 5 phrases
const phrasesArray = ['takes one to know one', 'we are the champions', 'penny for your thoughts', 'walk in the park', 'best of both worlds'];
const ul = document.getElementsByTagName('ul')[0];

let randomPhrase = phrasesArray[Math.floor(Math.random() * phrasesArray.length)];

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
const letterSelection = document.getElementsByClassName('keyrow');

for (let i = 0; i < letterSelection.length; i += 1) {
  letterSelection[i].addEventListener('click', (event) => {
    let selection = event.target.textContent;
    const lettersLi = ul.children;
    for (let i = 0; i < lettersLi.length; i += 1){
      if (selection == lettersLi[i].textContent) {
        lettersLi[i].className += ' show';
      } else {
        //minus hearts
      }
    }
  });
}

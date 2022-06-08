let breeds = [
  'bengal',
  'siamese',
  'sphynx',
  'savannah',
  'ragdoll',
  'bombay',
  'ragamuffin',
  'bulldog',
  'pitbull',
  'chihuahua',
  'shihtzu',
  'bostonterrier',
  'dobermann',
  'poodle',
];

let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
  answer = breeds[Math.floor(Math.random() * breeds.length)];
}

function generateButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'
    .split('')
    .map(
      (letter) =>
        `
      <button
        class="btn btn-lg btn-primary m-2"
        id='` +
        letter +
        `'
        onClick="handleGuess('` +
        letter +
        `')"
      >
        ` +
        letter +
        `
      </button>
    `
    )
    .join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter) {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}

function updateHangmanPicture() {
  document.getElementById('hangmanPic').src =
    './images/hangmanimages/' + mistakes + '.jpg';
}

function checkIfGameWon() {
  if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = 'You Won!';
    // const wonAnswer = document.getElementById('wordSpotlight').innerText.trim();
    // console.log(wonAnswer);

    // switch (wonAnswer) {
    //   case 'bengal':
    //     window.alert('bengal');
    //     break;
    //   case 'siamese':
    //     window.alert('siamese');
    //     break;
    //   case 'sphynx':
    //     window.alert('sphynx');
    //     break;
    //   case 'savannah':
    //     window.alert('savannah');
    //     break;
    //   case 'ragdoll':
    //     window.alert('ragdoll');
    //     break;
    //   case 'bombay':
    //     window.alert('bombay');
    //     break;
    //   case 'ragamuffin':
    //     window.alert('ragamuffin');
    //     break;
    // }
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    document.getElementById(
      'wordSpotlight'
    ).innerHTML = ` The answer was: <a href="https://www.google.com/search?q=${answer}">${answer} </a>`;
    document.getElementById('keyboard').innerHTML = 'You Lost!';
  }
}

function guessedWord() {
  wordStatus = answer
    .split('')
    .map((letter) => (guessed.indexOf(letter) >= 0 ? letter : ' _ '))
    .join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}

function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = './images/hangmanimages/0.jpg';

  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();

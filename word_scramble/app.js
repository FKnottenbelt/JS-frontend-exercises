console.clear();

const startButton = document.querySelector('.btn-start');
const guessButton = document.querySelector('.btn-guess');
const message = document.querySelector('.message');
const words = ['paard', 'pannekoek', 'huis', 'ketel', 'poes', 'dakpan'];
let solution = '';

function writeToHistory(text) {
  const history = document.querySelector('.history');
  const line = document.createElement('p');

  line.textContent = text;
  history.appendChild(line);
}

function scramble(word) {
  const wordArray = word.split('');
  const resultArray = [];

  do {
    const index = Math.floor(Math.random() * wordArray.length);
    const letter = wordArray.splice(index, 1);
    resultArray.push(letter);
  } while (wordArray.length > 0);

  return resultArray.join('');
}

function setUpGuess() {
  // get a word
  const index = Math.floor(Math.random() * words.length);
  solution = words[index];
  // scramble it
  const scrambledWord = scramble(words[index]);
  // show scrambled word
  message.textContent = scrambledWord;
  guessButton.textContent = 'Guess';
  writeToHistory(`Word to guess: ${scrambledWord}`);
}

function rateGuess() {
  const input = document.querySelector('input');
  const answer = input.value;

  if (answer === solution) {
    message.textContent = 'YES! correct';
    guessButton.textContent = 'Again';
    writeToHistory(`-  ${answer} was correct`);
  } else {
    message.textContent = 'That is not correct, try again';
    writeToHistory(`-  ${answer} was not correct`);
  }

  input.value = '';
}

function playGame() {
  const inputSection = document.querySelector('.input');

  this.classList.toggle('hidden');
  inputSection.classList.toggle('hidden');
  setUpGuess();
}

startButton.addEventListener('click', playGame);
guessButton.addEventListener('click', guessButton.textContent === 'Guess' ? rateGuess : setUpGuess());

document.addEventListener('keydown', (event) => {
  const { key } = event;
  if (key === 'Enter' && guessButton.textContent === 'Guess') rateGuess();
  else if (key === 'Enter' && guessButton.textContent === 'Again') setUpGuess();
});

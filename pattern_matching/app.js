console.clear();

const message = document.querySelector('.message');
const game = document.querySelector('.game');
const button = document.querySelector('button');
const gameColors = ['red', 'blue', 'green', 'yellow'];
let gameClicks = [];
let userClicks = [];
let inPlay = true;
let lengthOfSequence = 3;

function endGame() {
  button.disabled = false;
  if (userClicks.toString() === gameClicks.toString()) {
    lengthOfSequence += 1;
    message.textContent = 'That was correct. Let\'s up the level. Press the start button';
  } else {
    message.textContent = 'Not correct. Game over.';
    inPlay = false;
  }
}

function checkAnswer(e) {
  const userClickedBox = e.target;
  if (inPlay) {
    userClicks.push(userClickedBox.boxColor);
    userClickedBox.classList.add('active');
    setTimeout(() => {
      userClickedBox.classList.remove('active');
    }, 500);
    if (userClicks.length === gameClicks.length) {
      inPlay = false;
      endGame();
    }
  }
}

function playerTurn() {
  message.textContent = 'Your turn. Click the sequence you see';
}

function createBox(color) {
  const box = document.createElement('div');
  box.classList.add('box');
  box.style.backgroundColor = color;
  box.addEventListener('click', checkAnswer);
  box.boxColor = color; // custom property
  return box;
}

function createComputerSequence(number) {
  number -= 1;
  if (number < 0) return;
  const randomNum = Math.floor(Math.random() * gameColors.length);
  gameClicks.push(gameColors[randomNum]);

  const boxes = document.querySelectorAll('.box');
  const activeBox = boxes[randomNum];

  activeBox.classList.add('active');
  setTimeout(() => {
    activeBox.classList.remove('active');
    setTimeout(() => {
      createComputerSequence(number);
    }, 100);
  }, 500);
}

function initialize() {
  button.disabled = true;
  gameClicks = [];
  userClicks = [];
}

function playGame() {
  initialize();

  inPlay = true;
  createComputerSequence(lengthOfSequence);
  playerTurn();
}

button.addEventListener('click', () => {
  playGame();
});

function setup() {
  // create box
  gameColors.forEach((color) => {
    const box = createBox(color);
    game.appendChild(box);
  });
}

window.addEventListener('load', setup);

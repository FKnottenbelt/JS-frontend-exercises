console.clear();

const Lock = [];
const LOCK_SIZE = 4;
const gameArea = document.querySelector('.game');
const button = document.querySelector('button');
const message = document.querySelector('.message');
let gamePlay = false;
let score = 0;

function createLock() {
  for (let i = 0; i < LOCK_SIZE; i += 1) {
    const lockBox = document.createElement('div');
    const lockNr = document.createElement('input');

    lockNr.type = 'number';
    lockNr.max = 9;
    lockNr.min = 0;
    // custom methods
    lockNr.order = i;
    lockNr.correct = Math.floor(Math.random() * 10);
    //
    lockNr.value = 0;
    lockNr.classList.add('locknr');
    lockBox.classList.add('lockbox');
    lockBox.appendChild(lockNr);
    Lock.push(lockBox);
    gameArea.appendChild(lockBox);
  }
}

function destroyLock() {
  gameArea.innerHTML = '';
}

function endGame() {
  message.innerHTML = `Congrats, You solved it in ${score} guessses!`;
  button.textContent = 'Play Again';
  gamePlay = false;
  document.querySelector('.help').style.visibility = 'hidden';
}

function startGame() {
  gamePlay = true;
  button.textContent = 'Check Combination';
  message.innerHTML = 'Guess the Combination';
  destroyLock();
  createLock();
  score = 0;
}

function checkCombination() {
  // loop through numbers, see if they are correct
  // blue is too low, red is too high, green is correct
  const locknumbers = document.querySelectorAll('.locknr');
  let correctNumbers = 0;

  locknumbers.forEach((number, index) => {
    if (Number(number.value) === number.correct) {
      locknumbers[index].style.backgroundColor = 'green';
      correctNumbers += 1;
    } else if (Number(number.value) > number.correct) {
      locknumbers[index].style.backgroundColor = 'red';
    } else {
      locknumbers[index].style.backgroundColor = 'blue';
    }

    locknumbers[index].style.color = 'white';
  });

  if (correctNumbers === LOCK_SIZE) {
    endGame();
  }
}

button.addEventListener('click', () => {
  if (!gamePlay) {
    startGame();
  } else {
    score += 1;
    message.innerHTML = `Guesses: ${score}`;

    if (score >= 0) {
      document.querySelector('.help').style.visibility = 'visible';
    }

    checkCombination();
  }
});

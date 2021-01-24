console.clear();

const maxNumOnDice = 6;

function getWinner(scores) {
  let winner = '';
  const [player1, player2] = [scores[0], scores[1]];
  if (player1 === player2) {
    winner = 'It is a draw!';
  } else if (player1 > player2) {
    winner = 'Player 1 wins!';
  } else {
    winner = 'Player 2 wins!';
  }

  return winner;
}

function dieBuilder(number) {
  /* dice positions: dots on the die face
    1  2  3
    4  5  6
    7  8  9
  */

  const dieDotPositions = {
    1: [5],
    2: [1, 9],
    3: [1, 5, 9],
    4: [1, 3, 7, 9],
    5: [1, 3, 5, 7, 9],
    6: [1, 3, 4, 6, 7, 9],
  };

  const die = document.createElement('div');
  die.setAttribute('class', 'dice');

  // add in 9 dots
  for (let i = 1; i < 10; i += 1) {
    const dot = document.createElement('div');
    dot.setAttribute('class', 'dot');

    if (dieDotPositions[number].includes(i)) {
      dot.classList.add('black');
    }

    die.appendChild(dot);
  }

  return die;
}

function displayResults(winner, scores) {
  const output = document.querySelector('.output');
  const players = document.querySelector('.players');
  output.innerHTML = winner;

  // remove existing dice
  if (players.firstChild) {
    players.innerHTML = '';
  }

  const player1Die = dieBuilder(scores[0]);
  player1Die.style.background = 'yellow';
  players.appendChild(player1Die);

  const player2Die = dieBuilder(scores[1]);
  player2Die.style.background = 'blue';
  players.appendChild(player2Die);
}

function roll(num) {
  const dice = Math.floor(Math.random() * num) + 1;
  return dice;
}

function rollDice() {
  const rolls = [roll(maxNumOnDice), roll(maxNumOnDice)];
  return rolls;
}

function play() {
  const scores = rollDice();
  const winner = getWinner(scores);
  displayResults(winner, scores);
}

const button = document.querySelector('button');
button.addEventListener('click', play);

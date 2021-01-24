console.clear();

const score = {
  player: 0,
  computer: 0,
  turn: 'Player',
  winner: '',
};

const output = document.querySelector('.output');
const HEADS = 0;
const TAILS = 1;

function capitalize(string) {
  const words = string.split(' ');
  return words.map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');
}

function givePointToOtherPlayer(currentPlayer) {
  if (currentPlayer === 'player') {
    score.computer += 1;
  } else {
    score.player += 1;
  }
}

function calculateScore(choice) {
  const coinThrow = Math.floor(Math.random() * 2) === 0 ? HEADS : TAILS;
  const currentPlayer = score.turn.toLowerCase();

  if (choice === coinThrow) {
    score[currentPlayer] += 1;
    score.winner = capitalize(currentPlayer);
  } else {
    givePointToOtherPlayer(currentPlayer);
  }
}

function displayMessage(choice) {
  const message = `<p>${score.turn} selected ${choice}</>
                   <p>${score.winner} wins</p>
                   <p>Player ${score.player} Computer ${score.computer}</p>`;

  output.innerHTML = message;
}

function changeTurn() {
  score.turn = score.turn === 'Player' ? 'Computer' : 'Player';
}

function play(event) {
  const choice = event.target.textContent === 'Heads' ? HEADS : TAILS;
  calculateScore(choice);
  displayMessage(event.target.textContent);
  changeTurn();
}

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
  button.addEventListener('click', play);
});

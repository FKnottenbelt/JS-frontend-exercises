console.clear();

const play = {
  playerScore: 0,
  computerScore: 0,
  playerChoice: '',
  computerChoice: '',
  winner: '',
};

function getComputerChoice() {
  const choices = ['Rock', 'Paper', 'Scissors'];
  const computerChoice = choices[Math.floor(Math.random() * 3)];
  return computerChoice;
}

function getWinner() {
  // Paper > Rock > Scissors > Paper > Rock

  const winner = {
    Rock: 'Scissors',
    Paper: 'Rock',
    Scissors: 'Paper',
  };

  if (play.playerChoice === play.computerChoice) {
    play.winner = 'It is a draw!';
  } else if (winner[play.playerChoice] === play.computerChoice) {
    play.winner = 'Player wins!';
  } else {
    play.winner = 'Computer wins!';
  }

  return play.winner;
}

function displayWinner() {
  const message = `Player ${play.playerScore} -  Computer ${play.computerScore} <br> ${play.playerChoice} vs ${play.computerChoice} <br> ${play.winner}`;

  document.querySelector('p').innerHTML = message;
}

function setScore(winner) {
  if (winner === 'It is a draw!') {
    // nobody gets a point;
  } else if (winner === 'Player wins!') {
    play.playerScore += 1;
  } else {
    play.computerScore += 1;
  }
}

function playGame(event) {
  play.playerChoice = event.target.textContent;
  play.computerChoice = getComputerChoice();
  play.winner = getWinner();
  setScore(play.winner);
  displayWinner();
}

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
  button.addEventListener('click', playGame);
});

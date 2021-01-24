console.clear();

const phrases = ['These global properties return a simple value; they have no properties or methods.', 'These are the fundamental, basic objects upon which all other objects are based. This includes objects that represent general objects, functions, and errors.', 'These are the base objects representing numbers, dates, and mathematical calculations.'];

const button = document.querySelector('button');

let startTime = 0;

function sample(array) {
  const len = array.length;
  const randomNumber = Math.floor(Math.random() * len);
  return array[randomNumber];
}

function displayTextToType(text = '') {
  if (!text) {
    text = sample(phrases);
  }
  const message = document.querySelector('.message');
  message.innerHTML = text;
}

function startTest() {
  displayTextToType();
  const typeArea = document.querySelector('textarea');
  typeArea.disabled = false;
  typeArea.value = '';

  displayTextToType();
  typeArea.disabled = false;
  startTime = new Date().getTime();
}

function displayResultMessage(message) {
  const div = document.createElement('div');
  div.classList.add('result');
  div.innerHTML = message;
  document.body.appendChild(div);
}

function wordCounter(text) {
  return text.split(' ').length;
}

function calculateTypingSpeed(playerText, endTime) {
  const secondsPlayed = ((endTime - startTime) / 1000);
  const wordCount = wordCounter(playerText);
  const typingSpeed = Math.round((wordCount / secondsPlayed) * 60);

  return typingSpeed;
}

function checkCorrectness(playerText) {
  const text = document.querySelector('.message').textContent;
  const playerWords = playerText.split(' ');

  let correctedText = '';
  let correct = 0;
  const totalWords = text.length;

  text.split(' ').forEach((word, index) => {
    if (word === playerWords[index]) {
      correct += 1;
      correctedText += `<span class="correct">${word} </span>`;
    } else {
      correctedText += `<span class="wrong">${word} </span>`;
    }
  });

  displayTextToType(correctedText);

  return `${correct} correct out of ${totalWords} words`;
}

function endPlay() {
  const endTime = new Date().getTime();
  let outputMessage = '';

  // disable player text area
  const typeArea = document.querySelector('textarea');
  typeArea.disabled = true;

  // calcualate typing speed and correctness
  const playerText = typeArea.value;

  const typingSpeed = calculateTypingSpeed(playerText, endTime);
  outputMessage = `You typed at ${typingSpeed} words per minute <br>`;

  const correctnessMessage = checkCorrectness(playerText);
  outputMessage += correctnessMessage;

  // display results
  displayResultMessage(outputMessage);
}

function resetPlay() {
  // remove old results
  const resultDiv = document.querySelector('.result');
  if (resultDiv) {
    resultDiv.remove();
  }
}

function playGame() {
  if (this.textContent === 'Start') {
    resetPlay();
    startTest();
    this.textContent = 'Done';
  } else if (this.textContent === 'Done') {
    endPlay();
    this.textContent = 'Start';
  }
}

button.addEventListener('click', playGame);

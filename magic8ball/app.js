console.clear();

function randomAnswer() {
  const answers = ['It will work', 'Maybe, maybe not', 'Probably not', 'Highly likely', 'I don\'t know'];
  const answerIndex = Math.floor(Math.random() * answers.length);

  return answers[answerIndex];
}

function answerQuestion() {
  const message = document.querySelector('.message');
  const userInput = document.querySelector('input');

  message.textContent = `${userInput.value}: ${randomAnswer()}`;
  // reset user input
  userInput.value = '';
}

const button = document.querySelector('button');
button.addEventListener('click', answerQuestion);

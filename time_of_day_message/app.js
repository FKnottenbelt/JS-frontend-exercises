console.clear();

function constructMessage() {
  let message ='Good morning';
  const time = new Date(Date.now()).getHours();
  if (time >= 12 && time < 18) {
    message = 'Good afternoon';
  } else if (time >= 18) {
    message = 'Good evening';
  }
  return message;
}

function getPeriod(message) {
  return message.split(' ')[1];
}

function displayMessage() {
  const divs = document.querySelectorAll('div');
  const message = constructMessage();
  const period = getPeriod(message);

  divs[0].classList.add('box', period);
  divs[1].textContent = message;
}

const button = document.querySelector('button');
button.addEventListener('click', displayMessage);

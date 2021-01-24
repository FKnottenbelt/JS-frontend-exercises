console.clear();

function colorActive(button) {
  button.classList.add('active');
  setTimeout(() => {
    button.classList.remove('active');
  }, 1000);
}

function playSound(event) {
  const sound = event.target.textContent.toLowerCase();
  const audio = new Audio(`sounds/${sound}.mp3`);
  colorActive(event.target);
  audio.play();
}

const buttons = document.querySelector('.sounds');
buttons.addEventListener('click', playSound);

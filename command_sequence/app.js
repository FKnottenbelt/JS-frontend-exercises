console.clear();

let myBlock;
let commandListing;
let commandList = [];
const movementArray = ['left','right','up','down'];

document.addEventListener('DOMContentLoaded', () => {
  myBlock = document.createElement('div');
  myBlock.textContent = 'Hi!';
  myBlock.classList.add('block');

  commandListing = document.createElement('div');
  commandListing.classList.add('command-wrapper');

  const myScript = document.querySelector('script');
  document.body.insertBefore(commandListing, myScript);
  document.body.insertBefore(myBlock, myScript);
});

function goLeft() {
  let position = myBlock.offsetLeft;
  position -= 50;
  myBlock.style.left = `${position}px`;
}

function goRight() {
  let position = myBlock.offsetLeft;
  position += 50;
  myBlock.style.left = `${position}px`;
}

function goUp() {
  let position = myBlock.offsetTop;
  position -= 50;
  myBlock.style.top = `${position}px`;
}

function goDown() {
  let position = myBlock.offsetTop;
  position += 50;
  myBlock.style.top = `${position}px`;
}

function randomColor() {
// .toString(16) returns hexadecimal value ("0.5ec28ffacd9d1"). Handy for hex colors.
// substr(-6) will give the last 6 characters
  return `#${Math.random().toString(16).substr(-6)}`;
}

function changeColor() {
  myBlock.style.backgroundColor = randomColor();
}

function runCommands() {
  commandList.forEach((command) => {
    let action = command.textContent.slice(1);

    if (action === 'left') goLeft();
    else if (action === 'right') goRight();
    else if (action === 'up') goUp();
    else if (action === 'down') goDown();
    else if (action === 'color') changeColor();

    commandListing.removeChild(command);
  });

  commandList = [];
}

function mover() {
  if (commandList.length === 0) {
    myBlock.innerHTML = `set path`;
    return;
  }
  let command = commandList.shift();
  let action = command.textContent.slice(1);
  myBlock.innerHTML = `move ${action}`;

  // alternative way to move the block (not using our left, right etc functions)
  let position = myBlock.getBoundingClientRect();

  if (action === 'left') myBlock.style.left = `${position.left - position.width}px`;
  else if (action === 'right') myBlock.style.right = `${position.left + position.width}px`;
  else if (action === 'up')  myBlock.style.top = `${position.top - position.height}px`;
  else if (action === 'down')  myBlock.style.top = `${position.top + position.height}px`;
  else if (action === 'color') changeColor();

  commandListing.removeChild(command);

  // run chain slowly
  // setTimeout(mover, 1000);
}

function getRandomCommand() {
  return movementArray[Math.floor(Math.random() * movementArray.length)];
}

function removeCommand() {
  let index = commandList.indexOf(this);
  commandList.splice(index, 1);
  commandListing.removeChild(this);
}

function addCommand(command) {
  const span = document.createElement('span');
  span.classList.add('command');
  span.textContent = `+${command}`;
  span.addEventListener('click', removeCommand);

  commandList.push(span);
  commandListing.appendChild(span);
}

document.addEventListener('keydown', (event) => {
  event.preventDefault();
  const { key } = event;

  if (key === 'ArrowLeft') addCommand('left');
  else if (key === 'ArrowRight') addCommand('right');
  else if (key === 'ArrowUp') addCommand('up');
  else if (key === 'ArrowDown') addCommand('down');
  else if (key === 'r') addCommand(getRandomCommand());
  else if (key === 'c') addCommand('color');
  else if (key === 'Enter') runCommands();
  else if (key === ' ') mover();

});


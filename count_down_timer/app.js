console.clear();

const endDate = document.querySelector('input');
const btnStop = document.querySelector('button');
let timeInterval;
let timeStop;

function convertMiliseconds(miliseconds, format) {
  const totalSeconds = parseInt(Math.floor(miliseconds / 1000), 10);
  const totalMinutes = parseInt(Math.floor(totalSeconds / 60), 10);
  const totalHours = parseInt(Math.floor(totalMinutes / 60), 10);
  const days = parseInt(Math.floor(totalHours / 24), 10);

  const seconds = parseInt(totalSeconds % 60, 10);
  const minutes = parseInt(totalMinutes % 60, 10);
  const hours = parseInt(totalHours % 24, 10);

  switch (format) {
    case 's':
      return totalSeconds;
    case 'm':
      return totalMinutes;
    case 'h':
      return totalHours;
    case 'd':
      return days;
    default:
      return {
        days, hours, minutes, seconds,
      };
  }
}

function timeLeft(inputDate) {
  const currentDate = new Date();

  // Date.parse gives milliseconds (after 1970)
  const timeDiff = Date.parse(inputDate) - Date.parse(currentDate);
  const timeToGo = convertMiliseconds(timeDiff);
  timeToGo.total = timeDiff;

  return timeToGo;
}

function updateDisplay(inputDate, clock) {
  const timeToGo = timeLeft(inputDate);

  // stop the display changing if time is up (no time left)
  if (timeToGo.total <= 0) {
    timeStop = true;
  }

  if (timeStop) {
    clearInterval(timeInterval);
  }

  Object.keys(timeToGo).forEach((property) => {
    // find our html for days, hours etc. and update it's time value
    // nb: we can look only in the clock object instead of in the whole document
    const el = clock.querySelector(`.${property}`);
    if (el) el.textContent = timeToGo[property];
  });
}

function startClock(inputDate) {
  const clock = document.querySelector('.clock');
  updateDisplay(inputDate, clock); // runs once

  if (timeStop) {
    clearInterval(timeInterval);
  } else {
    // Update display every second
    // keeps running till something happens
    timeInterval = setInterval(updateDisplay, 1000, inputDate, clock);
  }
}

endDate.addEventListener('change', function () {
  clearInterval(timeInterval);
  const inputDate = new Date(this.value);
  localStorage.setItem('countdown', inputDate);
  timeStop = false;
  startClock(inputDate);
});

btnStop.addEventListener('click', () => {
  timeStop = true;
  localStorage.removeItem('countdown');
});

function run() {
  const savedValue = localStorage.getItem('countdown') || false;

  if (savedValue) {
    startClock(savedValue);
    const inputValue = new Date(savedValue);
    endDate.valueAsDate = inputValue;
  }
}

run();

// No restriction on opening panels
console.clear();

function togglePanelVisibility() {
  this.classList.toggle('active');
}

function collapseAll() {
  const activeDivs = document.querySelectorAll('div .active');
  activeDivs.forEach((div) => {
    div.classList.toggle('active');
  });
}

function openAll() {
  const nonActiveDivs = document.querySelectorAll('div:not(.active)');
  nonActiveDivs.forEach((div) => {
    div.classList.toggle('active');
  });
}

const accordion = document.querySelectorAll('.panel');
accordion.forEach((panel) => {
  panel.addEventListener('click', togglePanelVisibility);
});

const btnHide = document.querySelector('.btn-hide');
const btnShow = document.querySelector('.btn-show');
btnHide.addEventListener('click', collapseAll);
btnShow.addEventListener('click', openAll);

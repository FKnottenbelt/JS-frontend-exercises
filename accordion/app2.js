// Only one open panel at a time
console.clear();

const accordion = document.querySelectorAll('.panel');

function toggleEle(e) {
  accordion.forEach((ele) => {
    if (e.target.parentElement === ele) {
      ele.classList.toggle('active');
    } else {
      ele.classList.remove('active');
    }
  });
}

accordion.forEach((ele) => {
  ele.addEventListener('click', toggleEle);
});

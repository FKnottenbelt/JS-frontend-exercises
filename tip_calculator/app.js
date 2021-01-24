console.clear();

const tipPercentace = 0.15;

function displayTip() {
  const amount = Number(document.querySelector('input').value);
  const tip = (amount * tipPercentace).toFixed(2);
  const output = `You should tip $${tip} on $${amount.toFixed(2)}`;
  document.querySelector('h1').textContent = output;
}

const button = document.querySelector('button');
button.addEventListener('click', displayTip);

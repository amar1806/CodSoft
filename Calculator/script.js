let screen = document.getElementById('screen');
let currentInput = '';

function appendNumber(num) {
  if (currentInput === '0' && num !== '.') currentInput = '';
  currentInput += num;
  screen.innerText = currentInput;
}

function appendOperator(op) {
  if (currentInput !== '' && !isOperator(currentInput.slice(-1))) {
    currentInput += op;
    screen.innerText = currentInput;
  }
}

function clearScreen() {
  currentInput = '';
  screen.innerText = '0';
}

function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  screen.innerText = currentInput || '0';
}

function calculate() {
  try {
    const result = eval(currentInput);
    screen.innerText = result;
    currentInput = result.toString();
  } catch {
    screen.innerText = 'Error';
    currentInput = '';
  }
}

function isOperator(char) {
  return ['+', '-', '*', '/', '%'].includes(char);
}

function applyPercentage() {
  const match = currentInput.match(/(\d+(\.\d+)?)([+\-*/])(\d+(\.\d+)?)$/);
  if (match) {
    let base = parseFloat(match[1]);
    let operator = match[3];
    let percent = parseFloat(match[4]);

    let result;
    if (operator === '+' || operator === '-') {
      result = base + (operator === '+' ? 1 : -1) * (base * percent / 100);
    } else if (operator === '*' || operator === '/') {
      result = eval(`${base}${operator}${percent / 100}`);
    }

    currentInput = result.toString();
    screen.innerText = currentInput;
  }
}

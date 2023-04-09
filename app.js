const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
const dot = document.querySelector('#dot');

let calculation = [];

function calculate() {
  const expression = calculation.join('');
  const operatorIndex = findOperatorIndex(expression); // Find the index of the operator
  const var1 = expression.slice(0, operatorIndex); // Extract the first operand
  const op = expression[operatorIndex]; // Extract the operator
  const var2 = expression.slice(operatorIndex + 1); // Extract the second operand
  const result = evaluate(var1, op, var2); // Evaluate the expression
  displayResult(result);
}

function evaluate(var1, op, var2) {
  const num1 = parseFloat(var1);
  const num2 = parseFloat(var2);
  switch (op) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      return num1 / num2;
    default:
      return '';
  }
}

function findOperatorIndex(expression) {
  const operators = ['+', '-', '*', '/'];
  for (let i = 0; i < expression.length; i++) {
    if (operators.includes(expression[i])) {
      return i;
    }
  }
  return -1;
}

  
  function displayResult(result) {
    display.textContent = result; // set the text content of the display to the result
    dot.disabled = calculation.includes('.'); // disable the dot button if the calculation already contains a dot
  }
  
  function clear() {
    calculation = ['0']; // reset the calculation array to a single 0
    displayResult('0'); // display the result as 0
    buttons.forEach(button => {
      if (button.classList.contains('operator')) { // re-enable all operator buttons
        button.disabled = false;
      }
    });
  }
  
  function removeLast() {
    calculation.pop(); // remove the last element from the calculation array
    displayResult(calculation.join('')); // update the display with the updated calculation
  }
  
  function addDigit(digit) {
    const lastChar = calculation[calculation.length - 1];
    if (lastChar === '.' && digit === '.') {
      return;
    }
    if (calculation.length === 1 && calculation[0] === '0') { // remove the leading zero if the calculation only has a single zero
      calculation[0] = digit;
    } else {
      calculation.push(digit); // add the digit to the calculation array
    }
    const currentNumber = calculation.join('').split(/[-+*/]/).pop(); // extract the last number entered from the calculation
    displayResult(currentNumber); // update the display with the current number
    
    if (currentNumber.includes('.') && !dot.disabled) { // disable the dot button if the current number already has a dot
      dot.disabled = true;
    } else if (!currentNumber.includes('.') && dot.disabled) { // enable the dot button if the current number does not have a dot
      dot.disabled = false;
    }
  }
  
  function addOperator(operator) {
    const lastChar = calculation[calculation.length - 1];
    if (lastChar && '+-*/'.includes(lastChar)) { // if the last character in the calculation is an operator, replace it with the new operator
      calculation[calculation.length - 1] = operator;
    }
     else {
      calculation.push(operator); // add the operator to the calculation array
    }
    
    const lastButton = buttons[buttons.length - 2]; // get the second to last button clicked
    if (lastButton && lastButton.classList.contains('operator')) { // if the second to last button was an operator, calculate the result
      calculate();
    }
    
    const currentOperatorButton = document.querySelector(`button[value="${operator}"]`); // disable the operator button until a new digit is added
    currentOperatorButton.disabled = true;
    const digitButtons = document.querySelectorAll('.digit');
    digitButtons.forEach(digitButton => digitButton.addEventListener('click', () => {
      currentOperatorButton.disabled = false;
    }));
  }

function handleButtonClick(button) {
  const value = button.value;
  switch (value) {
    case 'clear':
      clear();
      break;
    case 'delete':
      removeLast();
      break;
    case '=':
      calculate();
      break;
    case '+':
    case '-':
    case '*':
    case '/':
      addOperator(value);
      break;
    default:
      addDigit(value);
      break;
  }
}

buttons.forEach(button => button.addEventListener('click', () => handleButtonClick(button)));

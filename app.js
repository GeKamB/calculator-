const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');


let calculation = [];
let convertedCalc;

function calculate(button) {
    const value = button.value;
    

    if (button.value === 'clear') {
        calculation = [];
        convertedCalc = '';
        display.textContent = convertedCalc;
        
    } else if (button.value === 'delete') {
        calculation.pop();
        console.log(calculation);
        convertedCalc = convertedCalc.slice(0, -1);
        display.textContent = convertedCalc;
    } else if (button.value === '=') {
        let result = eval(convertedCalc);
        display.textContent = result;
        calculation = [];
        convertedCalc = '';
        calculation.push(result);
        convertedCalc = calculation.join('');
        

    }
    else {
    calculation.push(value);
    convertedCalc = calculation.join('');
    display.textContent = convertedCalc;
    }
}

buttons.forEach(button => button.addEventListener('click', () => calculate(button)) );

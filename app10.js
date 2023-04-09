const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
const dot = document.querySelector('#dot');


let calculation = [];
let convertedCalc;

function calculate(button) {
    const value = button.value;
   
else if (/[-+*/]/.test(calculation)) {
    calculate()

    

    if (button.value === 'clear') {
        calculation = [];
        convertedCalc = '';
        display.textContent = convertedCalc;
        
    }else if (button.value === '.' && /[.]/.test(convertedCalc)) {
        dot.disabled = true;
    } 
    

     else if (button.value === 'delete') {
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
        dot.disabled = false;        
        

    } else if (['+', '-', '*', '/'].includes(button.value) && /[-+/*]/.test(convertedCalc)) {
        let result = eval(convertedCalc);

        display.textContent = result;
        calculation = [];
        convertedCalc = '';
        calculation.push(result);
        convertedCalc = calculation.join(''); 
        dot.disabled = false;       
    }
    else {
    calculation.push(value);
    convertedCalc = calculation.join('');
    display.textContent = convertedCalc;
    
    }
}

buttons.forEach(button => button.addEventListener('click', () => calculate(button)) );

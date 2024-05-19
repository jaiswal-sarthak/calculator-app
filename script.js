const display = document.getElementById('display');
const buttons = Array.from(document.getElementsByClassName('num'));
const operators = Array.from(document.getElementsByClassName('operator'));
const equal = document.getElementsByClassName('equal')[0];
const clear = document.getElementsByClassName('clear')[0];
const decimal = document.getElementsByClassName('decimal')[0];

let currentNum = '';
let prevNum = '';
let result = null;
let currentOperator = null;

function updateDisplay() {
	display.value = currentNum;
}

function reset() {
	currentNum = '';
	prevNum = '';
	result = null;
	currentOperator = null;
	updateDisplay();
}

buttons.map( button => {
	button.addEventListener('click', (e) => {
		currentNum += e.target.value;
		updateDisplay();
	});
});

operators.map( operator => {
	operator.addEventListener('click', (e) => {
		if (currentOperator!== null) calculate();
		currentOperator = e.target.value;
		prevNum = currentNum;
		currentNum = '';
	});
});

equal.addEventListener('click', () => {
	if (currentOperator === null || currentNum === '') return;
	calculate();
});

clear.addEventListener('click', () => {
	reset();
});

function calculate() {
	let num1 = Number(prevNum);
	let num2 = Number(currentNum);
	let calculation;

	switch (currentOperator) {
		case '+':
			calculation = num1 + num2;
			break;
		case '-':
			calculation = num1 - num2;
			break;
		case '*':
			calculation = num1 * num2;
			break;
		case '/':
			if (num2 === 0) {
				alert('Cannot divide by zero');
				return;
			}
			calculation = num1 / num2;
			break;
		default:
			return;
	}

	result = calculation;
	currentNum = result.toString();
	updateDisplay();
	currentOperator = null;
	prevNum = '';
}
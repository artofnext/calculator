
//Clear key listener
$(".clear-key").click(clearKey);
$(".clear-key").on("tap", clearKey);

function clearKey () {

    clearAll();
    refreshDisplay();
    console.log("you clicked: ", this.innerText)
};

//ClearE key listener
$(".ce-key").click(ceKey);
// $(".ce-key").touchstart(ceKey);

function ceKey () {

    calculator.display = 0;
    refreshDisplay();
    console.log("you clicked: ", this.innerText)
};

//Backspace key listener
$(".bkspc").click(bkspcKey);
// $(".bkspc").touchstart(bkspcKey);

function bkspcKey () {
    if (calculator.errorState) {
        calculator.display = 0;
        calculator.errorState = false;
    }
    if (calculator.display.toString().length < 2) { //if there only one digit on display
        calculator.display = 0;
        refreshDisplay();
        return;
    }
    calculator.display = parseFloat(calculator.display.toString().slice(0, -1));
    refreshDisplay();
    console.log("you clicked: ", this.innerText)
};

//Point key listener
$(".point").click(pointKey);
// $(".point").touchstart(pointKey);

function pointKey (event) {
    if (calculator.errorState) {
        calculator.display = 0;
        calculator.errorState = false;
    }
    if (calculator.display.toString().includes(".")) return;
    if (calculator.readyForSecondOperand) { //if operator was set
        calculator.display = '0' + this.innerText;
        calculator.readyForSecondOperand = false;
        refreshDisplay();
        return;
    }
    if (calculator.display.toString().length > 15) return; //no more than 16 digits on display
    calculator.display = calculator.display.toString() + this.innerText;
    refreshDisplay();
    console.log("you clicked: ", this.innerText)
};

//Sight key listener
$(".sight").click(sightKey);
// $(".sight").touchstart(sightKey);

function sightKey (event) {
    if (calculator.errorState) {
        calculator.display = 0;
        calculator.errorState = false;
    }
    calculator.display *= -1;
    refreshDisplay();
    console.log("you clicked: ", this.innerText)
};

//Operator keys listener
$(".operator").click(operatorKey);
// $(".operator").touchstart(operatorKey);

function operatorKey (event) {
    if (calculator.errorState) {
        calculator.display = 0;
        calculator.errorState = false;
    }
    // if operator pressed should perform calculation if operator is set
    if (calculator.operator && calculator.operand) {
        calculate();
        // calculator.readyForSecondOperand = true;
        refreshDisplay();
        calculator.operator = this.innerText;
        calculator.readyForSecondOperand = true;
        return;
    }

    calculator.readyForSecondOperand = true;
    calculator.operand = parseFloat(calculator.display.toString()); // set the operand from display
    calculator.operator = this.innerText;

    console.log("you clicked: ", this.innerText)
};

//Result key listener
$(".res").click(resKey);
$(".res").on("tap", resKey);
// $(".res").touchstart(resKey);

function resKey () {
    if (calculator.errorState) {return}
    if (calculator.operator && calculator.operand) {
        calculate();
        calculator.readyForSecondOperand = true;
        // refreshDisplay();
    }
    refreshDisplay();
    console.log("you clicked: ", this.innerText)
};


//Digits keys listener
$(".digit").click(digitKey);
// $(".digit").touchstart(digitKey);

function digitKey () {
    if (calculator.errorState) {
        calculator.display = 0;
        calculator.errorState = false;
    }
    console.log("you clicked: ", this.innerText);
    if (calculator.readyForSecondOperand) { //if operator was set
        calculator.operand = calculator.display; // set the operand from display
        calculator.display = 0;
        calculator.readyForSecondOperand = false; // reset readyness for operator
        refreshDisplay();
    }
    if (calculator.display.toString().length > 14) return; //no more than 15 digits on display
    if (this.innerText == "0" && calculator.display == 0) return;
    calculator.display = parseFloat(calculator.display.toString() + this.innerText);
    refreshDisplay();
};

//Log calculator object
$(".display__container").click(displayField);
// $(".display__container").touchstart(displayField);

function displayField () {
    console.log("Calculator object:");
    console.table(calculator);
};

//Calculator object
let calculator = {
    readyForSecondOperand: false,
    operator: null,
    display: '0',
    operand: null,
    errorState: false,
}

function refreshDisplay() {
    $("#lower_display").html(calculator.display);
}

function clearAll() {
    calculator.readyForSecondOperand = false;
    calculator.operator = null;
    calculator.display = '0';
    calculator.operand = null;
}

function calculate() {

    switch (calculator.operator) {
        case "+":
            calculator.display = calculator.operand + calculator.display;
            break;
        case "-":
            calculator.display = calculator.operand - calculator.display;
            break;
        case "×":
            calculator.display = calculator.operand * calculator.display;
            break;
        case "÷":
            if (calculator.display == 0) {
                calculator.display = "ERROR";
                calculator.errorState = true;
                break;
            }
            calculator.display = calculator.operand / calculator.display;
            break;
        default:
            console.log('Perform Calc out of operators!');
    }
}



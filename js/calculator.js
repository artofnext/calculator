
//Clear key listener
$(".clear-key").click(function () {

    clearAll();
    refreshDisplay();
    console.log("you clicked: ", this.innerText)
})

//ClearE key listener
$(".ce-key").click(function () {

    calculator.display = 0;
    refreshDisplay();
    console.log("you clicked: ", this.innerText)
})

//Backspace key listener
$(".bkspc").click(function () {
    if (calculator.display.toString().length < 2) { //if there only one digit on display
        calculator.display = 0;
        refreshDisplay();
        return;
    }
    calculator.display = parseFloat(calculator.display.toString().slice(0, -1));
    refreshDisplay();
    console.log("you clicked: ", this.innerText)
})

//Point key listener
$(".point").click(function (event) {

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
})

//Sight key listener
$(".sight").click(function (event) {

    calculator.display *= -1;
    refreshDisplay();
    console.log("you clicked: ", this.innerText)
})

//Operator keys listener
$(".operator").click(function (event) {

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
})

//Result key listener
$(".res").click(function () {
    if (calculator.operator && calculator.operand) {
        calculate();
        calculator.readyForSecondOperand = true;
        refreshDisplay();
    }

    refreshDisplay();
    console.log("you clicked: ", this.innerText)
})


//Digits keys listener
$(".digit").click(function () {
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
})

//Log calculator object
$(".display__container").click(function () {
    console.log("Calculator object:");
    console.table(calculator);
})

//Calculator object
let calculator = {
    readyForSecondOperand: false,
    operator: null,
    display: '0',
    operand: null,
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

function alertError() {
    $("#lower_display").html("ERROR");
    console.log('Error1');
}

function calculate() {
    //if (this.isOperand1 && this.isOperand2 && this.isOperator) {
    let surprise = "ERROR!";
    let isError = false;
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
                console.log('Error');
                $("#lower_display").html(surprise); //ToDo dont work
                isError = true;
                alertError();
                break;
            }
            calculator.display = calculator.operand / calculator.display;
            break;
        default:
            console.log('Perform Calc out of operators!');
        //}
    }
    //for next operation
    if (!isError) {
        // calculator.operand = calculator.display;
        calculator.operator = null; //
    } else {
        calculator.readyForSecondOperand = true;
    }
}



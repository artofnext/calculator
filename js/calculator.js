$(".key").click(function (event) {
    console.log("you clicked: ", this.innerText)
})

//Clear key listener
$(".clear-key").click(function (event) {

    calculator.clearAll();
    calculator.refreshDisplay();
    console.log("you clicked: ", this.innerText)
})

//Operator keys listener
$(".operator").click(function (event) {
    if(calculator.isOperand1 && calculator.isOperand2 && calculator.isOperator) {
        calculator.performCalc();
        calculator.refreshDisplay();
        return;
    }
    if(      )


    calculator.operator = this.innerText;
    calculator.operand1 = calculator.display;

    console.log("you clicked: ", this.innerText)
})

//Digits keys listener
$(".digit").click(function (event) {
    console.log("you clicked: ", this.innerText);

    if (this.innerText == "0" && calculator.display.toString() == 0) return;
    calculator.display = parseFloat(calculator.display.toString() + this.innerText);
    calculator.refreshDisplay();
})

class Calculator {
    operand1 = 0;
    operand2 = 0;
    result = 0;
    operator = "+";
    isOperand1 = false;
    isOperand2 = false;
    isDot = false;
    isOperator = false;
    display = 0;
    
    set operand1(num) {
        this.operand1 = num;
    }
    
    refreshDisplay = function () {
        $("#lower_display").html(this.display);
    }
    
    clearAll = function () {
        this.operand1 = 0;
        this.operand2 = 0;
        this.result = 0;
        this.operator = "+";
        this.isOperand1 = false;
        this.isDot = false;
        this.isOperator = false;
        this.display = 0;
    }
    
    performCalc = function () {
        if (this.isOperand1 && this.isOperand2 && this.isOperator) {

            switch (this.operator) {
                case "+":
                    this.result = this.operand1 + this.operand2;
                    break;
                case "-":
                    this.result = this.operand1 - this.operand2;
                    break;
                case "×":
                    this.result = this.operand1 * this.operand2;
                    break;
                case "÷":
                    this.result = this.operand1 / this.operand2;
                    break;
                default:
                    console.log('Perform Calc out of operators!');
            }

            //for next operation
            this.operand1 = this.result;

            this.display = this.result;

        } else {
            console.log('Operands or oiperator not set!');
        }
    }

}

let calculator = new Calculator();


//test

// calculator.operand1 = 5;
// calculator.operand2 = 3;
// calculator.operator = "+";
// calculator.isOperand1 = true;
// calculator.isOperand2 = true;
// calculator.isOperator = true;

// calculator.performCalc();

// console.log(calculator.operand1)

// calculator.refreshDisplay();
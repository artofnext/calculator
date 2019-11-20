
//Clear key listener
$(".clear-key").click(function (event) {
    
    clearAll();
    refreshDisplay();
    console.log("you clicked: ", this.innerText)
})

//ClearE key listener
$(".ce-key").click(function (event) {
    
    calculator.display = 0;
    refreshDisplay();
    console.log("you clicked: ", this.innerText)
})

//Backspace key listener
$(".bkspc").click(function (event) {
    if (calculator.display.toString().length < 2) { //if there only one digit on display
        calculator.display = 0;
        refreshDisplay();
        return;
    }
    calculator.display = calculator.display.toString().slice(0, -1);
    refreshDisplay();
    console.log("you clicked: ", this.innerText)
})

//Point key listener
$(".point").click(function (event) {
    
    if(calculator.display.toString().includes(".")) return;
    if (calculator.readyForSecondOperand) { //if operator was set
        calculator.display = '0' + this.innerText;
        calculator.readyForSecondOperand = false;
        refreshDisplay();
        return;
    }
    if(calculator.display.toString().length > 15) return; //no more than 16 digits on display
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
$(".res").click(function (event) {
    if (calculator.operator && calculator.operand) {
        calculate();
        calculator.readyForSecondOperand = true;
        refreshDisplay();
    }
    
    refreshDisplay();
    console.log("you clicked: ", this.innerText)
})


//Digits keys listener
$(".digit").click(function (event) {
    console.log("you clicked: ", this.innerText);
    if (calculator.readyForSecondOperand) { //if operator was set
        calculator.operand = parseFloat(calculator.display.toString()); // set the operand from display
        calculator.display = '';
        calculator.readyForSecondOperand = false; // reset readyness for operator
    }
    if(calculator.display.toString().length > 15) return; //no more than 16 digits on display
    if (this.innerText == "0" && calculator.display.toString() == 0) return;
    calculator.display = parseFloat(calculator.display.toString() + this.innerText);
    refreshDisplay();
})

// $(".debugger").click(function (event) {
//     $(".operand1").html(calculator.operand1);
//     $(".operand2").html(calculator.operand2);
//     $(".deb_operator").text(calculator.operator.toString());
//     console.log('operator' + calculator.operator);
//     $(".deb_display").html(calculator.display);
//     $(".isoperand1").html(calculator.isOperand1.toString());
//     $(".isoperand2").html(calculator.isOperand2.toString());
//     $(".isoperator").html(calculator.isOperator.toString());
//     // console.log("you clicked: ", this.innerText)
// })

//Log calculator object
$(".display__container").click(function (event) {
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
    $("#lower_display").html("");
}

function calculate() {
            //if (this.isOperand1 && this.isOperand2 && this.isOperator) {
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
                    calculator.operand = calculator.display;
                } else {
                    calculator.readyForSecondOperand = true;
                }
    
            // } else {
            //     console.log('Operands or oiperator not set!');
            // }
        
    }


// class Calculator {
//     operand1 = 0;
//     operand2 = 0;
//     result = 0;
//     operator = "+";
//     isOperand1 = false;
//     isOperand2 = false;
//     isDot = false;
//     isOperator = false;
//     display = 0;
    
//     set operand1(num) {
//         this.operand1 = num;
//     }
    
//     refreshDisplay = function () {
//         $("#lower_display").html(this.display);
//     }
    
//     clearAll = function () {
//         this.operand1 = 0;
//         this.operand2 = 0;
//         this.result = 0;
//         this.operator = "+";
//         this.isOperand1 = false;
//         this.isDot = false;
//         this.isOperator = false;
//         this.display = 0;
//     }
    
//     performCalc = function () {
//         if (this.isOperand1 && this.isOperand2 && this.isOperator) {

//             switch (this.operator) {
//                 case "+":
//                     this.result = this.operand1 + this.operand2;
//                     break;
//                 case "-":
//                     this.result = this.operand1 - this.operand2;
//                     break;
//                 case "×":
//                     this.result = this.operand1 * this.operand2;
//                     break;
//                 case "÷":
//                     this.result = this.operand1 / this.operand2;
//                     break;
//                 default:
//                     console.log('Perform Calc out of operators!');
//             }

//             //for next operation
//             this.operand1 = this.result;

//             this.display = this.result;

//         } else {
//             console.log('Operands or oiperator not set!');
//         }
//     }

// }



//let calculator = new Calculator();


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

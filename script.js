let calculatorOutput = document.querySelector("#display");

const clearBtn = document.querySelector("#ac");

const fnBtns = document.querySelectorAll(".JSCalculator__fnBtn");

const equalsBtn = document.querySelector("#equals");

const btns = document.querySelectorAll(".JSCalculator__numberBtn");

const decimalBtnPress = document.querySelector("#dec");

const displayStoredNumber = document.querySelector(".stored-number");
const displayStoredFNLastPressed = document.querySelector(
  ".fn-button-last-pressed"
);
const displaySumSyntax = document.querySelector(".sum-syntax");

let dispalyCurrentNumber = "";
let displayNewNumber = "";
let storedNumber = 0;
let sumResults = 0;
let lastFNButtonPressed = "";
let decimalPressed = false;
let textDecimalNumber = "";
let storedNumberPreEquals = 0;

// Display Numbers on Screen when typed in
btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (decimalPressed === false) {
      dispalyCurrentNumber = calculatorOutput.innerHTML;
      displayNewNumber = btn.innerHTML;

      calculatorOutput.innerHTML = parseFloat(
        dispalyCurrentNumber + displayNewNumber
      );
    }

    // enter decimal for first time
    else {
      dispalyCurrentNumber = calculatorOutput.innerHTML;
      displayNewNumber = btn.innerHTML;

      textDecimalNumber = dispalyCurrentNumber + "." + displayNewNumber;

      calculatorOutput.innerHTML = parseFloat(textDecimalNumber);
      decimalPressed = false;
    }
  });
});

// decimal pressed
decimalBtnPress.addEventListener("click", () => {
  decimalPressed = true;
});

// Reset Function - call by AC or on =
const resetAll = () => {
  dispalyCurrentNumber = "";
  displayNewNumber = "";
  storedNumber = 0;
  sumResults = 0;
  lastFNButtonPressed = "";
  decimalPressed = false;
  textDecimalNumber = "";
  storedNumberPreEquals = 0;
};

// Sum Function - called on +/-/x/divide or on equals
const sumTheNumbers = () => {
  if (storedNumber != 0) {
    calculatorOutput.innerHTML = parseFloat(
      dispalyCurrentNumber + displayNewNumber
    );

    switch (lastFNButtonPressed) {
      case "+":
        storedNumberPreEquals = calculatorOutput.innerHTML;
        sumResults = parseFloat(storedNumber) + parseFloat(calculatorOutput.innerHTML);
        break;
      case "-":
        storedNumberPreEquals = calculatorOutput.innerHTML;
        sumResults=parseFloat(storedNumber) - parseFloat(calculatorOutput.innerHTML);
        break;
      case "X":
        storedNumberPreEquals = calculatorOutput.innerHTML;
        sumResults = parseFloat(storedNumber) * parseFloat(calculatorOutput.innerHTML);
        break;
      case "/":
        storedNumberPreEquals = calculatorOutput.innerHTML;
        sumResults =parseFloat(storedNumber) / parseFloat(calculatorOutput.innerHTML);
        break;
    }

    // round up if more than 8 chars long like calculator
    let sumResLen = String(sumResults).length;

    if (sumResLen > 8) {
      calculatorOutput.innerHTML = parseFloat(
        String(sumResults).substring(0, 8)
      );
      displaySumSyntax.innerHTML = `<p>The Calculation Was:<span><br>${storedNumber}<br>${lastFNButtonPressed}<br>${storedNumberPreEquals}</span></p>`;
    } else {
      calculatorOutput.innerHTML = sumResults;
      displaySumSyntax.innerHTML = `<p>The Calculation Was:<span><br>${storedNumber}<br>${lastFNButtonPressed}<br>${storedNumberPreEquals}</span></p>`;
    }

    // reset for next loop of fn
    resetAll();
    storedNumber = sumResults;
  } else {
    // pass stored number to variable
    storedNumber = calculatorOutput.innerHTML;

    // reset screen
    calculatorOutput.innerHTML = 0;
  }
};

// reset when ac pressed
clearBtn.addEventListener("click", () => {
  calculatorOutput.innerHTML = 0;
  displayStoredFNLastPressed.innerHTML = ``;
  displayStoredNumber.innerHTML = ``;
  displaySumSyntax.innerHTML = ``;
});

clearBtn.addEventListener("click", resetAll);

// when fn button pressed
fnBtns.forEach((fnBtn) => {
  fnBtn.addEventListener("click", () => {
    // store which fn
    lastFNButtonPressed = fnBtn.innerHTML;

    // store the number and display 0, but don't calculate until = pressed
    storedNumber = calculatorOutput.innerHTML;
    calculatorOutput.innerHTML = 0;

    // added for display last fn pressed
    displayStoredFNLastPressed.innerHTML = `<p>Last function pressed was:<br><span>${lastFNButtonPressed}</span></p>`;
    displayStoredNumber.innerHTML = `<p>Stored Number is:<br><span>${storedNumber}</span></p>`;

    //sumTheNumbers();
  });
});

// when = equals key pressed, sum current and storedNumber if storedNumber is not 0
equalsBtn.addEventListener("click", sumTheNumbers);

// fixed in v2
// 2)If over say 10 chars long the result, round to 10 and align left

// fixed in v3
// 3)Display on page last number and last fn pressed
// 4)Display on iphone should only be circa 90% high as address bar takes up bottom of screen

/// To fix in v4
// 1) if second fn gets pressed before equals


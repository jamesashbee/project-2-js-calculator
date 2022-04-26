let calculatorOutput = document.querySelector("#display");

const clearBtn = document.querySelector("#ac");

const fnBtns = document.querySelectorAll(".JSCalculator__fnBtn");

const equalsBtn = document.querySelector("#equals");

const btns = document.querySelectorAll(".JSCalculator__numberBtn");

const decimalBtnPress = document.querySelector("#dec");

let dispalyCurrentNumber = "";
let displayNewNumber = "";
let storedNumber = 0;
let sumResults = 0;
let lastFNButtonPressed = "";
let decimalPressed = false;
let textDecimalNumber = "";

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
};

// Sum Function - called on +/-/x/divide or on equals
const sumTheNumbers = () => {
  if (storedNumber != 0) {
    calculatorOutput.innerHTML = parseFloat(
      dispalyCurrentNumber + displayNewNumber
    );

    switch (lastFNButtonPressed) {
      case "+":
        sumResults =
          parseFloat(storedNumber) + parseFloat(calculatorOutput.innerHTML);
        break;
      case "-":
        sumResults =
          parseFloat(storedNumber) - parseFloat(calculatorOutput.innerHTML);
        break;
      case "X":
        sumResults =
          parseFloat(storedNumber) * parseFloat(calculatorOutput.innerHTML);
        break;
      case "/":
        sumResults =
          parseFloat(storedNumber) / parseFloat(calculatorOutput.innerHTML);
        break;
    }
    calculatorOutput.innerHTML = sumResults;

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

    //sumTheNumbers();
  });
});

// when = equals key pressed, sum current and storedNumber if storedNumber is not 0
equalsBtn.addEventListener("click", sumTheNumbers);

/// To fix in v2 
// 1) if second fn gets pressed before equals
// 2)If over say 10 chars long the result, round to 10 and align left
// 3)Display on page last number and last fn pressed

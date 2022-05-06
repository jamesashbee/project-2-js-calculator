"use strict";

var calculatorOutput = document.querySelector("#display");
var clearBtn = document.querySelector("#ac");
var fnBtns = document.querySelectorAll(".JSCalculator__fnBtn");
var equalsBtn = document.querySelector("#equals");
var btns = document.querySelectorAll(".JSCalculator__numberBtn");
var decimalBtnPress = document.querySelector("#dec");
var displayStoredNumber = document.querySelector(".stored-number");
var displayStoredFNLastPressed = document.querySelector(".fn-button-last-pressed");
var displaySumSyntax = document.querySelector(".sum-syntax");
var dispalyCurrentNumber = "";
var displayNewNumber = "";
var storedNumber = 0;
var sumResults = 0;
var lastFNButtonPressed = "";
var decimalPressed = false;
var textDecimalNumber = "";
var storedNumberPreEquals = 0; // Display Numbers on Screen when typed in

btns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    if (decimalPressed === false) {
      dispalyCurrentNumber = calculatorOutput.innerHTML;
      displayNewNumber = btn.innerHTML;
      calculatorOutput.innerHTML = parseFloat(dispalyCurrentNumber + displayNewNumber);
    } // enter decimal for first time
    else {
        dispalyCurrentNumber = calculatorOutput.innerHTML;
        displayNewNumber = btn.innerHTML;
        textDecimalNumber = dispalyCurrentNumber + "." + displayNewNumber;
        calculatorOutput.innerHTML = parseFloat(textDecimalNumber);
        decimalPressed = false;
      }
  });
}); // decimal pressed

decimalBtnPress.addEventListener("click", function () {
  decimalPressed = true;
}); // Reset Function - call by AC or on =

var resetAll = function resetAll() {
  dispalyCurrentNumber = "";
  displayNewNumber = "";
  storedNumber = 0;
  sumResults = 0;
  lastFNButtonPressed = "";
  decimalPressed = false;
  textDecimalNumber = "";
  storedNumberPreEquals = 0;
}; // Sum Function - called on +/-/x/divide or on equals


var sumTheNumbers = function sumTheNumbers() {
  if (storedNumber != 0) {
    calculatorOutput.innerHTML = parseFloat(dispalyCurrentNumber + displayNewNumber);

    switch (lastFNButtonPressed) {
      case "+":
        storedNumberPreEquals = calculatorOutput.innerHTML;
        sumResults = parseFloat(storedNumber) + parseFloat(calculatorOutput.innerHTML);
        break;

      case "-":
        storedNumberPreEquals = calculatorOutput.innerHTML;
        sumResults = parseFloat(storedNumber) - parseFloat(calculatorOutput.innerHTML);
        break;

      case "X":
        storedNumberPreEquals = calculatorOutput.innerHTML;
        sumResults = parseFloat(storedNumber) * parseFloat(calculatorOutput.innerHTML);
        break;

      case "/":
        storedNumberPreEquals = calculatorOutput.innerHTML;
        sumResults = parseFloat(storedNumber) / parseFloat(calculatorOutput.innerHTML);
        break;
    } // round up if more than 8 chars long like calculator


    var sumResLen = String(sumResults).length;

    if (sumResLen > 8) {
      calculatorOutput.innerHTML = parseFloat(String(sumResults).substring(0, 8));
      displaySumSyntax.innerHTML = "<p>The Calculation Was:<span><br>".concat(storedNumber, "<br>").concat(lastFNButtonPressed, "<br>").concat(storedNumberPreEquals, "</span></p>");
    } else {
      calculatorOutput.innerHTML = sumResults;
      displaySumSyntax.innerHTML = "<p>The Calculation Was:<span><br>".concat(storedNumber, "<br>").concat(lastFNButtonPressed, "<br>").concat(storedNumberPreEquals, "</span></p>");
    } // reset for next loop of fn


    resetAll();
    storedNumber = sumResults;
  } else {
    // pass stored number to variable
    storedNumber = calculatorOutput.innerHTML; // reset screen

    calculatorOutput.innerHTML = 0;
  }
}; // reset when ac pressed


clearBtn.addEventListener("click", function () {
  calculatorOutput.innerHTML = 0;
  displayStoredFNLastPressed.innerHTML = "";
  displayStoredNumber.innerHTML = "";
  displaySumSyntax.innerHTML = "";
});
clearBtn.addEventListener("click", resetAll); // when fn button pressed

fnBtns.forEach(function (fnBtn) {
  fnBtn.addEventListener("click", function () {
    // store which fn
    lastFNButtonPressed = fnBtn.innerHTML; // store the number and display 0, but don't calculate until = pressed

    storedNumber = calculatorOutput.innerHTML;
    calculatorOutput.innerHTML = 0; // added for display last fn pressed

    displayStoredFNLastPressed.innerHTML = "<p>Last function pressed was:<br><span>".concat(lastFNButtonPressed, "</span></p>");
    displayStoredNumber.innerHTML = "<p>Stored Number is:<br><span>".concat(storedNumber, "</span></p>"); //sumTheNumbers();
  });
}); // when = equals key pressed, sum current and storedNumber if storedNumber is not 0

equalsBtn.addEventListener("click", sumTheNumbers); // fixed in v2
// 2)If over say 10 chars long the result, round to 10 and align left
// fixed in v3
// 3)Display on page last number and last fn pressed
// 4)Display on iphone should only be circa 90% high as address bar takes up bottom of screen
/// To fix in v4
// 1) if second fn gets pressed before equals
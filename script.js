let listButtons = document.querySelectorAll(".buttons button");
let lastReturn = document.querySelector(".screen .last");
let newReturn = document.querySelector(".screen .new");

let fisrtNumber = null;
let newNumber = null;
let claculator = "+";
let errorMessage = "Error";
let isResultDisplayed = false;

function reloadScreen() {
  lastReturn.innerText = fisrtNumber ? fisrtNumber + claculator : "";
  newReturn.innerText = newNumber ? newNumber : "";
}

reloadScreen();
listButtons.forEach((button) => {
  button.addEventListener("click", () => {
    let value = button.innerText;

    if (newNumber === errorMessage) {
      newNumber = null;
      fisrtNumber = null;
      claculator = "+";
      isResultDisplayed = false;
    }

    switch (value) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        if (isResultDisplayed) {
          newNumber = value;
          isResultDisplayed = false;
        } else {
          newNumber = newNumber ? newNumber + value : value;
        }
        break;

      case ".":
        if (!newNumber.includes(".")) {
          newNumber = newNumber ? newNumber + value : "0.";
        }
        break;

      case "±":
        newNumber = newNumber ? (-1 * parseFloat(newNumber)).toString() : "0";
        break;

      case "%":
        newNumber = newNumber ? (parseFloat(newNumber) / 100).toString() : "0";
        break;

      case "+":
      case "x":
      case "-":
      case "÷":
        if (newNumber) {
          if (fisrtNumber) {
            applyCalculator();
          }
          claculator = value;
          fisrtNumber = newNumber;
          newNumber = null;
          isResultDisplayed = false;
        } else {
          newNumber = errorMessage;
        }
        break;

      case "=":
        if (newNumber) {
          applyCalculator();
          isResultDisplayed = true;
          fisrtNumber = null;
        } else {
          newNumber = errorMessage;
        }
        break;

      case "AC":
        fisrtNumber = null;
        newNumber = null;
        claculator = "+";
        isResultDisplayed = false;
        break;

      default:
        break;
    }

    reloadScreen();
  });
});

function applyCalculator() {
  if (claculator === "÷" && newNumber === "0") {
    newNumber = errorMessage;
    return;
  }

  // - calculation
  switch (claculator) {
    case "÷":
      newNumber = (parseFloat(fisrtNumber) / parseFloat(newNumber))
        .toFixed(4)
        .toString();
      break;

    case "x":
      newNumber = (parseFloat(fisrtNumber) * parseFloat(newNumber)).toString();
      break;

    case "-":
      newNumber = (parseFloat(fisrtNumber) - parseFloat(newNumber)).toString();
      break;

    case "+":
      newNumber = (parseFloat(fisrtNumber) + parseFloat(newNumber)).toString();
      break;
  }

  // - If the calculation produces an error like NaN or Infinity, show an error message
  if (isNaN(newNumber) || !isFinite(newNumber)) {
    newNumber = errorMessage;
  }
}

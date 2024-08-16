let string = "";
let buttons = document.querySelectorAll(".button");
let expression = document.querySelector(".input");
const operators = ["+", "-", "/", "%", "*"];
let history = document.querySelector(".history");

expression.addEventListener("input", (event) => {
  const validCharacters = /[0-9+\-*/.%]/g;
  expression.value = expression.value.match(validCharacters)?.join("") || "";
  string = expression.value;
});

expression.addEventListener("keydown", (event) => {
  const key = event.key;
  const lastChar = string[string.length - 1];
  const secondLastChar = string[string.length - 2];

  if (key === "=" || key === "Enter") {
    event.preventDefault();
    evaluate();
  } else if (operators.includes(key) && operators.includes(lastChar)) {
    event.preventDefault();
  }
  // else if (key === "*" && lastChar === "*" && secondLastChar === "*") {
  //   event.preventDefault();
  // }
});

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonValue = button.innerHTML;
    const lastChar = string[string.length - 1];
    const secondLastChar = string[string.length - 2];

    if (string.includes("ERROR")) {
      clear();
    }

    if (buttonValue == "=") {
      evaluate();
    } else if (buttonValue == "C") {
      clear();
    } else if (button.classList.contains("delete")) {
      if (string.includes("ERROR")) {
        clear();
      } else {
        history.value = "";
        string = string.slice(0, -1);
        expression.value = string;
      }
    } else {
      if (operators.includes(buttonValue) && operators.includes(lastChar)) {
        // Do nothing
      }
      // else if (
      //   buttonValue === "*" &&
      //   lastChar === "*" &&
      //   secondLastChar === "*"
      // )
      // {
      //   // Do nothing
      // }
      else {
        string += buttonValue;
        expression.value = string;
      }
    }
  });
});

const evaluate = () => {
  try {
    history.value = string;
    string = eval(string).toString();
    expression.value = string;
  } catch (error) {
    string = "ERROR";
    expression.value = string;
  }
};

const clear = () => {
  string = "";
  expression.value = string;
  history.value = string;
};

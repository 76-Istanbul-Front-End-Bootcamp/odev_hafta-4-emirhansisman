// Data
const data = {
  USD: {EUR: 0.82, GBP: 0.74, TRY: 7.63},
  EUR: {USD: 1.23, GBP: 0.91, TRY: 9.34},
  GBP: {USD: 1.35, EUR: 1.10, TRY: 10.18},
  TRY: {USD: 0.13, EUR: 0.10, GBP: 0.09},
};

// Currency Signs
const curreny_sign = {
  USD: "fas fa-dollar-sign",
  EUR: "fas fa-euro-sign",
  GBP: "fas fa-pound-sign",
  TRY: "fas fa-lira-sign",
};

// Toastr Options
toastr.options = {
  "debug": false,
  "positionClass": "toast-middle",
  "closeButton": true,
  "progressBar": true,
  "onclick": null,
  "fadeIn": 300,
  "fadeOut": 1000,
  "timeOut": 4000,
  "extendedTimeOut": 1000,
}

const currencyKeys = Object.keys(data);

/* Dynamically create UI elements */
// Creating currency elements with a function
function createCurrencyElements(elements, root, inputName){
  for(let i =0; i< elements.length; i++){
    const currencyKeyDiv   = document.createElement("div");
    const currencyKeyInput = document.createElement("input");
    currencyKeyInput.setAttribute("type", "radio");
    currencyKeyInput.setAttribute("name", inputName);
    currencyKeyInput.setAttribute("id", inputName + elements[i]);
    currencyKeyInput.setAttribute("value", elements[i]);

    const currencyKeyLabel = document.createElement("label");
    currencyKeyLabel.setAttribute("for", inputName + elements[i]);
    currencyKeyLabel.setAttribute("class", "currency-label");
    currencyKeyLabel.textContent = elements[i] + " - ";

    const currencySign = document.createElement("i");
    currencySign.setAttribute("class", curreny_sign[elements[i]]);

    currencyKeyDiv.appendChild(currencyKeyInput);
    currencyKeyDiv.appendChild(currencyKeyLabel);
    currencyKeyLabel.appendChild(currencySign);
    root.appendChild(currencyKeyDiv);
  }
}

// Currency from creation with createCurrencyElements
const parentEl = document.querySelector("#currency-box-from");
const fromInputName = "currency_from";
createCurrencyElements(currencyKeys, parentEl, fromInputName);

// Currency to creation with createCurrencyElements
const parentToEl = document.querySelector("#currency-box-to");
const toInputName = "currency_to";
createCurrencyElements(currencyKeys, parentToEl, toInputName);

// Validation and calculation
const calculateButton = document.querySelector("#calculate-button");
calculateButton.addEventListener("click", function(){
 // If checked get value from radio button named 'currency_from' 
 const fromTarget = document.querySelector("input[name='currency_from']:checked");
 // If checked get value from radio button named 'currency_to'
 const toTarget   = document.querySelector("input[name='currency_to']:checked");
 // Get amount value from text input named 'amount'
 const amount     = document.querySelector("input[name='amount']").value;

 // Validation on user interaction
 if (fromTarget === null && toTarget === null) {
  toastr.warning("You should select currencies those you want to convert");
 }  else if (fromTarget === null || toTarget === null) {
    let blankCurrencySelection = fromTarget === null ? "Select curreny 'from'" : "Select currency 'to'";
    toastr.warning(blankCurrencySelection);
 } else if (fromTarget.value === toTarget.value) {
    toastr.error("You can't select same currency to calculate");
 } else if (isNaN(amount)) {
    toastr.error("You should type amount as Number");
 } else {
  const currentCurrencyObject = data[fromTarget.value];
  const resultForOne = currentCurrencyObject[toTarget.value];
  const result = amount * resultForOne;
  const currencyResult = document.querySelector("#currency-result");
  currencyResult.innerHTML = amount + " " + fromTarget.value + " = " + result + " " + toTarget.value;
 }
});

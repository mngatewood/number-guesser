var guessMin = 1;
var guessMax = 100;
var currentGuessNumber = '';
var advancedMode = 0;
var advancedRangeLocked = 0;
var winCount = 0;
var guessButton = document.querySelector('#submit');
var clearButton = document.querySelector('#clear');
var resetButton = document.querySelector('#reset');
var guessInput = document.querySelector('#guess');
var prevGuessTextElement = document.querySelector('#prev-guess-text');
var prevGuessNumberElement = document.querySelector('#prev-guess-number');
var highLowTextElement = document.querySelector('#high-low-text');
var minInput = document.querySelector('#min');
var maxInput = document.querySelector('#max');
var textMin = document.querySelector('#textMin');
var textMax = document.querySelector('#textMax');
var advancedInput = document.querySelector('#advanced');
var instructBasic = document.querySelector('#inst-basic');
var instructAdvanced = document.querySelector('#inst-adv');
var rangeAdjusted = document.querySelector('#range-adjusted');
var advancedLabel = document.querySelector('#advanced-label');
clearButton.disabled = true;
resetButton.disabled = true;
textMin.innerText = guessMin;
textMax.innerText = guessMax;
getRandomInt(guessMin, guessMax); 

minInput.addEventListener('change', function(event) {
  event.preventDefault;
  updateMin();
})

maxInput.addEventListener('change', function(event) {
  event.preventDefault;
  updateMax();
})

guessInput.addEventListener('change', function(event) {
  event.preventDefault;
  disableClearButton();
})

guessButton.addEventListener('click', function(event) {
  event.preventDefault;
  pageReset();
  getGuess();
  if (advancedMode === 1) {
    disableMinMax();
  }
  getResult();
  displayResult();
})

clearButton.addEventListener('click', function(event) {
  event.preventDefault;
  clearForm();
})

resetButton.addEventListener('click', function(event) {
  event.preventDefault;
  window.location.reload(true);
})

advancedInput.addEventListener('change', function(event) {
  event.preventDefault;
  if (this.checked) {
    advancedModeOn();
  } else {
    advancedModeOff();
  }
})

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  randomNumber = Math.floor (Math.random() * (max - min)) + min;
}

function updateMin() {
  minConditional();
  textMin.innerText = guessMin;
  getRandomInt(guessMin, guessMax);
  clearButton.disabled = false;
}

function minConditional() {
  if (minInput.value == '') {
    guessMin = 1;
  } else {
    guessMin = minInput.value;
  }
}

function updateMax() {
  maxConditional();
  textMax.innerText = guessMax;
  getRandomInt(guessMin, guessMax);
  clearButton.disabled = false;
}

function maxConditional() {
  if (maxInput.value == '') {
    guessMax = 100;
  } else {
    guessMax = maxInput.value;
  }
}

function disableClearButton() {
  if (guessInput.value == '') {
      e;
  } else {
    clearButton.disabled = false;
  }
}

function pageReset() {
  resetButton.disabled = false;
  prevGuessTextElement.style.cssText = 'color: black; font-weight: 300';
  prevGuessNumberElement.style.cssText = 'color: black; font-weight: 300';
}

function getGuess() {
  currentGuessNumber = parseInt(guessInput.value, 10);
  prevGuessNumber = currentGuessNumber;
}

function disableMinMax() {
  minInput.disabled = true;
  maxInput.disabled = true;
}

function getResult() {
  if (currentGuessNumber < guessMin || currentGuessNumber > guessMax || isNaN(parseInt(currentGuessNumber))) {
    returnError();
  } else if  (currentGuessNumber === randomNumber) {
    returnCorrect();
  } else if (currentGuessNumber > randomNumber) {
    returnTooHigh();
  } else {
    returnTooLow();
  }
}

function returnError() {
  prevGuessTextElement.style.cssText = 'color: red; font-weight: bold';
  prevGuessNumberElement.style.cssText = 'color: red; font-weight: bold';
  prevGuessText = 'Please enter a number between ' + guessMin + ' &amp; ' + guessMax + '.';
  prevGuessNumber = 'Oops!';
  highLowText = '';
}

function returnCorrect() {
  prevGuessText = 'You are correct!';
  highLowText = 'BOOM!';
  if (advancedMode === 1) {
    returnCorrectAdvanced();
  } else {
    getRandomInt(guessMin, guessMax);
  }
}

function returnCorrectAdvanced() {
  instructAdvanced.style.display = 'none';
  rangeAdjusted.style.display = 'block';
  guessMin = guessMin - 10;
  guessMax = parseInt(guessMax, 10) + 10;
  minInput.value = guessMin;
  maxInput.value = guessMax;
  winCount = winCount + 1;
  getRandomInt(guessMin, guessMax);
  if (winCount === 1) {
    prevGuessText = 'You have guessed correctly 1 time.';    
  } else {
    prevGuessText = 'You have guessed correctly ' + winCount + ' times.';
  }
}

function returnTooHigh() {
  prevGuessText = 'Your last guess was';
  highLowText = 'That is too high';
}

function returnTooLow() {
  prevGuessText = 'Your last guess was';
  highLowText = 'That is too low';
}

function displayResult() {
  prevGuessTextElement.innerHTML = prevGuessText;
  prevGuessNumberElement.innerText = prevGuessNumber;
  highLowTextElement.innerText = highLowText;
}

function clearForm() {
  var form = document.querySelector('#form');
  form.reset();
  clearButton.disabled = true;
  minInput.value = guessMin;
  maxInput.value = guessMax;
}

function advancedModeOn() {
  advancedMode = 1;
  instructBasic.style.display = 'none';
  instructAdvanced.style.display = 'block';
  advancedLabel.innerText = 'Uncheck the box to return to basic mode:';
}

function advancedModeOff() {
  advancedMode = 0;
  winCount = 0;
  instructBasic.style.display = 'block';
  instructAdvanced.style.display = 'none';
  minInput.disabled = false;
  maxInput.disabled = false;
  rangeAdjusted.style.display = 'none';
  advancedLabel.innerText = 'Check the box to enable advanced mode:';
  }
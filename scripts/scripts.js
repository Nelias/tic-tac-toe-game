var chosenSymbol = "Z";
var computerSymbol = "Y";
var fieldsArray = [
  "first-field",
  "second-field",
  "third-field",
  "fourth-field",
  "fifth-field",
  "sixth-field",
  "seventh-field",
  "eigth-field",
  "ninth-field"
];
const fieldsToCheck = fieldsArray;

const getValueFromField = (fieldName) => document.getElementById(fieldName).innerHTML;

const haveWon = (fieldsToCheck, symbol) => {
  return fieldsToCheck
    .map((value) => getValueFromField(value))
    .every(value => value === symbol);
}

const lines = [
  fieldsToCheck.slice(0, 3),
  fieldsToCheck.slice(3, 6),
  fieldsToCheck.slice(6, 9),
  fieldsToCheck.filter((value, index) => index % 3 === 0),
  fieldsToCheck.filter((value, index) => index % 3 === 1),
  fieldsToCheck.filter((value, index) => index % 3 === 2),
  fieldsToCheck.filter((value, index) => index % 4 === 0),
  fieldsToCheck.filter((value, index) => index % 2 === 0 && index <= 6 && index >= 2),
]

const hasWon = (symbol) => lines.map(value => haveWon(value, symbol)).some(Boolean);

const showScore = (gameResultText) => {
    document.getElementById("board-wrapper").style.display = "none";
    document.getElementById("score-wrapper").style.display = "flex";
    document.getElementById("score-text").innerHTML = gameResultText;
}

const andTheWinnerIs = () => {

  if ( hasWon(chosenSymbol) ) {
    console.log("YOU WIN!!!");
    showScore("You win!");
  }
  else if ( hasWon(computerSymbol) ) {
    
    console.log("YOU LOSE!!!")
    showScore("You lose!");
  }
  else if (fieldsArray.length == 1) {
    showScore("Its a tie!");
  }
}

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const enemyComputerTurn = () => {

  if (fieldsArray.length > 1) {
    var randomPosition = getRandomInt(0, fieldsArray.length - 1);
  }
  else {
    var randomPosition = 0;
  }

  const fieldName = fieldsArray[randomPosition];
  const fieldValue =  getValueFromField(fieldName);
  console.log(fieldValue);
  
  if (fieldValue !== "X" && fieldValue !== "O") {
    document.getElementById(fieldName).innerHTML = computerSymbol;
    andTheWinnerIs();
  }

  fieldsArray[randomPosition] = "Remove";
    fieldsArray = fieldsArray.filter(function(value) {
    return value != "Remove";
  });
}

const whoGoesFirst = () => {
  let randomNumber = getRandomInt(1, 10);
  if (randomNumber <= 5) {
    return 0;
  }
  else if (randomNumber > 5) {
    enemyComputerTurn();
  }
}

const setupFieldClicks = () => {
  fieldsToCheck.forEach((element) => {
    document.getElementById(element).onclick = () => {
      if ( (document.getElementById(element).innerHTML !== "X") && (document.getElementById(element).innerHTML !== "O") ) {
        document.getElementById(element).innerHTML = chosenSymbol;
        fieldsArray = fieldsArray.filter(function(value) {
          return value != element;
        });
        enemyComputerTurn();
        andTheWinnerIs();
        console.log(fieldsArray);
      }
    }
  })
};

document.getElementById("cross").onclick = () => {
    chosenSymbol = "X";
    computerSymbol = "O";
    document.getElementById("menu-wrapper").style.display = "none";
    document.getElementById("board-wrapper").style.display = "flex";
    whoGoesFirst();
}

document.getElementById("nought").onclick = () => {
    chosenSymbol = "O";
    computerSymbol ="X";
    document.getElementById("menu-wrapper").style.display = "none";
    document.getElementById("board-wrapper").style.display = "flex";
    whoGoesFirst();
}

setupFieldClicks();

const clearGameMemory = () => {

  fieldsArray = [
    "first-field",
    "second-field",
    "third-field",
    "fourth-field",
    "fifth-field",
    "sixth-field",
    "seventh-field",
    "eigth-field",
    "ninth-field"
  ];
  
  fieldsArray.forEach((value) => {
    document.getElementById(value).innerHTML = null;
  });
  document.getElementById("score-wrapper").style.display = "none";

}

document.getElementById("play-again").onclick = () => {
    clearGameMemory();
    document.getElementById("board-wrapper").style.display = "flex";
    whoGoesFirst();
}

document.getElementById("reset").onclick = () => {
    clearGameMemory();
    document.getElementById("menu-wrapper").style.display = "flex";
}
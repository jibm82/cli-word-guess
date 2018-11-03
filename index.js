const inquirer = require("inquirer");
const chalk = require("chalk");
const Word = require("./game/Word");

let myWord = new Word("Jurassic Park");
let tries = 10;

function isGameOver() {
  return tries == 0 || myWord.isGuessed();
}

function checkGameStatus() {
  if (isGameOver()) {
    console.log("Game Over");
  } else {
    askForLetter();
  }
}

function evaluateLetter(guessedLetter) {
  let result = myWord.guessLetter(guessedLetter);

  console.log(`\n${myWord.toString()}\n`);

  if (result) {
    console.log(chalk.green("Correct!"));
  } else {
    console.log(chalk.red("Incorrect!"));
    tries--;
    console.log(chalk.yellow(`Remaining guesses: ${tries}`));
  }
  checkGameStatus();
}

function askForLetter() {
  inquirer
    .prompt({
      name: "guessedLetter",
      message: "Guess a letter!",
      validate: value => {
        let lettersOnly = /^\w{1}$/;
        if (lettersOnly.test(value)) {
          return true;
        }
        return "Invalid input! Must be a single letter.";
      }
    })
    .then(answers => {
      evaluateLetter(answers.guessedLetter);
    });
}

askForLetter();

const inquirer = require("inquirer");
const chalk = require("chalk");
const Game = require("./game/Game");
const isLetter = require("./game/isLetter");
const game = new Game();

function newMatch() {
  console.log("Guess the name of the movie");
  game.newMatch();
  console.log(`\n${game.coveredWord()}\n`);
  askForLetter();
}

function askForLetter() {
  inquirer
    .prompt({
      name: "guessedLetter",
      message: "Guess a letter!",
      validate: value => {
        if (isLetter(value)) {
          return true;
        } else {
          return "Invalid input! Must be a single letter.";
        }
      }
    })
    .then(answers => {
      evaluateLetter(answers.guessedLetter);
    });
}

function evaluateLetter(guessedLetter) {
  let result = game.guessLetter(guessedLetter);

  console.log(`\n${game.coveredWord()}\n`);

  if (result) {
    console.log(chalk.green("Correct!\n"));
  } else {
    console.log(chalk.red("Incorrect!"));
    console.log(chalk.yellow(`Remaining guesses: ${game.remainingTries}\n`));
  }
  checkGameStatus();
}

function checkGameStatus() {
  if (game.isMatchOver()) {
    displayMatchResult();
    menu();
  } else {
    askForLetter();
  }
}

function displayMatchResult() {
  if (game.playerWon()) {
    console.log(chalk.green("You Win!\n"));
  } else {
    console.log(chalk.red("You Lose!\n"));
  }
}

function menu() {
  inquirer
    .prompt({
      type: "list",
      choices: [
        {
          name: "Play again",
          value: "play-again"
        },
        {
          name: "Exit",
          value: "exit"
        }
      ],
      name: "option",
      message: "Select an option"
    })
    .then(answers => {
      if (answers.option === "play-again") {
        newMatch();
      } else {
        console.log("Good bye");
      }
    });
}

newMatch();

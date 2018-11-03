const inquirer = require("inquirer");
const chalk = require("chalk");
const Game = require("./game/Game");
const isLetter = require("./game/isLetter");
const game = new Game();

function checkGameStatus() {
  if (game.isMatchOver()) {
    console.log("Game Over");
    menu();
  } else {
    askForLetter();
  }
}

function evaluateLetter(guessedLetter) {
  let result = game.guessLetter(guessedLetter);

  console.log(`\n${game.coveredWord()}\n`);

  if (result) {
    console.log(chalk.green("Correct!"));
  } else {
    console.log(chalk.red("Incorrect!"));
    console.log(chalk.yellow(`Remaining guesses: ${game.remainingTries}`));
  }
  checkGameStatus();
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
        game.newMatch();
        askForLetter();
      } else {
        console.log("Good bye");
      }
    });
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

askForLetter();

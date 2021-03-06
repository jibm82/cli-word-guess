const Word = require("./Word");
const wordOptions = require("./wordOptions");

function Game() {
  this.wordOptions = wordOptions;
  this.currentWordOptionIndex = this.wordOptions.length;
  this.defaultTries = 10;
  this.attemptedLetters = undefined;
  this.currentWord = undefined;
  this.remainingTries = undefined;

  this.newMatch = function() {
    if (this.currentWordOptionIndex == this.wordOptions.length) {
      this.randomizeWordOptions();
    }

    this.attemptedLetters = [];
    this.currentWord = new Word(
      this.wordOptions[this.currentWordOptionIndex++]
    );
    this.remainingTries = this.defaultTries;
  };

  this.randomizeWordOptions = function() {
    this.currentWordOptionIndex = 0;
    this.wordOptions = this.wordOptions.sort((a, b) => {
      return 0.5 - Math.random();
    });
  };

  this.coveredWord = function() {
    return this.currentWord.toString();
  };

  this.isLetterAttempted = function(letter) {
    return this.attemptedLetters.includes(letter);
  };

  this.guessLetter = function(letter) {
    this.attemptedLetters.push(letter);

    let result = this.currentWord.guessLetter(letter);

    if (!result) {
      this.remainingTries--;
    }

    return result;
  };

  this.isMatchOver = function() {
    return this.playerLost() || this.playerWon();
  };

  this.playerWon = function() {
    return this.currentWord.isGuessed();
  };

  this.playerLost = function() {
    return this.remainingTries === 0;
  };
}

module.exports = Game;

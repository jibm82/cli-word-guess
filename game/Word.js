const Letter = require("./Letter");

function Word(value) {
  this.value = value;
  this.letters = value.split("").map(letter => {
    return new Letter(letter);
  });

  this.toString = function() {
    return this.letters.join(" ");
  };

  this.guessLetter = function(attemptedLetter) {
    let result = false;

    this.letters.forEach(letter => {
      if (letter.guess(attemptedLetter)) {
        result = true;
      }
    });

    return result;
  };

  this.isGuessed = function() {
    return this.letters.every(letter => {
      return letter.isGuessed;
    });
  };
}

module.exports = Word;

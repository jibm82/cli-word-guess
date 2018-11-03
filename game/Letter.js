const isLetter = require("./isLetter");

function Letter(value) {
  this.coverCharacter = "_";
  this.value = value;
  this.isGuessed = !isLetter(value);

  this.toString = function() {
    if (this.isGuessed) {
      return this.value;
    } else {
      return this.coverCharacter;
    }
  };

  this.guess = function(guessedLetter) {
    if (this.value.toLowerCase() === guessedLetter.toLowerCase()) {
      this.isGuessed = true;
      return true;
    }

    return false;
  };
}

module.exports = Letter;

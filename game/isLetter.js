function isLetter(value) {
  const lettersOnly = /^[a-z|A-Z]{1}$/;

  return lettersOnly.test(value);
}

module.exports = isLetter;

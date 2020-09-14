/* eslint-disable linebreak-style */
/* eslint-disable no-mixed-operators */
/* eslint-disable linebreak-style */
const Chance = require('chance');

function getRandomIntInclusive(minimun, maximun) {
  const min = Math.ceil(minimun);
  const max = Math.floor(maximun);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateUniqKey(min, max) {
  const chance = new Chance();
  chance.integer();
  return chance.integer({ min, max });
}

function generateRoutingNumber() {
  const a = getRandomIntInclusive(0, 9);
  const b = getRandomIntInclusive(10, 12);
  const c = generateUniqKey(0, 700000);

  return `${a}${b}${c}`;
}

module.exports = {
  getRandomIntInclusive,
  generateUniqKey,
  generateRoutingNumber,
};

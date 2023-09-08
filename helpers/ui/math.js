const regex = require("./regexPatterns");

class MathHelper {
  getRandomNumber(min, max) {
    return Math.max(Math.floor(Math.random() * max), min);
  }

  getRandomDollarAmount(min, max, decimalPlaces) {
    const randNum = Math.random() * (max - min) + min;
    const power = 10 ** decimalPlaces;
    return Math.floor(randNum * power) / power;
  }

  totalArrayOfNumbers(arr) {
    let arrayOfNumbers;
    if (Array.isArray(arr) && typeof arr[0] === "string") {
      arrayOfNumbers = arr.map((index) => {
        const number = index.match(regex.isNumber)[0].replace(",", "");
        return Number(number);
      });
    } else arrayOfNumbers = arr;

    const total = arrayOfNumbers.reduce((sum, value) => sum + value);

    return total;
  }

  arrayOfNumbersWithinRange(arr, min, max) {
    return arr.every((index) => {
      index = index.replace(",", "");
      return index >= min && index <= max;
    });
  }

  // checks for duplicates in array
  // returns true if there are duplicates
  duplicatesExist(array) {
    return new Set(array).size !== array.length;
  }

  compareArraysInSize(array1, array2) {
    return expect(array1.length).toEqual(array2.length);
  }
}

module.exports = new MathHelper();

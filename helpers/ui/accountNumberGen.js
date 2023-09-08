module.exports = (n) => {
  const random = Math.random() + 1;
  const length = 10 ** (n - 1);
  const number = random * length;
  return parseInt(random * number, 10);
};

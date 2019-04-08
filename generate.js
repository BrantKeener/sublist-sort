// Create an array of length "length" filled with pseudo-random values
function generate(length) {

  var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  for (var i = 0; i < length; i += 1) {
    arr.push(Math.ceil(Math.random() * length));
  }
  arr.sort((a, b) => a - b);
  let noDups = [...new Set(arr)];
  return noDups;
}

module.exports = generate;

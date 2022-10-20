// console.log(arguments);
// console.log(require('module').wrapper);

const calcu = require('./calculator');
const calculator = new calcu();
const result = calculator.add(2,4)
console.log(result)

// ///////////////////////
// Destructuring
// const { add } = req uire('./calculator')
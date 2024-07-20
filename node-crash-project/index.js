// const {generatorRandomNumber, celciusToFahrenheit} = require('./utils');

// console.log(`Random Number: ${generatorRandomNumber()}`);
// console.log(`Celcius To Fahrenheit: ${celciusToFahrenheit(0)}`);

import getPosts, {getPostsLength} from "./postController.js";
console.log(getPosts());
console.log(`Posts Length: ${getPostsLength()}`);
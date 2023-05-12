console.log('hot');
const Product = require('./src/model/test');
console.log('honn');

Product.find({})
  .then((result) => {
    console.log(result);
    // Continue with your code here
  })
  .catch((error) => {
    console.log('Error retrieving products:', error);
  });
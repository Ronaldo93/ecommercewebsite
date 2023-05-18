/*  RMIT University Vietnam
  Course: COSC2430 Web Programming
  Semester: 2023A
  Assessment: Assignment 2
  Author: BrotherHood group 
  ID: Bao Tuan (s3977886),Phu Chau(s3975133),Tuan Minh(s3978609),Tuan Kiet(s3978885),Minh Hien(s3978807)
  Acknowledgement: https://www.w3schools.com/ */

console.log('hot');
const Product = require('./src/model/product');
console.log('honn');

Product.find({})
  .then((result) => {
    console.log(result);
    // Continue with your code here
  })
  .catch((error) => {
    console.log('Error retrieving products:', error);
  });
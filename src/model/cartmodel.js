/*  RMIT University Vietnam
  Course: COSC2430 Web Programming
  Semester: 2023A
  Assessment: Assignment 2
  Author: BrotherHood group 
  ID: Bao Tuan (s3977886),Phu Chau(s3975133),Tuan Minh(s3978609),Tuan Kiet(s3978885),Minh Hien(s3978807)
  Acknowledgement: https://www.w3schools.com/ */

const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  productTitle: {
    type: String,
    required: [true, "Please enter your product name"],
  },
  productPrice: {
    type: Number,
    required: [true, "Please enter your product price"],
  },
  productThumbnail: {
    type: String,
    required: [true, "Please enter your product image"],
  },
  // quantity: {
  //   type: Number,
  //   required: [true, "Please enter your product quantity"],
  // },
  userName: {
    type: String,
    required: [true, "Please enter your user id"],
  },
  productId: {
    type: String,
    required: [true, "Please enter your product id"],
  },
  distributionHubname: {
    type: String,
    required: [true, "Please enterDistribution Hub"],
  },
  address: {
    type: String,
    required: [true, "Please enter your address"],
  },
  // Stock: {
  //   type: Number,
  //   required: [true, "Please enter your product stock"],
  // }
});

module.exports = mongoose.model("Cart", cartSchema);

/*  RMIT University Vietnam
  Course: COSC2430 Web Programming
  Semester: 2023A
  Assessment: Assignment 2
  Author: BrotherHood group 
  ID: Bao Tuan (s3977886),Phu Chau(s3975133),Tuan Minh(s3978609),Tuan Kiet(s3978885),Minh Hien(s3978807)
  Acknowledgement: https://www.w3schools.com/ */

const mongoose = require("mongoose");

const order = new mongoose.Schema({
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

  userName: {
    type: String,
    required: [true, "Please enter your user id"],
  },
  productId: {
    type: String,
    required: [true, "Please enter your product id"],
  },
  // productDistributionHub: {
  //   type: String,
  //   required: [true, "Please enter Distribution Hub"],
  // },
  // --> CHANGES TO THIS
  distributionHub: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "distributionHub",
  },
  // CONSIDER THIS
  // distributionHubaddress: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  // },
  // ----------------
  address: {
    type: String,
    required: [true, "Please enter your address"],
  },
  order_status: {
    type: String,
    default: "active",
  },
});

module.exports = mongoose.model("order", order);

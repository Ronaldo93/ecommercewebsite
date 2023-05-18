/*  RMIT University Vietnam
  Course: COSC2430 Web Programming
  Semester: 2023A
  Assessment: Assignment 2
  Author: BrotherHood group 
  ID: Bao Tuan (s3977886),Phu Chau(s3975133),Tuan Minh(s3978609),Tuan Kiet(s3978885),Minh Hien(s3978807)
  Acknowledgement: https://www.w3schools.com/ */

const express = require("express");
const router = express.Router();

// mongoose
const mongoose = require("mongoose");

const products = new mongoose.Schema({
  id: Number,
  price: Number,
  title: String,
  thumbnail: String,
  description: {
    type: String,
    default: "No description",
    maxLength: 500,
  },
  vendor: {
    // refer to user table
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Product = mongoose.model("Product", products);

module.exports = Product;

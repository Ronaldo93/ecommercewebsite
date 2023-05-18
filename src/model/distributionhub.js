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

const distributionhub = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    minlength: 5,
    // required: function () {
    //   return this.user.role === "shipper";
    // },
  },
  address: {
    type: String,
    minlength: 5,
    // required: function () {
    //   return this.role === "shipper";
    // },
  },
});

const distributionHub = mongoose.model("distributionHub", distributionhub);

module.exports = distributionHub;

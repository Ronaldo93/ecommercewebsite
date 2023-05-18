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

// define schema
const orderSchema = new mongoose.Schema({
  // ==========Universal==========
  order_id: {
    type: Number,
    required: true,
    unique: true,
  },
  order_date: {
    type: Date,
    required: true,
  },
  id: {
    // ref
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  title: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  // order_quantity: {
  //     type: Number,
  //     required: true,
  // },
  order_status: {
    type: String,
    required: true,
  },
  // order price
  order_price: {
    type: Number,
    required: true,
  },
  // ==========USER==========
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  address: {
    type: String,
    required: true,
  },
  // ==========sHIPPER==========
  shipper: {
    type: String,
    required: true,
  },
  distributionHub: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

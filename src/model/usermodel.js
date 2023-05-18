/*  RMIT University Vietnam
  Course: COSC2430 Web Programming
  Semester: 2023A
  Assessment: Assignment 2
  Author: BrotherHood group 
  ID: Bao Tuan (s3977886),Phu Chau(s3975133),Tuan Minh(s3978609),Tuan Kiet(s3978885),Minh Hien(s3978807)
  Acknowledgement: https://www.w3schools.com/ */

const mongoose = require("mongoose");

// create a schema
const userSchema = new mongoose.Schema({
  // ==========Universal==========
  username: {
    type: String,
    // required: true,
    unique: true,
    match: /^[A-Za-z0-9]{8,15}$/,
  },
  // This is insecure! Validate on server-side and user-side instead
  // password: {
  //   type: String,
  // required: true,
  //   match: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,20}$/
  // },

  // profile picture storing on the database - base64
  profile_picture: {
    type: String,
    // required: true
  },
  // ==========USER==========
  name: {
    type: String,
    // boolean based on the role
    required: function () {
      return this.role === "customer";
    },
  },
  customer_address: {
    type: String,
    // required: function () { return this.role === 'customer' },
  },
  // ==========BUSINESS==========
  businessname: {
    type: String,
    // boolean based on the role
    required: function () {
      return this.role === "vendor";
    },
    minlength: 5,
    unique: function () {
      return this.role === "vendor";
    },
  },
  businessaddress: {
    type: String,
    // boolean based on the role
    required: function () {
      return this.role === "vendor";
    },
    minlength: 5,
    unique: function () {
      return this.role === "vendor";
    },
  },
  // ==========Shipper==========
  distributionHub: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "distributionHub",
  },
  // ==========ROLE==========
  role: {
    type: String,
    enum: ["vendor", "customer", "shipper"],
    // required: true
  },
  // ==========Hashed Password==========
  encrypted_password: {
    type: String,
    // required: true
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

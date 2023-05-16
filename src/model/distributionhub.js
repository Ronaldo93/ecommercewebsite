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

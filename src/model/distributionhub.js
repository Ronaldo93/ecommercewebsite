const express = require("express");
const router = express.Router();

// mongoose
const mongoose = require("mongoose");

const distributionhub = new mongoose.Schema({
  distributionHubname: {
    type: String,
    minlength: 5,
    required: function () {
      return this.role === "shipper";
    },
  },
  distributionHubaddress: {
    type: String,
    minlength: 5,
    required: function () {
      return this.role === "shipper";
    },
  },
});

const distributionHub = mongoose.model("distributionHub", distributionhub);

module.exports = distributionHub;

const express = require('express');
const router = express.Router();

// User Schema
const User = require('../model/user');

router.get("/", (req, res) => {
    // find image
    User.findby ({username: }), (err, user) => {

}
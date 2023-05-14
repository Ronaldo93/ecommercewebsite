const express = require('express');
const router = express.Router();

// TODO: do this

// User Schema
const User = require('../model/user');

router.get("/", (req, res) => {
    // find image
    User.findby({username: req.body.username}), (err, user) => {
    }
});
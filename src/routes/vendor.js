const express = require('express');
const router = express.Router();

// vendor-related routes

// @route GET /vendor/products
// @desc get all products
// @access private
router.get('/products', (req, res) => {
    res.render('');
}
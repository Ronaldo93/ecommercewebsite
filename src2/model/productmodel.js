const express = require('express');
const router = express.Router();

// mongoose
const mongoose = require('mongoose');

const products = new mongoose.Schema({
    id: Number,
    price: Number,
    title: String,
    thumbnail: String,
    description: String,
    vendor: {
        // refer to user table
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
})



const Product = mongoose.model('Product', products);

module.exports = Product;

const express = require('express');
const router = express.Router();

// mongoose
const mongoose = require('mongoose');
    
const products = new mongoose.Schema({
    id: Number,
    price: Number,
    title: String,
    thumbnail: String,
    description: {
        type: String,
        default: 'No description',
        maxLength: 500
    },
    vendor: {
        // refer to user table
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
})



const Product = mongoose.model('Product', products);

module.exports = Product;

const express = require('express');
const router = express.Router();

// mongoose
const mongoose = require('mongoose');


// Product schema
const productSchema = new mongoose.Schema({
    // ==========Universal==========   
    product_name: {
        type: String,
        required: true,
    },
    product_description: {
        type: String,
        required: true,
    },
    product_price: {
        type: Number,
        required: true,
    },
    product_image: {
        type: Buffer,
        required: true,
    },
    product_sku: {
        type: String,
        required: true,
    },
    product_vendor: {
        // refer to user table
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});


// Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
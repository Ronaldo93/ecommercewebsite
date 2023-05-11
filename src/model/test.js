const express = require('express');
const router = express.Router();

// mongoose
const mongoose = require('mongoose');

const products = new mongoose.Schema({
    id: Number,
    category_id: Number,
    price: Number,
    title: String,
    thumbnail: String,
    description: String,
})



const Product = mongoose.model('Product', products);

module.exports = Product;
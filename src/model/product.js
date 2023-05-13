const express = require('express');
const router = express.Router();

// mongoose
const mongoose = require('mongoose');

// const uri = "mongodb+srv://adc:7fvsHmHceMCXn48R@cluster0.rkmbxva.mongodb.net/ecommerce?retryWrites=true&w=majority";

// // connect to mongodb server
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('Error connecting to MongoDB', err));
    
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

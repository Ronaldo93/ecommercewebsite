const express = require('express');
const router = express.Router();

// mongoose
const mongoose = require('mongoose');

// define schema
const orderSchema = new mongoose.Schema({
    // ==========Universal==========
    order_id: {
        type: Number,
        required: true,
        unique: true
    },
    order_date: {
        type: Date,
        required: true,
    },
    product_sku: {
        // ref
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    product_name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    order_status: {
        type: String,
        required: true,
    },
    order_quantity: {
        type: Number,
        required: true,
    },
    // order price
    order_price: {
        type: Number,
        required: true,
    },
    // ==========USER==========
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    address: {
        type: String,
        required: true,
    },
    // ==========sHIPPER==========
    shipper: {
        type: String,
        required: true,
    },
    distributionHub: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    }
);
    
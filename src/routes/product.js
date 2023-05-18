/*  RMIT University Vietnam
  Course: COSC2430 Web Programming
  Semester: 2023A
  Assessment: Assignment 2
  Author: BrotherHood group 
  ID: Bao Tuan (s3977886),Phu Chau(s3975133),Tuan Minh(s3978609),Tuan Kiet(s3978885),Minh Hien(s3978807)
  Acknowledgement: https://www.w3schools.com/ */

const express = require("express");
const router = express.Router();

const Product = require("../model/product");
const User = require("../model/usermodel");

//@route GET /product/:id
//@desc render detail page
//@access public
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  let matchedProduct = await Product.findById(id)
    .then((matchedProduct) => {
      if (matchedProduct) {
        return matchedProduct;
      } else {
        res.render("error", { message: "Product not found" });
      }
    })
    .catch((error) => {
      console.log("Error retrieving product:", error);
      res.render("error", { message: "Error retrieving product" });
    });
  if (req.user) {
    let username = req.user.username;
    return res.render("detail", { product: matchedProduct, username: username });
  }
  res.render("detail", { product: matchedProduct, username: null });
});

// @route GET /product
// @desc render all products
// @access public
router.get("/", (req, res) => {
  Product.find()
    .then((products) => {
      res.render("product", { products: products,  authenticated: req.isAuthenticated() });
    })
    .catch((error) => console.log(error.message));
});

module.exports = router;

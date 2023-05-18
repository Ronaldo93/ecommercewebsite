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
      res.render("product", { products: products });
    })
    .catch((error) => console.log(error.message));
});

module.exports = router;

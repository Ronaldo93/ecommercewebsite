const express = require("express");
const router = express.Router();

const Product = require("../model/product");

//@route GET /product/:id
//@desc render detail page
//@access public
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Product.findById(id)
    .then((matchedProduct) => {
      if (matchedProduct) {
        res.render("detail", { product: matchedProduct });
      } else {
        res.render("error", { message: "Product not found" });
      }
    })
    .catch((error) => {
      console.log("Error retrieving product:", error);
      res.render("error", { message: "Error retrieving product" });
    });
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

const express = require("express");
const router = express.Router();

const Product = require("../model/product");
// VENDOR ROUTES

//@route GET /vendor/addproduct
//@desc render add product page
//@access private
router.get("/addproduct", (req, res) => {
  res.render("add_product", { user: req.user });
});

// @route GET /vendor/viewproduct
// @desc render all product from a vendor
// @access private
router.get("/viewproduct", (req, res) => {
  Product.find()
    .then((products) => {
      res.render("view_product", { products: products });
    })
    .catch((error) => console.log(error.message));
});

//@route POST /vendor/addproduct
//@desc add new product
//@access public
router.post("/addproduct", (req, res) => {
  // console.log(req.body);
  const product = new Product(req.body);
  product
    .save()
    .then(() => res.redirect("/product"))
    .catch((error) => res.send(error));
});

module.exports = router;

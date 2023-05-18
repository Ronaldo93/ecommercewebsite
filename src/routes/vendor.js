/*  RMIT University Vietnam
  Course: COSC2430 Web Programming
  Semester: 2023A
  Assessment: Assignment 2
  Author: BrotherHood group 
  ID: Bao Tuan (s3977886),Phu Chau(s3975133),Tuan Minh(s3978609),Tuan Kiet(s3978885),Minh Hien(s3978807)
  Acknowledgement: https://www.w3schools.com/ */

const express = require("express");
const router = express.Router();

const User = require("../model/usermodel");
const Product = require("../model/product");
const checkPermission = require("../middleware/checkrole");
// VENDOR ROUTES

//@route GET /vendor/addproduct
//@desc render add product page
//@access private
router.get("/addproduct", checkPermission("vendor"), async (req, res) => {
  let userid = await User.findOne({ _id: req.user._id })
    .then((user) => {
      console.log(user._id);
      return user._id;
    })
    .catch((error) => console.log(error.message));
  res.render("add_product", {
    userid: userid,
    authenticated: req.isAuthenticated(),
  });
  // res.render("add_product");
});

// @route GET /vendor/viewproduct
// @desc render all product from a vendor
// @access private
router.get("/viewproduct", checkPermission("vendor"), (req, res) => {
  //   Product.find()
  //     .then((products) => {
  //       res.render("view_product", { products: products });
  //     })
  //     .catch((error) => console.log(error.message));
  // }
  Product.find({ vendor: req.user._id })
    .populate("vendor")
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

/*  RMIT University Vietnam
  Course: COSC2430 Web Programming
  Semester: 2023A
  Assessment: Assignment 2
  Author: BrotherHood group 
  ID: Bao Tuan (s3977886),Phu Chau(s3975133),Tuan Minh(s3978609),Tuan Kiet(s3978885),Minh Hien(s3978807)
  Acknowledgement: https://www.w3schools.com/ */
  
const express = require("express");
const router = express.Router();

// CART ROUTE
// Make cart page

// Model
const Cart = require("../model/cartmodel");
const distributionHub = require("../model/distributionhub");

// @route POST /cart/add
// @desc add new product to cart
// @access public
router.post("/add", (req, res) => {
  const cart = new Cart(req.body);
  cart
    .save()
    .then(() => res.redirect("/cart"))
    .catch((error) => res.send(error));
});

// @route GET /cart
// @desc get all products in cart
// @access public
router.get("/", (req, res) => {
  let username = req.user.username;
  Cart.find({ userName: username })
    .then((Cart) => {
      res.render("cart", { Cart: Cart });
    })
    .catch((error) => console.log(error.message));
});

// @route GET /cart/:id/delete
// @desc delete a product from cart
// @access public
router.get("/:id/delete", (req, res) => {
  Cart.findById(req.params.id)
    .then((product) => {
      if (!product) {
        return res.send("Not found any product matching the ID!");
      }
      res.render("delete_product_from_cart", { product });
    })
    .catch((error) => res.send(error));
});

// @route POST /cart/:id/delete
// @desc delete a product from cart
// @access public
router.post("/:id/delete", (req, res) => {
  Cart.findByIdAndDelete(req.params.id)
    .then((product) => {
      if (!product) {
        return res.send("Not found any product matching the ID!");
      }
      res.redirect("/cart");
    })
    .catch((error) => res.send(error));
});

// Process order
const order = require("../model/order");

// @route GET /cart/:id/order
// @desc order a product from cart
// @access public
router.get("/:id/order", (req, res) => {
  Cart.findById(req.params.id)
    .then((product) => {
      if (!product) {
        return res.send("Not found any product matching the ID!");
      }
      res.render("order_product", { product});
    })
    .catch((error) => res.send(error));
});

// @route POST /cart/:id/order
// @desc order a product from cart
// @access public
router.post("/:id/order", (req, res) => {
  Cart.findById(req.params.id)
    .then((product) => {
      console.log(product.distributionHubname);
      if (!product) {
        return res.send("Not found any product matching the ID!");
      }
      // convert distribution hub name to id
      distributionHub
        .findOne({
          name: product.distributionHubname,
        })
        .then(async (distributionHub) => {
          console.log(distributionHub);
          if (!distributionHub) {
            return res.send(
              "Not found any distribution hub matching the name!"
            );
          }
          const distribution_id = distributionHub._id;
          console.log(distributionHub._id);
          const newOrder = new order({
            productTitle: product.productTitle,
            productPrice: product.productPrice,
            productThumbnail: product.productThumbnail,
            userName: product.userName,
            productId: product.productId,
            distributionHub: distribution_id,
            address: product.address,
          });
          await newOrder.save();
          await Cart.findByIdAndDelete(req.params.id)
            .then(() => res.redirect("/cart"))
            .catch((error) => res.send(error));
        })
        .catch((error) => res.send(error));
    })
    .catch((error) => res.send(error));
});

module.exports = router;

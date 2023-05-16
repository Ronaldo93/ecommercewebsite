const express = require("express");
const router = express.Router();

// CART ROUTE
// Make cart page
const Cart = require("../model/cartmodel");

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
  Cart.find()
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
      res.render("order_product", { product });
    })
    .catch((error) => res.send(error));
});

// @route POST /cart/:id/order
// @desc order a product from cart
// @access public
router.post("/:id/order", (req, res) => {
  Cart.findById(req.params.id)
    .then((product) => {
      if (!product) {
        return res.send("Not found any product matching the ID!");
      }
      const newOrder = new order({
        productTitle: product.productTitle,
        productPrice: product.productPrice,
        productThumbnail: product.productThumbnail,
        userName: product.userName,
        productId: product.productId,
        productDistributionHub: product.productDistributionHub,
        address: product.address,
      });
      newOrder
        .save()
        .then(() => {
          Cart.findByIdAndDelete(req.params.id)
            .then(() => res.redirect("/cart"))
            .catch((error) => res.send(error));
        })
        .catch((error) => res.send(error));
    })
    .catch((error) => res.send(error));
});

module.exports = router;
